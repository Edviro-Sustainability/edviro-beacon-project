<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import EdviroMark from './EdviroMark.vue'

const links = [
  { hash: '#program', label: 'Program' },
  { hash: '#tracks', label: 'Tracks' },
  { hash: '#fellows', label: 'Fellows' },
  { hash: '#about', label: 'About' },
]

const menuOpen = ref(false)
const scrolled = ref(false)
const route = useRoute()
const router = useRouter()

const isHome = computed(() => route.path === '/')

function close() {
  menuOpen.value = false
}

function gotoAnchor(hash: string) {
  close()
  if (isHome.value) {
    const el = document.querySelector(hash)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      history.replaceState(null, '', hash)
    }
  } else {
    router.push({ path: '/', hash })
  }
}

function onScroll() {
  scrolled.value = window.scrollY > 8
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header class="nav" :class="{ 'nav--scrolled': scrolled, 'nav--open': menuOpen }">
    <div class="container nav__inner">
      <RouterLink to="/" class="nav__brand" @click="close">
        <EdviroMark :size="48" />
      </RouterLink>

      <nav class="nav__links" :class="{ 'nav__links--open': menuOpen }" aria-label="Primary">
        <a
          v-for="link in links"
          :key="link.hash"
          :href="link.hash"
          class="nav__link"
          @click.prevent="gotoAnchor(link.hash)"
        >
          {{ link.label }}
        </a>
        <RouterLink to="/apply" class="btn-primary nav__cta-mobile" @click="close">
          Apply
        </RouterLink>
      </nav>

      <RouterLink to="/apply" class="btn-primary nav__cta">Apply</RouterLink>

      <button
        class="nav__burger"
        :aria-expanded="menuOpen"
        aria-controls="primary-menu"
        aria-label="Toggle menu"
        @click="menuOpen = !menuOpen"
      >
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 60;
  background: rgba(251, 253, 247, 0.72);
  backdrop-filter: saturate(160%) blur(12px);
  -webkit-backdrop-filter: saturate(160%) blur(12px);
  border-bottom: 1px solid transparent;
  transition: background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.nav--scrolled {
  background: rgba(251, 253, 247, 0.92);
  border-color: rgba(15, 27, 18, 0.06);
  box-shadow: 0 6px 20px rgba(15, 27, 18, 0.04);
}

.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 76px;
  gap: 24px;
}

.nav__brand {
  display: inline-flex;
  align-items: center;
}

.nav__links {
  display: flex;
  align-items: center;
  gap: 36px;
}

.nav__link {
  position: relative;
  font-size: 14px;
  font-weight: 500;
  color: var(--beacon-ink-soft);
  letter-spacing: 0.02em;
  text-transform: uppercase;
  padding: 6px 0;
  transition: color 0.2s ease;
}

.nav__link::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -4px;
  width: 0;
  height: 2px;
  background: var(--beacon-green-600);
  border-radius: 2px;
  transition: width 0.2s ease, left 0.2s ease;
}

.nav__link:hover {
  color: var(--beacon-green-700);
}

.nav__link:hover::after {
  width: 18px;
  left: calc(50% - 9px);
}

.nav__cta {
  padding: 11px 22px;
  font-size: 14px;
}

.nav__cta-mobile {
  display: none;
}

.nav__burger {
  display: none;
  width: 40px;
  height: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
}

.nav__burger span {
  width: 22px;
  height: 2px;
  background: var(--beacon-ink);
  border-radius: 2px;
  transition: transform 0.25s ease, opacity 0.2s ease;
  transform-origin: center;
}

.nav__burger span.open:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}
.nav__burger span.open:nth-child(2) {
  opacity: 0;
}
.nav__burger span.open:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

@media (max-width: 880px) {
  .nav__cta {
    display: none;
  }
  .nav__burger {
    display: inline-flex;
  }
  .nav__links {
    position: absolute;
    top: 76px;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    background: var(--paper-soft);
    border-bottom: 1px solid rgba(15, 27, 18, 0.06);
    padding: 12px 20px 24px;
    transform: translateY(-12px);
    opacity: 0;
    pointer-events: none;
    transition: transform 0.25s ease, opacity 0.2s ease;
    box-shadow: 0 16px 30px rgba(15, 27, 18, 0.06);
  }
  .nav__links--open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }
  .nav__link {
    padding: 14px 6px;
    border-bottom: 1px solid rgba(15, 27, 18, 0.05);
    font-size: 15px;
  }
  .nav__link::after {
    display: none;
  }
  .nav__cta-mobile {
    display: inline-flex;
    margin-top: 16px;
    align-self: flex-start;
  }
}
</style>
