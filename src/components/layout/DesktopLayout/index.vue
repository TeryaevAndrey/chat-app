<script setup lang="ts">
import { Menu, Sidebar } from "@/components/layout";
</script>

<template>
  <div class="root">
    <div class="main-block">
      <div class="inner">
        <Menu />
        <Sidebar />
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.root {
  @apply bg-base-100 flex justify-center items-center h-screen;
}

.main-block {
  @apply max-w-4xl xl:max-w-5xl w-full bg-base-200 rounded-3xl h-[70vh] overflow-hidden;
}

.inner {
  @apply flex h-full relative;
}
</style>
