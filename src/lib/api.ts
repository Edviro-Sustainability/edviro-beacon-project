export interface ApplicationPayload {
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

export interface ApplicationRecord extends Omit<ApplicationPayload, 'resume_url'> {
  id: number
  created_at: string
  status: string
  resume_url: string | null
}

export interface ApiError {
  error: string
  fields?: Record<string, string>
}

export class ApiException extends Error {
  status: number
  fields?: Record<string, string>

  constructor(message: string, status: number, fields?: Record<string, string>) {
    super(message)
    this.status = status
    this.fields = fields
  }
}

async function parseError(res: Response): Promise<ApiException> {
  let body: ApiError | null = null
  try {
    body = (await res.json()) as ApiError
  } catch {
    /* ignore */
  }
  return new ApiException(body?.error ?? `http_${res.status}`, res.status, body?.fields)
}

export async function submitApplication(
  payload: ApplicationPayload,
): Promise<{ ok: true; id: number }> {
  const res = await fetch('/api/applications', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw await parseError(res)
  return (await res.json()) as { ok: true; id: number }
}

export async function adminLogin(password: string): Promise<{ token: string; exp: number }> {
  const res = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ password }),
  })
  if (!res.ok) throw await parseError(res)
  return (await res.json()) as { token: string; exp: number }
}

export async function fetchApplications(token: string): Promise<ApplicationRecord[]> {
  const res = await fetch('/api/admin/applications', {
    headers: { authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw await parseError(res)
  const data = (await res.json()) as { applications: ApplicationRecord[] }
  return data.applications
}
