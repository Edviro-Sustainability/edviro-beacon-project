<script setup lang="ts">
const tracks = [
  {
    id: 'data',
    label: 'Data Track',
    headline: 'Turn raw district energy data into public insight.',
    summary:
      'Analyze school energy data and shape how it reaches the public through Beacon dashboards.',
    bullets: [
      'Work with anonymized district energy datasets',
      'Prototype dashboard views with the Edviro engineering team',
      'Translate ML anomaly signals into stories the public can understand',
      'Define what "transparency" actually looks like on screen',
    ],
    accent: 'data',
  },
  {
    id: 'policy',
    label: 'Policy Track',
    headline: 'Build the coalition that gets transparency adopted.',
    summary:
      'Build stakeholder support and drive adoption of transparency in schools and districts.',
    bullets: [
      'Map decision-makers across your district and surrounding districts',
      'Draft proposals for school boards and PTAs',
      'Run student- and parent-facing engagement campaigns',
      'Help districts adopt the Beacon public dashboard standard',
    ],
    accent: 'policy',
  },
]
</script>

<template>
  <section id="tracks" class="tracks">
    <div class="container">
      <div class="tracks__head">
        <span class="eyebrow">Choose your track</span>
        <h2 class="section-heading">
          Two paths.<br />
          <span class="tracks__head-italic">One mission.</span>
        </h2>
        <p class="section-lede">
          Every fellow picks a focus area. Both tracks ship into the same public initiative.
          You choose whether to lead with data or with people.
        </p>
      </div>

      <div class="tracks__grid">
        <article
          v-for="(t, i) in tracks"
          :key="t.id"
          class="track"
          :class="`track--${t.accent}`"
          :style="{ animationDelay: `${i * 80}ms` }"
        >
          <div class="track__badge">
            <span class="track__num">0{{ i + 1 }}</span>
            <span class="track__label">{{ t.label }}</span>
          </div>

          <h3 class="track__headline">{{ t.headline }}</h3>
          <p class="track__summary">{{ t.summary }}</p>

          <div class="track__divider" aria-hidden="true"></div>

          <ul class="track__bullets">
            <li v-for="b in t.bullets" :key="b">
              <span class="track__check" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2 7.5l3 3 7-7"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <span>{{ b }}</span>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tracks {
  padding: var(--section-py) 0;
  background: var(--paper-soft);
}

.tracks__head {
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-width: 720px;
  margin-bottom: 56px;
}

.tracks__head-italic {
  font-style: italic;
  color: var(--beacon-green-700);
  font-weight: 400;
}

.tracks__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.track {
  position: relative;
  background: #ffffff;
  border-radius: var(--radius-xl);
  padding: 40px 36px 36px;
  border: 1px solid rgba(15, 27, 18, 0.06);
  display: flex;
  flex-direction: column;
  gap: 18px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.track::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, var(--beacon-green-500), var(--beacon-green-700));
}

.track--data::after {
  content: '';
  position: absolute;
  top: -120px;
  right: -120px;
  width: 320px;
  height: 320px;
  background: radial-gradient(circle, rgba(255, 247, 194, 0.5), transparent 60%);
  pointer-events: none;
}

.track--policy::after {
  content: '';
  position: absolute;
  bottom: -120px;
  left: -120px;
  width: 320px;
  height: 320px;
  background: radial-gradient(circle, rgba(110, 200, 100, 0.18), transparent 60%);
  pointer-events: none;
}

.track:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
}

.track__badge {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 8px 14px 8px 8px;
  background: var(--beacon-green-50);
  border-radius: var(--radius-pill);
  align-self: flex-start;
  position: relative;
  z-index: 1;
}

.track__num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: var(--beacon-green-700);
  color: #fff;
  border-radius: 50%;
  font-family: var(--font-serif);
  font-weight: 600;
  font-size: 13px;
}

.track__label {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--beacon-green-800);
}

.track__headline {
  font-family: var(--font-serif);
  font-size: clamp(24px, 2.6vw, 32px);
  line-height: 1.2;
  font-weight: 500;
  color: var(--beacon-ink);
  position: relative;
  z-index: 1;
}

.track__summary {
  font-size: 16px;
  line-height: 1.65;
  color: var(--beacon-ink-soft);
  position: relative;
  z-index: 1;
}

.track__divider {
  height: 1px;
  background: linear-gradient(90deg, rgba(15, 27, 18, 0.12), transparent);
  margin: 4px 0;
}

.track__bullets {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0;
  position: relative;
  z-index: 1;
}

.track__bullets li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 15px;
  line-height: 1.5;
  color: var(--beacon-ink-soft);
}

.track__check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--beacon-green-100);
  color: var(--beacon-green-800);
  flex-shrink: 0;
  margin-top: 2px;
}

@media (max-width: 800px) {
  .tracks__grid {
    grid-template-columns: 1fr;
  }
  .track {
    padding: 32px 26px 28px;
  }
}
</style>
