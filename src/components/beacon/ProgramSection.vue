<script setup lang="ts">
const facts = [
  { label: 'Selective cohort', value: 'Application-only' },
  { label: 'Eligibility', value: 'High schoolers' },
  { label: 'Format', value: 'Local impact' },
  { label: 'Outcome', value: 'Transparency and advocacy' },
]
</script>

<template>
  <section id="program" class="program">
    <div class="program__poster" aria-hidden="true"></div>

    <div class="container program__inner">
      <div class="program__copy">
        <span class="eyebrow">The Beacon Fellows Program</span>
        <h2 class="section-heading">
          A student leadership program for the people who refuse to wait.
        </h2>
        <p class="program__lede">
          The Beacon Project is a selective student leadership program for environmentally
          conscious students who want to spearhead sustainable changes and public energy
          transparency in their schools.
        </p>
        <p class="program__body">
          Fellows work alongside the Edviro team to shape
          how their districts measure, communicate, and act on energy data, as well as build dashboards that their classmates, parents, and school boards will use for years to come.
        </p>

        <ul class="program__facts">
          <li v-for="f in facts" :key="f.label">
            <span class="program__fact-label">{{ f.label }}</span>
            <span class="program__fact-value">{{ f.value }}</span>
          </li>
        </ul>
      </div>

      <aside class="program__poster-card">
        <div class="program__poster-caption">
          <span class="eyebrow">Cohort 01</span>
          <span class="program__poster-text">Now accepting applications</span>
        </div>
        <img
          src="/beacon-poster.png"
          alt="The Beacon Project poster: edviro presents the beacon project, a summer sustainability fellowship for ambitious high schoolers."
          loading="lazy"
        />
      </aside>
    </div>
  </section>
</template>

<style scoped>
.program {
  position: relative;
  background: linear-gradient(180deg, var(--paper-soft) 0%, var(--paper-warm) 100%);
  padding: var(--section-py) 0;
  overflow: hidden;
}

.program__poster {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 90% 10%, rgba(255, 247, 194, 0.35), transparent 40%),
    radial-gradient(circle at 5% 90%, rgba(110, 200, 100, 0.18), transparent 45%);
  pointer-events: none;
}

.program__inner {
  position: relative;
  display: grid;
  grid-template-columns: 1.2fr 0.9fr;
  gap: 64px;
  align-items: center;
}

.program__copy {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.program__lede {
  font-size: clamp(18px, 1.7vw, 21px);
  line-height: 1.55;
  color: var(--beacon-ink-soft);
  font-weight: 400;
}

.program__body {
  font-size: 16px;
  line-height: 1.7;
  color: var(--beacon-ink-muted);
}

.program__facts {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  margin-top: 16px;
  padding: 0;
}

.program__facts li {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(15, 27, 18, 0.06);
  border-radius: var(--radius-md);
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.program__fact-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--beacon-green-700);
  font-weight: 600;
}

.program__fact-value {
  font-family: var(--font-serif);
  font-size: 18px;
  color: var(--beacon-ink);
  font-weight: 500;
}

.program__poster-card {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: var(--paper);
  box-shadow: var(--shadow-lg);
  transform: rotate(-1.5deg);
  transition: transform 0.4s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.program__poster-card:hover {
  transform: rotate(0deg) translateY(-4px);
}

.program__poster-card img {
  width: 100%;
  height: auto;
  display: block;
}

.program__poster-caption {
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  z-index: 2;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  box-shadow: 0 4px 14px rgba(15, 27, 18, 0.08);
}

.program__poster-text {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--beacon-ink);
  font-size: 14px;
}

@media (max-width: 900px) {
  .program__inner {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  .program__poster-card {
    max-width: 420px;
    margin: 0 auto;
  }
  .program__facts {
    grid-template-columns: 1fr;
  }
}
</style>
