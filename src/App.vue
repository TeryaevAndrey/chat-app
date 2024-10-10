<script setup lang="ts">
import { RouterView } from "vue-router";
import { DesktopLayout, MobLayout } from "./components/layout";
import { ref } from "vue";

const windowWidth = ref(window.innerWidth);
</script>

<template>
  <DesktopLayout v-if="windowWidth > 768">
    <RouterView />
  </DesktopLayout>

  <MobLayout v-if="windowWidth <= 768">
    <RouterView />
  </MobLayout>
</template>
