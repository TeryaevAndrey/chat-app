<script setup lang="ts">
import { SettingsModal } from "@/components/widgets/modals";
</script>

<template>
  <div>
    <slot></slot>

    <SettingsModal />
  </div>
</template>
