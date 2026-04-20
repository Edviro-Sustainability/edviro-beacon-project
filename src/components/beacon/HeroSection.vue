<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section id="top" class="hero">
    <div class="hero__sun" aria-hidden="true">
      <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="sunCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FFFEEB" stop-opacity="1" />
            <stop offset="40%" stop-color="#FFF5A8" stop-opacity="0.9" />
            <stop offset="100%" stop-color="#FFE98A" stop-opacity="0" />
          </radialGradient>
          <radialGradient id="sunHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.55" />
            <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0" />
          </radialGradient>
        </defs>
        <circle cx="300" cy="300" r="300" fill="url(#sunHalo)" />
        <circle cx="300" cy="300" r="170" fill="url(#sunCore)" />
        <g stroke="#FFFAD2" stroke-width="3" stroke-linecap="round" opacity="0.85">
          <line x1="300" y1="40" x2="300" y2="120" />
          <line x1="300" y1="480" x2="300" y2="560" />
          <line x1="40" y1="300" x2="120" y2="300" />
          <line x1="480" y1="300" x2="560" y2="300" />
          <line x1="115" y1="115" x2="170" y2="170" />
          <line x1="430" y1="430" x2="485" y2="485" />
          <line x1="485" y1="115" x2="430" y2="170" />
          <line x1="170" y1="430" x2="115" y2="485" />
        </g>
        <g stroke="#FFF7C2" stroke-width="2" stroke-linecap="round" opacity="0.7">
          <line x1="300" y1="80" x2="300" y2="160" transform="rotate(22.5 300 300)" />
          <line x1="300" y1="80" x2="300" y2="160" transform="rotate(67.5 300 300)" />
          <line x1="300" y1="80" x2="300" y2="160" transform="rotate(112.5 300 300)" />
          <line x1="300" y1="80" x2="300" y2="160" transform="rotate(157.5 300 300)" />
          <line x1="300" y1="80" x2="300" y2="160" transform="rotate(202.5 300 300)" />
          <line x1="300" y1="80" x2="300" y2="160" transform="rotate(247.5 300 300)" />
          <line x1="300" y1="80" x2="300" y2="160" transform="rotate(292.5 300 300)" />
          <line x1="300" y1="80" x2="300" y2="160" transform="rotate(337.5 300 300)" />
        </g>
      </svg>
    </div>

    <div class="hero__splatter hero__splatter--a" aria-hidden="true"></div>
    <div class="hero__splatter hero__splatter--b" aria-hidden="true"></div>

    <div class="container hero__inner">
      <div class="hero__content fade-up">
        <div class="hero__presents">
          <span class="hero__presents-italic">edviro</span> presents:
        </div>

        <h1 class="wordmark">
          <span class="wordmark__the">the</span>
          <span class="wordmark__main">beacon</span>
          <span class="wordmark__project">project</span>
        </h1>

        <p class="hero__tagline">
          summer sustainability fellowship<br />for ambitious high schoolers
        </p>

        <div class="hero__cta">
          <RouterLink to="/apply" class="btn-primary">
            Apply for the Fellowship
            <span aria-hidden="true">&rarr;</span>
          </RouterLink>
          <a href="#program" class="btn-ghost">Learn more</a>
        </div>
      </div>
    </div>

    <div class="hero__scroll" aria-hidden="true">
      <span>scroll</span>
      <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
        <rect x="1" y="1" width="12" height="20" rx="6" stroke="currentColor" stroke-width="1.5" />
        <circle cx="7" cy="7" r="1.5" fill="currentColor">
          <animate attributeName="cy" values="7;13;7" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  min-height: clamp(720px, 100vh, 980px);
  background:
    radial-gradient(ellipse 90% 70% at 80% 10%, rgba(255, 247, 194, 0.55) 0%, rgba(255, 247, 194, 0) 60%),
    radial-gradient(ellipse 70% 50% at 30% 80%, rgba(110, 200, 100, 0.18) 0%, rgba(110, 200, 100, 0) 70%),
    linear-gradient(180deg, #d6ecc1 0%, #c4e4ad 35%, #b6dd9c 100%);
  display: flex;
  align-items: center;
  padding: 120px 0 80px;
}

.hero__sun {
  position: absolute;
  top: -180px;
  right: -160px;
  width: 720px;
  height: 720px;
  pointer-events: none;
  filter: blur(0.4px);
  opacity: 0.95;
}

.hero__sun svg {
  width: 100%;
  height: 100%;
  animation: sunSpin 60s linear infinite;
}

@keyframes sunSpin {
  to {
    transform: rotate(360deg);
  }
}

.hero__splatter {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  pointer-events: none;
}

.hero__splatter--a {
  top: 30%;
  left: -8%;
  width: 520px;
  height: 380px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0) 70%);
}

.hero__splatter--b {
  bottom: -10%;
  left: 25%;
  width: 480px;
  height: 380px;
  background: radial-gradient(circle, rgba(180, 220, 150, 0.4) 0%, rgba(180, 220, 150, 0) 70%);
}

.hero__inner {
  position: relative;
  z-index: 2;
}

.hero__content {
  max-width: 780px;
}

.hero__presents {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(18px, 2vw, 22px);
  color: var(--beacon-green-800);
  margin-bottom: 28px;
  letter-spacing: 0.01em;
}

.hero__presents-italic {
  font-weight: 600;
}

.wordmark {
  position: relative;
  font-family: var(--font-serif);
  color: var(--beacon-ink);
  line-height: 0.92;
  margin-bottom: 32px;
  display: grid;
  gap: 0;
}

.wordmark__the {
  font-style: italic;
  font-weight: 300;
  font-size: clamp(28px, 4vw, 48px);
  color: var(--beacon-ink-soft);
  margin-left: 6px;
  margin-bottom: 4px;
  font-family: var(--font-serif);
}

.wordmark__main {
  font-size: clamp(82px, 14vw, 200px);
  font-weight: 600;
  letter-spacing: -0.04em;
  color: var(--beacon-ink);
  font-family: var(--font-serif);
}

.wordmark__project {
  font-size: clamp(36px, 5.5vw, 72px);
  font-weight: 400;
  letter-spacing: -0.01em;
  color: var(--beacon-ink);
  font-family: var(--font-sans);
  margin-top: -8px;
  margin-left: 50%;
  transform: translateX(-10%);
}

.hero__tagline {
  font-family: var(--font-sans);
  font-style: italic;
  font-weight: 500;
  font-size: clamp(18px, 1.8vw, 22px);
  color: var(--beacon-ink-soft);
  line-height: 1.45;
  margin-bottom: 36px;
  max-width: 520px;
}

.hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.hero__scroll {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--beacon-green-800);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  opacity: 0.75;
}

@media (max-width: 700px) {
  .hero {
    padding: 100px 0 60px;
    min-height: 92vh;
  }
  .hero__sun {
    top: -120px;
    right: -180px;
    width: 460px;
    height: 460px;
  }
  .wordmark__project {
    margin-left: 30%;
  }
  .hero__scroll {
    display: none;
  }
}
</style>
