<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import EdviroMark from '../components/beacon/EdviroMark.vue'
import {
  ApiException,
  adminLogin,
  fetchApplications,
  type ApplicationRecord,
} from '../lib/api'
import { clearSession, loadSession, saveSession } from '../lib/auth'

type Track = 'all' | 'data' | 'policy'

const token = ref<string | null>(null)
const password = ref('')
const loginError = ref<string | null>(null)
const loggingIn = ref(false)

const applications = ref<ApplicationRecord[]>([])
const loadingApps = ref(false)
const loadError = ref<string | null>(null)

const search = ref('')
const trackFilter = ref<Track>('all')
const expanded = ref<Record<number, boolean>>({})

const filtered = computed<ApplicationRecord[]>(() => {
  const q = search.value.trim().toLowerCase()
  return applications.value.filter((a) => {
    if (trackFilter.value !== 'all' && a.track !== trackFilter.value) return false
    if (!q) return true
    return (
      a.full_name.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q) ||
      a.school.toLowerCase().includes(q) ||
      a.location.toLowerCase().includes(q)
    )
  })
})

const counts = computed(() => {
  const out = { all: applications.value.length, data: 0, policy: 0 }
  for (const a of applications.value) {
    if (a.track === 'data') out.data++
    else if (a.track === 'policy') out.policy++
  }
  return out
})

onMounted(async () => {
  const existing = loadSession()
  if (existing) {
    token.value = existing
    await load()
  }
})

async function onLogin() {
  if (loggingIn.value) return
  loginError.value = null
  loggingIn.value = true
  try {
    const { token: t, exp } = await adminLogin(password.value)
    saveSession(t, exp)
    token.value = t
    password.value = ''
    await load()
  } catch (err) {
    if (err instanceof ApiException && err.status === 401) {
      loginError.value = 'Incorrect password.'
    } else {
      loginError.value = 'Login failed. Please try again.'
    }
  } finally {
    loggingIn.value = false
  }
}

async function load() {
  if (!token.value) return
  loadError.value = null
  loadingApps.value = true
  try {
    applications.value = await fetchApplications(token.value)
  } catch (err) {
    if (err instanceof ApiException && err.status === 401) {
      logout()
      loginError.value = 'Your session expired. Please sign in again.'
    } else {
      loadError.value = 'Failed to load applications.'
    }
  } finally {
    loadingApps.value = false
  }
}

function logout() {
  clearSession()
  token.value = null
  applications.value = []
}

function toggle(id: number) {
  expanded.value[id] = !expanded.value[id]
}

