<script setup lang="ts">
import { LanguageButton, SettingsButton, ThemeButton } from "@/components/ui";
</script>

<template>
  <div class="wrapper">
    <ThemeButton />

    <SettingsButton />
    
    <LanguageButton />
  </div>
</template>

<style scoped>
.wrapper {
  @apply h-full w-[80px] bg-base-200 flex items-center justify-end py-6 flex-col;
}
</style>
