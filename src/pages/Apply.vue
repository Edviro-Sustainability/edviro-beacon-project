<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import SiteNav from '../components/beacon/SiteNav.vue'
import SiteFooter from '../components/beacon/SiteFooter.vue'

const FORM_NAME = 'beacon-application'

interface FormState {
  full_name: string
  email: string
  school: string
  grade: string
  location: string
  track: '' | 'data' | 'policy'
  why_essay: string
  change_essay: string
  resume_url: string
  'bot-field': string
}

const initialForm = (): FormState => ({
  full_name: '',
  email: '',
  school: '',
  grade: '',
  location: '',
  track: '',
  why_essay: '',
  change_essay: '',
  resume_url: '',
  'bot-field': '',
})

const form = reactive<FormState>(initialForm())
const fieldErrors = reactive<Record<string, string>>({})
const submitting = ref(false)
const submitted = ref(false)
const generalError = ref<string | null>(null)

const ESSAY_LIMIT = 1800
const whyCount = computed(() => form.why_essay.length)
const changeCount = computed(() => form.change_essay.length)

const FIELD_MESSAGES: Record<string, string> = {
  required: 'This field is required.',
  invalid_email: 'Please enter a valid email address.',
  must_start_with_http: 'URL must begin with http:// or https://',
}

function fieldError(name: keyof FormState): string | null {
  const code = fieldErrors[name]
  if (!code) return null
  return FIELD_MESSAGES[code] ?? 'Invalid value.'
}

async function onSubmit() {
  if (submitting.value) return
  generalError.value = null
  for (const k of Object.keys(fieldErrors)) delete fieldErrors[k]

  const localErrors: Record<string, string> = {}
  if (!form.full_name.trim()) localErrors.full_name = 'required'
  if (!form.email.trim()) localErrors.email = 'required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
    localErrors.email = 'invalid_email'
  if (!form.school.trim()) localErrors.school = 'required'
  if (!form.grade.trim()) localErrors.grade = 'required'
  if (!form.location.trim()) localErrors.location = 'required'
  if (!form.track) localErrors.track = 'required'
  if (!form.why_essay.trim()) localErrors.why_essay = 'required'
  if (!form.change_essay.trim()) localErrors.change_essay = 'required'
  if (form.resume_url.trim() && !/^https?:\/\//i.test(form.resume_url.trim()))
    localErrors.resume_url = 'must_start_with_http'

  if (Object.keys(localErrors).length > 0) {
    Object.assign(fieldErrors, localErrors)
    generalError.value = 'Please fix the highlighted fields.'
    return
  }

  const body = new URLSearchParams()
  body.append('form-name', FORM_NAME)
  body.append('bot-field', form['bot-field'])
  body.append('full_name', form.full_name.trim())
  body.append('email', form.email.trim())
  body.append('school', form.school.trim())
  body.append('grade', form.grade.trim())
  body.append('location', form.location.trim())
  body.append('track', form.track)
  body.append('why_essay', form.why_essay.trim())
  body.append('change_essay', form.change_essay.trim())
  body.append('resume_url', form.resume_url.trim())

  submitting.value = true
  try {
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    })
    if (!res.ok) throw new Error(`http_${res.status}`)
    submitted.value = true
    Object.assign(form, initialForm())
  } catch {
    generalError.value =
      'Something went wrong submitting your application. Please try again, or email hursh@edviroenergy.com.'
  } finally {
    submitting.value = false
  }
}

function applyAgain() {
  submitted.value = false
  generalError.value = null
}
</script>

