<script setup lang="ts">
const benefits = [
  {
    title: 'Mentorship from climate-tech & civic leaders',
    body: 'Direct working relationships with engineers, operators, and policy advocates inside the climate-tech and public-sector world.',
    icon: 'mentor',
  },
  {
    title: 'Formal recognition & completion certificate',
    body: 'A signed Beacon Fellow certificate from Edviro Energy that documents the work you shipped \u2014 not just attendance.',
    icon: 'cert',
  },
  {
    title: 'A high-impact student cohort',
    body: 'Access to a national network of fellows working on the same kind of civic infrastructure in their own districts.',
    icon: 'cohort',
  },
  {
    title: 'Recommendation letters for standout fellows',
    body: 'Personal letters of recommendation from Edviro leadership for fellows who demonstrate exceptional impact.',
    icon: 'letter',
  },
  {
    title: 'Eligibility for microgrants & stipends',
    body: 'Funding to remove barriers and reward fellows pursuing ambitious projects in their schools and districts.',
    icon: 'grant',
  },
  {
    title: 'Priority for future Edviro opportunities',
    body: 'Internships, advisory roles, and future Edviro programs open first to alumni of the Beacon Fellows Program.',
    icon: 'future',
  },
]
</script>

<template>
  <section class="receive">
    <div class="container">
      <div class="receive__head">
        <span class="eyebrow">What fellows receive</span>
        <h2 class="section-heading">
          Built so the work compounds<br />
          <span class="receive__head-italic">long after the summer ends.</span>
        </h2>
      </div>

      <div class="receive__grid">
        <article v-for="b in benefits" :key="b.title" class="benefit">
          <div class="benefit__icon" aria-hidden="true">
            <svg v-if="b.icon === 'mentor'" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2" />
              <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              <path d="M19 4l1.2 2.4L23 7l-2 1.6.5 2.4-2.5-1.4-2.5 1.4.5-2.4-2-1.6 2.8-.6L19 4z" fill="currentColor" />
            </svg>
            <svg v-else-if="b.icon === 'cert'" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="13" rx="2" stroke="currentColor" stroke-width="2" />
              <path d="M7 9h10M7 12h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              <circle cx="17" cy="14" r="2" stroke="currentColor" stroke-width="2" />
              <path d="M16 16l-1 4 2-1 2 1-1-4" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
            </svg>
            <svg v-else-if="b.icon === 'cohort'" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" />
              <circle cx="5" cy="6" r="2" stroke="currentColor" stroke-width="2" />
              <circle cx="19" cy="6" r="2" stroke="currentColor" stroke-width="2" />
              <circle cx="5" cy="18" r="2" stroke="currentColor" stroke-width="2" />
              <circle cx="19" cy="18" r="2" stroke="currentColor" stroke-width="2" />
              <path d="M7 7l3 3M17 7l-3 3M7 17l3-3M17 17l-3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
            <svg v-else-if="b.icon === 'letter'" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="2" />
              <path d="M3 7l9 6 9-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <svg v-else-if="b.icon === 'grant'" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" />
              <path
                d="M15 9c-.5-1-1.7-1.5-3-1.5-1.7 0-3 1-3 2.3 0 1.4 1.5 1.9 3 2.2 1.5.3 3 .8 3 2.2 0 1.3-1.3 2.3-3 2.3-1.3 0-2.5-.5-3-1.5M12 6v2M12 16v2"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none">
              <path d="M5 12h12M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <circle cx="5" cy="12" r="1.5" fill="currentColor" />
            </svg>
          </div>
          <div class="benefit__body">
            <h3 class="benefit__title">{{ b.title }}</h3>
            <p class="benefit__text">{{ b.body }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.receive {
  background: var(--beacon-ink);
  color: var(--paper);
  padding: var(--section-py) 0;
  position: relative;
  overflow: hidden;
}

.receive::before {
  content: '';
  position: absolute;
  top: -200px;
  right: -200px;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(110, 200, 100, 0.18), transparent 65%);
  pointer-events: none;
}

.receive::after {
  content: '';
  position: absolute;
  bottom: -240px;
  left: -180px;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 247, 194, 0.08), transparent 65%);
  pointer-events: none;
}

.receive__head {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-width: 740px;
  margin-bottom: 64px;
}

.receive__head .eyebrow {
  color: var(--beacon-green-300);
}

.receive__head .eyebrow::before {
  background: var(--beacon-green-300);
}

.receive__head .section-heading {
  color: var(--paper);
}

.receive__head-italic {
  font-style: italic;
  color: var(--beacon-green-300);
  font-weight: 400;
}

.receive__grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 18px;
}

.benefit {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  padding: 26px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
}

.benefit:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(155, 214, 107, 0.35);
  transform: translateY(-3px);
}

.benefit__icon {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: rgba(155, 214, 107, 0.18);
  color: var(--beacon-green-200);
}

.benefit__icon svg {
  width: 24px;
  height: 24px;
}

.benefit__title {
  font-family: var(--font-serif);
  font-size: 18px;
  font-weight: 500;
  line-height: 1.3;
  color: var(--paper);
  margin-bottom: 6px;
}

.benefit__text {
  font-size: 14.5px;
  line-height: 1.6;
  color: rgba(244, 248, 238, 0.72);
}
</style>
