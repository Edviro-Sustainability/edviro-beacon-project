<script setup lang="ts">
const features = [
  {
    title: 'See where your tax dollars go',
    body: 'Clear, public breakdowns of school energy spend, so constituents can see how district budgets translate into emissions and savings.',
    icon: 'taxes',
  },
  {
    title: 'Track every efficiency upgrade',
    body: 'HVAC retrofits, solar installs, lighting swaps. Beacon shows the upgrades each school is making, and the measurable impact afterwards.',
    icon: 'upgrade',
  },
  {
    title: 'Compare schools side by side',
    body: 'Benchmark schools against each other. See who is leading on sustainability, and where attention is needed next.',
    icon: 'compare',
  },
]
</script>

<template>
  <section id="about" class="presented">
    <div class="container">
      <div class="presented__head">
        <span class="eyebrow">What the Beacon Project does</span>
        <h2 class="section-heading">
          Public energy transparency,<br />
          <span class="presented__head-italic">school by school.</span>
        </h2>
        <p class="section-lede">
          The Beacon Project is the public face of Edviro's work with school districts. We
          turn district energy data into dashboards that students, parents, school boards,
          and taxpayers can actually read, question, and act on.
        </p>
      </div>

      <div class="presented__grid">
        <article v-for="f in features" :key="f.title" class="card">
          <div class="card__icon" :data-icon="f.icon" aria-hidden="true">
            <svg v-if="f.icon === 'taxes'" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" stroke-width="2" />
              <path d="M3 10h18" stroke="currentColor" stroke-width="2" />
              <circle cx="12" cy="14.5" r="2.2" stroke="currentColor" stroke-width="2" />
              <path d="M12 13v3" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
            <svg v-else-if="f.icon === 'upgrade'" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 19l5-5 4 4 9-9"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path d="M15 9h6v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none">
              <rect x="3" y="11" width="6" height="9" rx="1" stroke="currentColor" stroke-width="2" />
              <rect x="10" y="7" width="6" height="13" rx="1" stroke="currentColor" stroke-width="2" />
              <rect x="17" y="3" width="4" height="17" rx="1" stroke="currentColor" stroke-width="2" />
            </svg>
          </div>
          <h3 class="card__title">{{ f.title }}</h3>
          <p class="card__body">{{ f.body }}</p>
        </article>
      </div>

      <div class="presented__quote">
        <svg
          class="presented__quote-mark"
          width="44"
          height="36"
          viewBox="0 0 44 36"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M0 36V20C0 9 6 1 18 0v6C11 7 7 11 7 18h11v18H0zm26 0V20C26 9 32 1 44 0v6C37 7 33 11 33 18h11v18H26z"
            fill="currentColor"
          />
        </svg>
        <p class="presented__quote-text">
          Passionate young people change things. The Beacon Project is how we hand them real responsibility over their school's energy use, with the data and transparency to back it up.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.presented {
  background: var(--paper-soft);
  padding: var(--section-py) 0;
  position: relative;
}

.presented__head {
  max-width: 760px;
  margin-bottom: 64px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.presented__head-italic {
  font-style: italic;
  color: var(--beacon-green-700);
  font-weight: 400;
}

.presented__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
  margin-bottom: 80px;
}

.card {
  background: #ffffff;
  border: 1px solid rgba(15, 27, 18, 0.06);
  border-radius: var(--radius-lg);
  padding: 32px 28px;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: rgba(46, 125, 50, 0.18);
}

.card__icon {
  width: 48px;
  height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: var(--beacon-green-50);
  color: var(--beacon-green-700);
}

.card__icon svg {
  width: 26px;
  height: 26px;
}

.card__title {
  font-family: var(--font-serif);
  font-size: 22px;
  font-weight: 500;
  color: var(--beacon-ink);
  line-height: 1.2;
}

.card__body {
  font-size: 15px;
  line-height: 1.6;
  color: var(--beacon-ink-soft);
}

.presented__quote {
  position: relative;
  max-width: 820px;
  margin: 0 auto;
  padding: 40px 32px 40px 88px;
  background: linear-gradient(135deg, var(--beacon-green-50) 0%, #ffffff 100%);
  border-left: 4px solid var(--beacon-green-600);
  border-radius: var(--radius-md);
}

.presented__quote-mark {
  position: absolute;
  top: 32px;
  left: 28px;
  color: var(--beacon-green-300);
}

.presented__quote-text {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(20px, 2.2vw, 26px);
  line-height: 1.4;
  color: var(--beacon-ink);
}

@media (max-width: 600px) {
  .presented__quote {
    padding: 32px 22px 28px 22px;
  }
  .presented__quote-mark {
    position: static;
    margin-bottom: 12px;
  }
}
</style>
