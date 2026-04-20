<script setup lang="ts">
import logoUrl from '../../assets/logo.png'

defineProps<{
  size?: number
}>()
</script>

<template>
  <span class="mark">
    <img
      :src="logoUrl"
      :width="size ?? 36"
      :height="size ?? 36"
      alt="Edviro"
      class="mark__img"
      decoding="async"
    />
  </span>
</template>

<style scoped>
.mark {
  display: inline-flex;
  align-items: center;
}

.mark__img {
  display: block;
  height: auto;
  object-fit: contain;
}
</style>
