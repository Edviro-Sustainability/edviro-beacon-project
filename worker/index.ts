/**
 * Edviro Beacon Worker
 *
 * Routes:
 *   POST /api/applications              - submit a new fellowship application
 *   POST /api/admin/login               - exchange the admin password for a session token
 *   GET  /api/admin/applications        - list all applications (requires session token)
 *
 * Anything else falls through to the static SPA via the ASSETS binding.
 */

interface Env {
  DB: D1Database
  ASSETS: Fetcher
  ADMIN_PASSWORD: string
  SESSION_SECRET: string
  APP_NAME: string
}

const SESSION_TTL_SECONDS = 60 * 60 * 12
const TRACKS = new Set(['data', 'policy'])
const FIELD_LIMITS: Record<string, number> = {
  full_name: 200,
  email: 200,
  school: 200,
  grade: 60,
  location: 200,
  why_essay: 4000,
  change_essay: 4000,
  resume_url: 500,
}

interface ApplicationInput {
  full_name: string
  email: string
  school: string
  grade: string
  location: string
  track: 'data' | 'policy'
  why_essay: string
  change_essay: string
  resume_url?: string
}

interface ApplicationRow extends ApplicationInput {
  id: number
  created_at: string
  status: string
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname.startsWith('/api/')) {
      try {
        return await handleApi(request, env, url)
      } catch (err) {
        console.error('api error', err)
        return json({ error: 'internal_error' }, 500)
      }
    }

    return env.ASSETS.fetch(request)
  },
} satisfies ExportedHandler<Env>

async function handleApi(request: Request, env: Env, url: URL): Promise<Response> {
  const method = request.method.toUpperCase()

  if (url.pathname === '/api/applications' && method === 'POST') {
    return submitApplication(request, env)
  }

  if (url.pathname === '/api/admin/login' && method === 'POST') {
    return adminLogin(request, env)
  }

  if (url.pathname === '/api/admin/applications' && method === 'GET') {
    return listApplications(request, env)
  }

  return json({ error: 'not_found' }, 404)
}

async function submitApplication(request: Request, env: Env): Promise<Response> {
  const body = await safeJson<Partial<ApplicationInput>>(request)
  if (!body) return json({ error: 'invalid_json' }, 400)

  const errors: Record<string, string> = {}

  const required: (keyof ApplicationInput)[] = [
    'full_name',
    'email',
    'school',
    'grade',
    'location',
    'track',
    'why_essay',
    'change_essay',
  ]

  const cleaned: Record<string, string | null> = {}

  for (const key of required) {
    const raw = body[key]
    const value = typeof raw === 'string' ? raw.trim() : ''
    if (!value) {
      errors[key] = 'required'
      continue
    }
    const limit = FIELD_LIMITS[key]
    if (limit && value.length > limit) {
      errors[key] = `max_${limit}_chars`
      continue
    }
    cleaned[key] = value
  }

  if (cleaned.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned.email)) {
    errors.email = 'invalid_email'
  }

  if (cleaned.track && !TRACKS.has(cleaned.track)) {
    errors.track = 'invalid_track'
  }

  const resumeRaw = typeof body.resume_url === 'string' ? body.resume_url.trim() : ''
  if (resumeRaw) {
    if (resumeRaw.length > FIELD_LIMITS.resume_url) {
      errors.resume_url = `max_${FIELD_LIMITS.resume_url}_chars`
    } else if (!/^https?:\/\//i.test(resumeRaw)) {
      errors.resume_url = 'must_start_with_http'
    } else {
      cleaned.resume_url = resumeRaw
    }
  } else {
    cleaned.resume_url = null
  }

  if (Object.keys(errors).length > 0) {
    return json({ error: 'validation_failed', fields: errors }, 400)
  }

  const result = await env.DB.prepare(
    `INSERT INTO applications
      (full_name, email, school, grade, location, track, why_essay, change_essay, resume_url)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      cleaned.full_name,
      cleaned.email,
      cleaned.school,
      cleaned.grade,
      cleaned.location,
      cleaned.track,
      cleaned.why_essay,
      cleaned.change_essay,
      cleaned.resume_url,
    )
    .run()

  return json({ ok: true, id: result.meta.last_row_id }, 201)
}

async function adminLogin(request: Request, env: Env): Promise<Response> {
  if (!env.ADMIN_PASSWORD || !env.SESSION_SECRET) {
    return json({ error: 'server_misconfigured' }, 500)
  }

  const body = await safeJson<{ password?: string }>(request)
  if (!body || typeof body.password !== 'string') {
    return json({ error: 'invalid_json' }, 400)
  }

  if (!constantTimeEqual(body.password, env.ADMIN_PASSWORD)) {
    return json({ error: 'invalid_password' }, 401)
  }

  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS
  const token = await signToken({ sub: 'admin', exp }, env.SESSION_SECRET)

  return json({ token, exp })
}

async function listApplications(request: Request, env: Env): Promise<Response> {
  const auth = await requireAdmin(request, env)
  if (!auth.ok) return auth.response

  const { results } = await env.DB.prepare(
    `SELECT id, created_at, full_name, email, school, grade, location, track,
            why_essay, change_essay, resume_url, status
       FROM applications
      ORDER BY created_at DESC`,
  ).all<ApplicationRow>()

  return json({ applications: results ?? [] })
}

async function requireAdmin(
  request: Request,
  env: Env,
): Promise<{ ok: true } | { ok: false; response: Response }> {
  const header = request.headers.get('authorization') || ''
  const match = header.match(/^Bearer\s+(.+)$/i)
  if (!match) {
    return { ok: false, response: json({ error: 'missing_auth' }, 401) }
  }

  const valid = await verifyToken(match[1], env.SESSION_SECRET)
  if (!valid) {
    return { ok: false, response: json({ error: 'invalid_or_expired_token' }, 401) }
  }

  return { ok: true }
}

interface TokenPayload {
  sub: string
  exp: number
}

async function signToken(payload: TokenPayload, secret: string): Promise<string> {
  const body = base64urlEncode(new TextEncoder().encode(JSON.stringify(payload)))
  const sig = await hmac(secret, body)
  return `${body}.${sig}`
}

async function verifyToken(token: string, secret: string): Promise<boolean> {
  const parts = token.split('.')
  if (parts.length !== 2) return false
  const [body, sig] = parts
  const expected = await hmac(secret, body)
  if (!constantTimeEqual(sig, expected)) return false

  try {
    const payload = JSON.parse(new TextDecoder().decode(base64urlDecode(body))) as TokenPayload
    if (typeof payload.exp !== 'number') return false
    if (payload.exp < Math.floor(Date.now() / 1000)) return false
    return payload.sub === 'admin'
  } catch {
    return false
  }
}

async function hmac(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
  return base64urlEncode(new Uint8Array(sig))
}

function base64urlEncode(bytes: Uint8Array): string {
  let binary = ''
  for (const b of bytes) binary += String.fromCharCode(b)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64urlDecode(s: string): Uint8Array {
  const pad = s.length % 4 === 0 ? '' : '='.repeat(4 - (s.length % 4))
  const b64 = s.replace(/-/g, '+').replace(/_/g, '/') + pad
  const binary = atob(b64)
  const out = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i)
  return out
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let mismatch = 0
  for (let i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return mismatch === 0
}

async function safeJson<T>(request: Request): Promise<T | null> {
  try {
    return (await request.json()) as T
  } catch {
    return null
  }
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  })
}