<template>
  <SiteNav />
  <main class="apply">
    <div class="apply__bg" aria-hidden="true"></div>

    <div class="container apply__inner">
      <header class="apply__head">
        <span class="eyebrow">Beacon Fellows Program &middot; Cohort 01</span>
        <h1 class="apply__title">
          Apply for the <span class="apply__title-italic">fellowship.</span>
        </h1>
        <p class="apply__lede">
          Tell us a little about you and your school. Most fellows finish this in 20&ndash;30
          minutes. There are no trick questions.
        </p>
      </header>

      <section v-if="submitted" class="apply__success">
        <div class="apply__success-mark" aria-hidden="true">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" stroke="currentColor" stroke-width="2" />
            <path d="M7 12.5l3 3 7-7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <h2 class="apply__success-title">Application received.</h2>
        <p class="apply__success-text">
          Thank you. We review applications on a rolling basis and respond by email within
          two weeks. If you want to add anything later, email us at
          <a href="mailto:hursh@edviroenergy.com">hursh@edviroenergy.com</a>.
        </p>
        <div class="apply__success-actions">
          <RouterLink to="/" class="btn-primary">Back to home</RouterLink>
          <button type="button" class="btn-ghost" @click="applyAgain">Submit another application</button>
        </div>
      </section>

      <form
        v-else
        class="apply__form"
        name="beacon-application"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        novalidate
        @submit.prevent="onSubmit"
      >
        <input type="hidden" name="form-name" value="beacon-application" />
        <p class="apply__honeypot" aria-hidden="true">
          <label>Don't fill this out: <input v-model="form['bot-field']" name="bot-field" tabindex="-1" autocomplete="off" /></label>
        </p>
        <div class="apply__group">
          <h2 class="apply__group-title">About you</h2>
          <div class="apply__row">
            <label class="field" :class="{ 'field--err': fieldErrors.full_name }">
              <span class="field__label">Full name</span>
              <input
                v-model="form.full_name"
                type="text"
                autocomplete="name"
                placeholder="Jane Doe"
                required
              />
              <span v-if="fieldError('full_name')" class="field__err">{{ fieldError('full_name') }}</span>
            </label>
            <label class="field" :class="{ 'field--err': fieldErrors.email }">
              <span class="field__label">Email</span>
              <input
                v-model="form.email"
                type="email"
                autocomplete="email"
                placeholder="you@school.org"
                required
              />
              <span v-if="fieldError('email')" class="field__err">{{ fieldError('email') }}</span>
            </label>
          </div>
        </div>

        <div class="apply__group">
          <h2 class="apply__group-title">Your school</h2>
          <div class="apply__row">
            <label class="field field--wide" :class="{ 'field--err': fieldErrors.school }">
              <span class="field__label">School name</span>
              <input
                v-model="form.school"
                type="text"
                placeholder="Lincoln High School"
                required
              />
              <span v-if="fieldError('school')" class="field__err">{{ fieldError('school') }}</span>
            </label>
          </div>
          <div class="apply__row">
            <label class="field" :class="{ 'field--err': fieldErrors.grade }">
              <span class="field__label">Grade</span>
              <select v-model="form.grade" required>
                <option value="" disabled>Select grade</option>
                <option value="9">9th</option>
                <option value="10">10th</option>
                <option value="11">11th</option>
                <option value="12">12th</option>
                <option value="other">Other</option>
              </select>
              <span v-if="fieldError('grade')" class="field__err">{{ fieldError('grade') }}</span>
            </label>
            <label class="field" :class="{ 'field--err': fieldErrors.location }">
              <span class="field__label">City, State</span>
              <input
                v-model="form.location"
                type="text"
                placeholder="Austin, TX"
                required
              />
              <span v-if="fieldError('location')" class="field__err">{{ fieldError('location') }}</span>
            </label>
          </div>
        </div>

        <div class="apply__group">
          <h2 class="apply__group-title">Track</h2>
          <p class="apply__group-help">
            Pick the track you want to lead with. You'll touch the other one too &mdash; this
            just tells us where to slot you on day one.
          </p>
          <div class="apply__tracks" :class="{ 'apply__tracks--err': fieldErrors.track }">
            <label class="track-pick" :class="{ 'track-pick--active': form.track === 'data' }">
              <input v-model="form.track" type="radio" value="data" />
              <span class="track-pick__head">
                <span class="track-pick__num">01</span>
                <span class="track-pick__name">Data Track</span>
              </span>
              <span class="track-pick__body">
                Analyze school energy data, prototype dashboards, communicate findings to the public.
              </span>
            </label>
            <label class="track-pick" :class="{ 'track-pick--active': form.track === 'policy' }">
              <input v-model="form.track" type="radio" value="policy" />
              <span class="track-pick__head">
                <span class="track-pick__num">02</span>
                <span class="track-pick__name">Policy Track</span>
              </span>
              <span class="track-pick__body">
                Build coalitions, draft proposals, drive adoption of transparency in your district.
              </span>
            </label>
          </div>
          <span v-if="fieldError('track')" class="field__err">{{ fieldError('track') }}</span>
        </div>

        <div class="apply__group">
          <h2 class="apply__group-title">Short essays</h2>
          <p class="apply__group-help">
            Roughly 250&ndash;300 words each. Skip the AI-speak; we want to hear you.
          </p>

          <label class="field" :class="{ 'field--err': fieldErrors.why_essay }">
            <span class="field__label">
              Why do you want to be a Beacon Fellow?
              <span class="field__count" :class="{ 'field__count--over': whyCount > ESSAY_LIMIT }">
                {{ whyCount }} / {{ ESSAY_LIMIT }}
              </span>
            </span>
            <textarea
              v-model="form.why_essay"
              rows="6"
              :maxlength="ESSAY_LIMIT + 200"
              placeholder="What pulled you toward sustainability and energy work? What about Beacon specifically?"
              required
            ></textarea>
            <span v-if="fieldError('why_essay')" class="field__err">{{ fieldError('why_essay') }}</span>
          </label>

          <label class="field" :class="{ 'field--err': fieldErrors.change_essay }">
            <span class="field__label">
              A sustainability change you'd push for at your school
              <span class="field__count" :class="{ 'field__count--over': changeCount > ESSAY_LIMIT }">
                {{ changeCount }} / {{ ESSAY_LIMIT }}
              </span>
            </span>
            <textarea
              v-model="form.change_essay"
              rows="6"
              :maxlength="ESSAY_LIMIT + 200"
              placeholder="Be concrete. What is it, who would you have to convince, and how would you measure that it worked?"
              required
            ></textarea>
            <span v-if="fieldError('change_essay')" class="field__err">{{ fieldError('change_essay') }}</span>
          </label>
        </div>

        <div class="apply__group">
          <h2 class="apply__group-title">Optional</h2>
          <label class="field" :class="{ 'field--err': fieldErrors.resume_url }">
            <span class="field__label">
              Resume or portfolio URL
              <span class="field__hint">Google Drive, Notion, personal site &mdash; whatever you'd share.</span>
            </span>
            <input
              v-model="form.resume_url"
              type="url"
              placeholder="https://"
            />
            <span v-if="fieldError('resume_url')" class="field__err">{{ fieldError('resume_url') }}</span>
          </label>
        </div>

        <div v-if="generalError" class="apply__general-err" role="alert">{{ generalError }}</div>

        <div class="apply__actions">
          <button type="submit" class="btn-primary apply__submit" :disabled="submitting">
            <span v-if="submitting">Submitting&hellip;</span>
            <template v-else>
              Submit application
              <span aria-hidden="true">&rarr;</span>
            </template>
          </button>
          <RouterLink to="/" class="btn-ghost">Cancel</RouterLink>
        </div>
      </form>
    </div>
  </main>
  <SiteFooter />
