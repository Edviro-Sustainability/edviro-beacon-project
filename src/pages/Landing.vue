<script setup lang="ts">
import SiteNav from '../components/beacon/SiteNav.vue'
import HeroSection from '../components/beacon/HeroSection.vue'
import PresentedBy from '../components/beacon/PresentedBy.vue'
import ProgramSection from '../components/beacon/ProgramSection.vue'
import TracksSection from '../components/beacon/TracksSection.vue'
import FellowsDoSection from '../components/beacon/FellowsDoSection.vue'
import FellowsReceiveSection from '../components/beacon/FellowsReceiveSection.vue'
import ApplyCTA from '../components/beacon/ApplyCTA.vue'
import SiteFooter from '../components/beacon/SiteFooter.vue'
</script>

<template>
  <SiteNav />
  <main>
    <HeroSection />
    <PresentedBy />
    <ProgramSection />
    <TracksSection />
    <FellowsDoSection />
    <FellowsReceiveSection />
    <ApplyCTA />
  </main>
  <SiteFooter />
</template>
