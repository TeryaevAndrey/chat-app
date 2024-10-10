<script setup lang="ts">
import { LanguageButton, ThemeButton } from "@/components/ui";
</script>

<template>
  <div
    class="fixed bottom-0 left-0 right-0 flex items-center justify-center gap-8 py-4 px-6 border-t border-base-300 h-[80px] bg-base-200"
  >
    <ThemeButton />

    <button class="btn btn-square">
      <unicon class="fill-base-content" name="setting"></unicon>
    </button>

    <LanguageButton />
  </div>
</template>