function exportCsv() {
  if (filtered.value.length === 0) return
  const headers = [
    'id',
    'created_at',
    'full_name',
    'email',
    'school',
    'grade',
    'location',
    'track',
    'resume_url',
    'why_essay',
    'change_essay',
    'status',
  ]
  const escape = (v: unknown): string => {
    const s = v == null ? '' : String(v)
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`
    return s
  }
  const rows = filtered.value.map((a) => headers.map((h) => escape((a as never)[h])).join(','))
  const csv = [headers.join(','), ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `beacon-applications-${new Date().toISOString().slice(0, 10)}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}
</script>

<template>
  <div class="admin">
    <header class="admin__top">
      <RouterLink to="/" class="admin__brand">
        <EdviroMark :size="40" />
        <span class="admin__brand-text">Beacon Admin</span>
      </RouterLink>
      <div v-if="token" class="admin__top-right">
        <button class="btn-ghost admin__top-btn" type="button" @click="load" :disabled="loadingApps">
          {{ loadingApps ? 'Refreshing…' : 'Refresh' }}
        </button>
        <button class="btn-ghost admin__top-btn" type="button" @click="exportCsv" :disabled="filtered.length === 0">
          Export CSV
        </button>
        <button class="admin__logout" type="button" @click="logout">Sign out</button>
      </div>
    </header>

    <main class="admin__main">
      <div v-if="!token" class="admin__login-wrap">
        <form class="admin__login" @submit.prevent="onLogin" novalidate>
          <h1 class="admin__login-title">Admin sign in</h1>
          <p class="admin__login-text">Enter the admin password to view fellowship applications.</p>
          <label class="field">
            <span class="field__label">Password</span>
            <input
              v-model="password"
              type="password"
              autocomplete="current-password"
              required
              autofocus
            />
          </label>
          <div v-if="loginError" class="admin__login-err" role="alert">{{ loginError }}</div>
          <button type="submit" class="btn-primary admin__login-btn" :disabled="loggingIn">
            {{ loggingIn ? 'Signing in…' : 'Sign in' }}
          </button>
        </form>
      </div>

      <section v-else class="admin__panel">
        <div class="admin__head">
          <div>
            <h1 class="admin__title">Applications</h1>
            <p class="admin__subtitle">
              {{ counts.all }} total &middot; {{ counts.data }} data &middot;
              {{ counts.policy }} policy
            </p>
          </div>

          <div class="admin__filters">
            <div class="admin__tabs" role="tablist">
              <button
                type="button"
                class="admin__tab"
                :class="{ 'admin__tab--active': trackFilter === 'all' }"
                @click="trackFilter = 'all'"
              >
                All <span class="admin__tab-count">{{ counts.all }}</span>
              </button>
              <button
                type="button"
                class="admin__tab"
                :class="{ 'admin__tab--active': trackFilter === 'data' }"
                @click="trackFilter = 'data'"
              >
                Data <span class="admin__tab-count">{{ counts.data }}</span>
              </button>
              <button
                type="button"
                class="admin__tab"
                :class="{ 'admin__tab--active': trackFilter === 'policy' }"
                @click="trackFilter = 'policy'"
              >
                Policy <span class="admin__tab-count">{{ counts.policy }}</span>
              </button>
            </div>
            <input
              v-model="search"
              type="search"
              placeholder="Search name, email, school…"
              class="admin__search"
            />
          </div>
        </div>

        <div v-if="loadError" class="admin__err">{{ loadError }}</div>

        <div v-if="loadingApps && applications.length === 0" class="admin__empty">Loading…</div>
        <div v-else-if="filtered.length === 0" class="admin__empty">
          No applications {{ search || trackFilter !== 'all' ? 'match the current filter' : 'yet' }}.
        </div>

        <ul v-else class="admin__list">
          <li v-for="app in filtered" :key="app.id" class="row" :class="{ 'row--open': expanded[app.id] }">
            <button type="button" class="row__head" @click="toggle(app.id)">
              <div class="row__main">
                <div class="row__name-line">
                  <span class="row__name">{{ app.full_name }}</span>
                  <span class="row__pill" :class="`row__pill--${app.track}`">{{ app.track }}</span>
                </div>
                <div class="row__sub">
                  <span>{{ app.school }}</span>
                  <span class="row__dot">&middot;</span>
                  <span>Grade {{ app.grade }}</span>
                  <span class="row__dot">&middot;</span>
                  <span>{{ app.location }}</span>
                </div>
              </div>
              <div class="row__meta">
                <a class="row__email" :href="`mailto:${app.email}`" @click.stop>{{ app.email }}</a>
                <span class="row__date">{{ formatDate(app.created_at) }}</span>
              </div>
              <span class="row__chevron" aria-hidden="true">{{ expanded[app.id] ? '–' : '+' }}</span>
            </button>

            <div v-if="expanded[app.id]" class="row__body">
              <div class="row__essay">
                <h3>Why this fellowship?</h3>
                <p>{{ app.why_essay }}</p>
              </div>
              <div class="row__essay">
                <h3>A sustainability change at their school</h3>
                <p>{{ app.change_essay }}</p>
              </div>
              <dl class="row__facts">
                <div>
                  <dt>Resume / portfolio</dt>
                  <dd>
                    <a v-if="app.resume_url" :href="app.resume_url" target="_blank" rel="noopener">
                      {{ app.resume_url }}
                    </a>
                    <span v-else class="row__muted">—</span>
                  </dd>
                </div>
                <div>
                  <dt>Submitted</dt>
                  <dd>{{ formatDate(app.created_at) }}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{{ app.status }}</dd>
                </div>
              </dl>
            </div>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<style scoped>
.admin {
  min-height: 100vh;
  background: var(--paper-soft);
  display: flex;
  flex-direction: column;
}

.admin__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 28px;
  border-bottom: 1px solid rgba(15, 27, 18, 0.06);
  background: #ffffff;
  position: sticky;
  top: 0;
  z-index: 10;
}

