<script setup lang="ts">
const items = [
  {
    title: 'Learn how district energy systems work',
    body: 'Get inside the metering, billing, and decision-making structures that govern your school\u2019s emissions footprint.',
    icon: 'school',
  },
  {
    title: 'Contribute to a real public initiative',
    body: 'Your work ships into the Beacon public energy transparency program \u2014 not a hypothetical case study.',
    icon: 'spark',
  },
  {
    title: 'Build support across stakeholders',
    body: 'Earn buy-in from students, parents, teachers, and school leaders. Coalitions are how transparency actually lands.',
    icon: 'people',
  },
  {
    title: 'Shape how data reaches the public',
    body: 'Help define what district energy dashboards say, who they speak to, and what action they invite.',
    icon: 'screen',
  },
]
</script>

<template>
  <section id="fellows" class="do">
    <div class="do__bg" aria-hidden="true"></div>
    <div class="container">
      <div class="do__head">
        <span class="eyebrow">What fellows will do</span>
        <h2 class="section-heading">
          Real work, real consequences,<br />
          <span class="do__head-italic">measurable civic impact.</span>
        </h2>
      </div>

      <div class="do__grid">
        <article v-for="item in items" :key="item.title" class="do__item">
          <div class="do__icon" aria-hidden="true">
            <svg v-if="item.icon === 'school'" viewBox="0 0 24 24" fill="none">
              <path d="M3 10l9-5 9 5-9 5-9-5z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
              <path d="M7 12v5c0 1 2 2 5 2s5-1 5-2v-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              <path d="M21 10v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
            <svg v-else-if="item.icon === 'spark'" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
              <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" />
            </svg>
            <svg v-else-if="item.icon === 'people'" viewBox="0 0 24 24" fill="none">
              <circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="2" />
              <circle cx="17" cy="9" r="2.5" stroke="currentColor" stroke-width="2" />
              <path d="M2 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              <path d="M14 20c0-2.5 2-4.5 4.5-4.5s3.5 1.5 3.5 3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="13" rx="2" stroke="currentColor" stroke-width="2" />
              <path d="M8 21h8M12 17v4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              <path d="M7 12l3-3 3 3 4-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <h3 class="do__title">{{ item.title }}</h3>
          <p class="do__body">{{ item.body }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.do {
  position: relative;
  background: linear-gradient(180deg, var(--paper-warm) 0%, var(--beacon-green-50) 100%);
  padding: var(--section-py) 0;
  overflow: hidden;
}

.do__bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 100% 0%, rgba(255, 247, 194, 0.45), transparent 35%),
    radial-gradient(circle at 0% 100%, rgba(155, 214, 107, 0.2), transparent 40%);
  pointer-events: none;
}

.do__head {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-width: 740px;
  margin-bottom: 64px;
}

.do__head-italic {
  font-style: italic;
  color: var(--beacon-green-700);
  font-weight: 400;
}

.do__grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 18px;
}

.do__item {
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: var(--radius-lg);
  padding: 28px 26px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
}

.do__item:hover {
  transform: translateY(-4px);
  background: #ffffff;
  box-shadow: var(--shadow-md);
}

.do__icon {
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: var(--beacon-green-100);
  color: var(--beacon-green-800);
}

.do__icon svg {
  width: 24px;
  height: 24px;
}

.do__title {
  font-family: var(--font-serif);
  font-size: 19px;
  font-weight: 500;
  line-height: 1.25;
  color: var(--beacon-ink);
}

.do__body {
  font-size: 14.5px;
  line-height: 1.6;
  color: var(--beacon-ink-soft);
}
</style>