</template>

<style scoped>
.apply {
  position: relative;
  padding: 100px 0 var(--section-py);
  background: var(--paper-soft);
  overflow: hidden;
}

.apply__bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 90% 0%, rgba(255, 247, 194, 0.45), transparent 35%),
    radial-gradient(circle at 0% 100%, rgba(155, 214, 107, 0.18), transparent 45%);
  pointer-events: none;
}

.apply__inner {
  position: relative;
  max-width: 820px;
}

.apply__head {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 48px;
}

.apply__title {
  font-family: var(--font-serif);
  font-size: clamp(40px, 5.5vw, 64px);
  line-height: 1.05;
  letter-spacing: -0.02em;
  font-weight: 500;
  color: var(--beacon-ink);
}

.apply__title-italic {
  font-style: italic;
  color: var(--beacon-green-700);
  font-weight: 400;
}

.apply__lede {
  font-size: clamp(16px, 1.4vw, 18px);
  line-height: 1.55;
  color: var(--beacon-ink-soft);
  max-width: 60ch;
}

.apply__form {
  background: #ffffff;
  border: 1px solid rgba(15, 27, 18, 0.06);
  border-radius: var(--radius-xl);
  padding: clamp(28px, 4vw, 48px);
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  gap: 36px;
}

.apply__honeypot {
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.apply__group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.apply__group-title {
  font-family: var(--font-serif);
  font-size: 22px;
  font-weight: 500;
  color: var(--beacon-ink);
}

.apply__group-help {
  font-size: 14.5px;
  color: var(--beacon-ink-muted);
  line-height: 1.5;
}

.apply__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
}

