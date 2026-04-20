<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="cta">
    <div class="cta__sun" aria-hidden="true">
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="ctaSun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FFFEEB" stop-opacity="0.95" />
            <stop offset="60%" stop-color="#FFF5A8" stop-opacity="0.4" />
            <stop offset="100%" stop-color="#FFE98A" stop-opacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="200" fill="url(#ctaSun)" />
      </svg>
    </div>

    <div class="container cta__inner">
      <span class="eyebrow cta__eyebrow">Applications open</span>
      <h2 class="cta__heading">
        Become a <span class="cta__heading-italic">Beacon Fellow.</span>
      </h2>
      <p class="cta__lede">
        If you're a high school student who's tired of waiting for adults to act on climate &mdash;
        this program was built for you. Bring your school with you.
      </p>
      <div class="cta__actions">
        <RouterLink to="/apply" class="btn-primary cta__btn">
          Apply for the Fellowship
          <span aria-hidden="true">&rarr;</span>
        </RouterLink>
        <a href="mailto:hursh@edviroenergy.com" class="cta__email">
          or email hursh@edviroenergy.com
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(ellipse 60% 80% at 50% 100%, rgba(255, 255, 255, 0.6), transparent 60%),
    linear-gradient(135deg, #b6dd9c 0%, #93d27e 50%, #7cc566 100%);
  padding: clamp(80px, 10vw, 140px) 0;
  text-align: center;
  color: var(--beacon-ink);
}

.cta__sun {
  position: absolute;
  top: -120px;
  right: -100px;
  width: 480px;
  height: 480px;
  pointer-events: none;
}

.cta__sun svg {
  width: 100%;
  height: 100%;
}

.cta__inner {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
}

.cta__eyebrow {
  color: var(--beacon-green-800);
}

.cta__eyebrow::before {
  background: var(--beacon-green-800);
}

.cta__heading {
  font-family: var(--font-serif);
  font-size: clamp(40px, 7vw, 84px);
  line-height: 1;
  letter-spacing: -0.025em;
  font-weight: 500;
  color: var(--beacon-ink);
  max-width: 16ch;
}

.cta__heading-italic {
  font-style: italic;
  color: var(--beacon-green-800);
  font-weight: 400;
}

.cta__lede {
  font-size: clamp(16px, 1.6vw, 19px);
  line-height: 1.55;
  color: var(--beacon-ink-soft);
  max-width: 56ch;
}

.cta__actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  margin-top: 12px;
}

.cta__btn {
  padding: 16px 32px;
  font-size: 16px;
  background: var(--beacon-ink);
  box-shadow: 0 12px 30px rgba(15, 27, 18, 0.25);
}

.cta__btn:hover {
  background: var(--beacon-green-900);
  box-shadow: 0 14px 36px rgba(15, 27, 18, 0.35);
}

.cta__email {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 15px;
  color: var(--beacon-ink-soft);
  border-bottom: 1px solid rgba(15, 27, 18, 0.2);
  padding-bottom: 1px;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.cta__email:hover {
  color: var(--beacon-green-800);
  border-color: var(--beacon-green-800);
}
</style>