.admin__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.admin__brand-text {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--beacon-ink);
  font-size: 17px;
}

.admin__top-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.admin__top-btn {
  padding: 9px 16px;
  font-size: 13px;
}

.admin__logout {
  font-size: 13px;
  color: var(--beacon-ink-muted);
  background: none;
  border: none;
  cursor: pointer;
  padding: 9px 4px;
  font-weight: 500;
  text-decoration: underline;
  text-decoration-color: rgba(15, 27, 18, 0.2);
  transition: color 0.2s ease, text-decoration-color 0.2s ease;
}

.admin__logout:hover {
  color: var(--beacon-green-700);
  text-decoration-color: var(--beacon-green-600);
}

.admin__main {
  flex: 1;
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 40px clamp(20px, 4vw, 40px) 80px;
}

.admin__login-wrap {
  display: flex;
  justify-content: center;
  padding-top: 80px;
}

.admin__login {
  background: #ffffff;
  border: 1px solid rgba(15, 27, 18, 0.06);
  border-radius: var(--radius-xl);
  padding: 40px;
  width: 100%;
  max-width: 420px;
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.admin__login-title {
  font-family: var(--font-serif);
  font-size: 28px;
  color: var(--beacon-ink);
  font-weight: 500;
}

.admin__login-text {
  font-size: 14.5px;
  color: var(--beacon-ink-muted);
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field__label {
  font-weight: 600;
  color: var(--beacon-ink);
  font-size: 13.5px;
}

.field input {
  width: 100%;
  padding: 12px 14px;
  font: inherit;
  font-size: 15px;
  color: var(--beacon-ink);
  background: #fbfdf7;
  border: 1.5px solid rgba(15, 27, 18, 0.12);
  border-radius: var(--radius-md);
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  outline: none;
}

.field input:focus {
  border-color: var(--beacon-green-600);
  box-shadow: 0 0 0 4px rgba(110, 200, 100, 0.18);
  background: #ffffff;
}

.admin__login-err {
  background: #fff3ef;
  border: 1px solid #f3c4b6;
  color: #8c3823;
  padding: 10px 14px;
  border-radius: var(--radius-md);
  font-size: 13px;
}

.admin__login-btn {
  margin-top: 4px;
  align-self: flex-start;
}

.admin__panel {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.admin__head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
}

.admin__title {
  font-family: var(--font-serif);
  font-size: clamp(28px, 4vw, 40px);
  color: var(--beacon-ink);
  font-weight: 500;
  letter-spacing: -0.01em;
}

.admin__subtitle {
  font-size: 14px;
  color: var(--beacon-ink-muted);
  margin-top: 4px;
}

.admin__filters {
  display: flex;
  gap: 14px;
  align-items: center;
  flex-wrap: wrap;
}

.admin__tabs {
  display: inline-flex;
  background: #ffffff;
  border: 1px solid rgba(15, 27, 18, 0.08);
  border-radius: var(--radius-pill);
  padding: 4px;
  gap: 2px;
}

.admin__tab {
  padding: 8px 16px;
  border-radius: var(--radius-pill);
  font-size: 13px;
  font-weight: 600;
  color: var(--beacon-ink-soft);
  background: transparent;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: background 0.2s ease, color 0.2s ease;
}

.admin__tab:hover {
  color: var(--beacon-green-700);
}

.admin__tab--active {
  background: var(--beacon-ink);
  color: #ffffff;
}

.admin__tab--active .admin__tab-count {
  color: var(--beacon-green-200);
}

.admin__tab-count {
  font-size: 11px;
  font-weight: 700;
  background: rgba(15, 27, 18, 0.08);
  color: var(--beacon-ink-muted);
  padding: 1px 7px;
  border-radius: 999px;
}

.admin__search {
  padding: 10px 14px;
  font: inherit;
  font-size: 14px;
  background: #ffffff;
  border: 1px solid rgba(15, 27, 18, 0.1);
  border-radius: var(--radius-pill);
  outline: none;
  min-width: 240px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.admin__search:focus {
  border-color: var(--beacon-green-600);
  box-shadow: 0 0 0 4px rgba(110, 200, 100, 0.16);
}

.admin__err {
  background: #fff3ef;
  border: 1px solid #f3c4b6;
  color: #8c3823;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  font-size: 14px;
}

.admin__empty {
  background: #ffffff;
  border: 1px dashed rgba(15, 27, 18, 0.12);
  border-radius: var(--radius-lg);
  padding: 48px 24px;
  text-align: center;
  color: var(--beacon-ink-muted);
  font-size: 14px;
}

.admin__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0;
  margin: 0;
}

.row {
  background: #ffffff;
  border: 1px solid rgba(15, 27, 18, 0.06);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.row:hover {
  border-color: rgba(46, 125, 50, 0.2);
}

.row--open {
  border-color: var(--beacon-green-600);
  box-shadow: var(--shadow-md);
}

.row__head {
  width: 100%;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  padding: 18px 22px;
  display: grid;
  grid-template-columns: 1fr auto 24px;
  gap: 18px;
  align-items: center;
}

.row__main {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.row__name-line {
  display: flex;
  align-items: center;
  gap: 10px;
}

.row__name {
  font-family: var(--font-serif);
  font-size: 18px;
  font-weight: 500;
  color: var(--beacon-ink);
}

.row__pill {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 3px 9px;
  border-radius: 999px;
}

.row__pill--data {
  background: var(--beacon-green-100);
  color: var(--beacon-green-800);
}

.row__pill--policy {
  background: #fff1c2;
  color: #7a5b09;
}

.row__sub {
  font-size: 13px;
  color: var(--beacon-ink-muted);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.row__dot {
  color: rgba(15, 27, 18, 0.25);
}

.row__meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  text-align: right;
}

.row__email {
  font-size: 13px;
  color: var(--beacon-green-700);
  text-decoration: none;
}

.row__email:hover {
  text-decoration: underline;
}

.row__date {
  font-size: 12px;
  color: var(--beacon-ink-muted);
}

.row__chevron {
  font-size: 22px;
  color: var(--beacon-ink-muted);
  font-weight: 300;
  width: 24px;
  text-align: center;
}

.row__body {
  padding: 8px 22px 22px;
  border-top: 1px solid rgba(15, 27, 18, 0.06);
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.row__essay h3 {
  font-family: var(--font-sans);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--beacon-green-700);
  font-weight: 600;
  margin-bottom: 6px;
}

.row__essay p {
  font-size: 14.5px;
  line-height: 1.6;
  color: var(--beacon-ink);
  white-space: pre-wrap;
}

.row__facts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  font-size: 13px;
  background: var(--paper);
  padding: 14px 16px;
  border-radius: var(--radius-md);
}

.row__facts dt {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--beacon-ink-muted);
  font-weight: 600;
  margin-bottom: 4px;
}

.row__facts dd {
  color: var(--beacon-ink);
  word-break: break-word;
}

.row__facts a {
  color: var(--beacon-green-700);
  text-decoration: underline;
  text-decoration-color: var(--beacon-green-300);
}

.row__muted {
  color: var(--beacon-ink-muted);
}

@media (max-width: 720px) {
  .row__head {
    grid-template-columns: 1fr 24px;
  }
  .row__meta {
    grid-column: 1 / -1;
    align-items: flex-start;
    text-align: left;
  }
  .admin__top {
    flex-wrap: wrap;
    gap: 12px;
  }
  .admin__search {
    min-width: 0;
    width: 100%;
  }
}
</style>