.field--wide {
  grid-column: 1 / -1;
}

.field__label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-weight: 600;
  color: var(--beacon-ink);
  font-size: 13.5px;
  letter-spacing: 0.01em;
}

.field__hint {
  font-weight: 400;
  font-size: 12.5px;
  color: var(--beacon-ink-muted);
  margin-left: 8px;
  font-style: italic;
}

.field__count {
  font-family: var(--font-sans);
  font-size: 12px;
  color: var(--beacon-ink-muted);
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}

.field__count--over {
  color: #b1462f;
}

.field input,
.field select,
.field textarea {
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
  font-family: inherit;
}

.field textarea {
  resize: vertical;
  min-height: 120px;
  line-height: 1.55;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  border-color: var(--beacon-green-600);
  box-shadow: 0 0 0 4px rgba(110, 200, 100, 0.18);
  background: #ffffff;
}

.field--err input,
.field--err select,
.field--err textarea {
  border-color: #c2553e;
  background: #fff8f6;
}

.field__err {
  font-size: 13px;
  color: #b1462f;
  font-weight: 500;
}

.apply__tracks {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.track-pick {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 18px 18px 18px 20px;
  border: 1.5px solid rgba(15, 27, 18, 0.12);
  border-radius: var(--radius-lg);
  cursor: pointer;
  background: #fbfdf7;
  transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
}

.track-pick input {
  position: absolute;
  opacity: 0;
  inset: 0;
  cursor: pointer;
}

.track-pick:hover {
  border-color: var(--beacon-green-500);
}

.track-pick--active {
  border-color: var(--beacon-green-700);
  background: var(--beacon-green-50);
  box-shadow: 0 0 0 4px rgba(110, 200, 100, 0.18);
}

.track-pick__head {
  display: flex;
  align-items: center;
  gap: 10px;
}

.track-pick__num {
  font-family: var(--font-serif);
  font-weight: 600;
  font-size: 14px;
  color: var(--beacon-green-700);
  background: var(--beacon-green-100);
  padding: 2px 8px;
  border-radius: 999px;
}

.track-pick__name {
  font-family: var(--font-serif);
  font-size: 18px;
  font-weight: 500;
  color: var(--beacon-ink);
}

.track-pick__body {
  font-size: 13.5px;
  color: var(--beacon-ink-soft);
  line-height: 1.5;
}

.apply__tracks--err .track-pick {
  border-color: #c2553e;
}

.apply__general-err {
  background: #fff3ef;
  border: 1px solid #f3c4b6;
  color: #8c3823;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  font-size: 14px;
}

.apply__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.apply__submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.apply__success {
  background: #ffffff;
  border: 1px solid rgba(15, 27, 18, 0.06);
  border-radius: var(--radius-xl);
  padding: clamp(36px, 5vw, 56px);
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}

.apply__success-mark {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--beacon-green-50);
  color: var(--beacon-green-700);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.apply__success-title {
  font-family: var(--font-serif);
  font-size: clamp(28px, 3vw, 36px);
  color: var(--beacon-ink);
  font-weight: 500;
}

.apply__success-text {
  font-size: 16px;
  color: var(--beacon-ink-soft);
  line-height: 1.6;
  max-width: 56ch;
}

.apply__success-text a {
  color: var(--beacon-green-700);
  border-bottom: 1px solid var(--beacon-green-300);
}

.apply__success-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
}

@media (max-width: 640px) {
  .apply__row,
  .apply__tracks {
    grid-template-columns: 1fr;
  }
}
</style>
