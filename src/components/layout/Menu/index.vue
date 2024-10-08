<script setup lang="ts">
import { ThemeButton } from '@/components/ui';
</script>

<template>
  <div class="wrapper">
    <ThemeButton />

    <button class="btn btn-square">
      <unicon class="fill-base-content" name="setting"></unicon>
    </button>
  </div>
</template>

<style scoped>
.wrapper {
  @apply h-full w-[80px] bg-base-200 flex items-center justify-end py-6 flex-col;
}
</style>
