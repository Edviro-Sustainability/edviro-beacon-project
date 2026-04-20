<script setup lang="ts">
import { RouterLink } from 'vue-router'
import EdviroMark from './EdviroMark.vue'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <RouterLink to="/" aria-label="Edviro home">
          <EdviroMark :size="64" />
        </RouterLink>
        <p class="footer__tag">
          Sustainability-focused energy analytics for school districts.
        </p>
      </div>

      <div class="footer__cols">
        <div class="footer__col">
          <h4 class="footer__col-title">Beacon</h4>
          <RouterLink :to="{ path: '/', hash: '#program' }">Program</RouterLink>
          <RouterLink :to="{ path: '/', hash: '#tracks' }">Tracks</RouterLink>
          <RouterLink :to="{ path: '/', hash: '#fellows' }">Fellows</RouterLink>
          <RouterLink to="/apply">Apply</RouterLink>
        </div>
        <div class="footer__col">
          <h4 class="footer__col-title">Edviro</h4>
          <a href="https://edviroenergy.com" target="_blank" rel="noopener">edviroenergy.com</a>
        </div>
        <div class="footer__col">
          <h4 class="footer__col-title">Reach out</h4>
          <a href="mailto:hursh@edviroenergy.com">hursh@edviroenergy.com</a>
        </div>
      </div>
    </div>

    <div class="container footer__bottom">
      <span>&copy; {{ year }} Edviro Energy. All rights reserved.</span>
      <span class="footer__bottom-italic">The Beacon Project. Cohort 01.</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--paper);
  border-top: 1px solid rgba(15, 27, 18, 0.06);
  padding: 64px 0 24px;
}

.footer__inner {
  display: grid;
  grid-template-columns: 1.1fr 2fr;
  gap: 48px;
  align-items: flex-start;
  padding-bottom: 48px;
  border-bottom: 1px solid rgba(15, 27, 18, 0.06);
}

.footer__brand {
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 320px;
}

.footer__tag {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--beacon-ink-muted);
  font-size: 15px;
  line-height: 1.5;
}

.footer__cols {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.footer__col {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer__col-title {
  font-family: var(--font-sans);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--beacon-green-700);
  font-weight: 600;
  margin-bottom: 6px;
}

.footer__col a {
  font-size: 14px;
  color: var(--beacon-ink-soft);
  transition: color 0.2s ease;
}

.footer__col a:hover {
  color: var(--beacon-green-700);
}

.footer__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 24px;
  font-size: 13px;
  color: var(--beacon-ink-muted);
}

.footer__bottom-italic {
  font-family: var(--font-serif);
  font-style: italic;
}

@media (max-width: 760px) {
  .footer__inner {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .footer__cols {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
  .footer__bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
}
</style>
