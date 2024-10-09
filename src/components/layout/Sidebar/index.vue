<script setup lang="ts">
import { Search } from "@/components/ui";
import { UsersList } from "./components/widgets";
</script>

<template>
  <div class="wrapper">
    <Search class="search" />

    <UsersList class="mt-8" />
  </div>
</template>

<style scoped>
.wrapper {
  @apply bg-base-300 h-full w-[250px] min-w-[250px];
}

.search {
  @apply mx-6 mt-6 w-[calc(100%-48px)];
}
</style>
