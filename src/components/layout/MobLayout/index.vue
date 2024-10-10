<script setup lang="ts">
import { MobMenu, Sidebar } from "..";
</script>

<template>
  <div>
    <div class="h-[calc(100dvh-80px)]">
      <Sidebar class="w-full max-w-full" />
    </div>

    <!-- <Chat /> -->

    <MobMenu />
  </div>
</template>
