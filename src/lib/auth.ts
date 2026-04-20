const TOKEN_KEY = 'beacon_admin_token'
const EXP_KEY = 'beacon_admin_exp'

export function saveSession(token: string, exp: number) {
  sessionStorage.setItem(TOKEN_KEY, token)
  sessionStorage.setItem(EXP_KEY, String(exp))
}

export function loadSession(): string | null {
  const token = sessionStorage.getItem(TOKEN_KEY)
  const exp = Number(sessionStorage.getItem(EXP_KEY) ?? 0)
  if (!token) return null
  if (!exp || exp * 1000 < Date.now()) {
    clearSession()
    return null
  }
  return token
}

export function clearSession() {
  sessionStorage.removeItem(TOKEN_KEY)
  sessionStorage.removeItem(EXP_KEY)
}
