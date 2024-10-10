<script setup lang="ts">
import { Search } from "@/components/ui";
import { UsersList } from "./components/widgets";
</script>

<template>
  <div class="sidebar">
    <Search class="search" />

    <UsersList class="mt-8" />
  </div>
</template>

<style scoped>
.sidebar {
  @apply bg-base-300 pt-6 h-full w-full md:w-[250px] md:min-w-[250px];
}

.search {
  @apply mx-6 w-[calc(100%-48px)];
}
</style>
