<script setup lang="ts">
const openSettingsModal = () => {
  const modal = document.querySelector("#settings-modal");

  if (modal) {
    (modal as any).showModal();
  }
};
</script>

<template>
  <button class="btn btn-square" @click="openSettingsModal">
    <unicon class="fill-base-content" name="setting"></unicon>
  </button>
</template>
