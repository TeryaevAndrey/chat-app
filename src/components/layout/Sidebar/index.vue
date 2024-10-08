<script setup lang="ts">
import { Search } from "@/components/ui";
</script>

<template>
  <div class="root">
    <Search class="search" />
  </div>
</template>

<style scoped>
.root {
  @apply bg-base-300 h-full w-[250px];
}

.search {
  @apply mx-6 mt-6 w-[calc(100%-48px)];
}
</style>
