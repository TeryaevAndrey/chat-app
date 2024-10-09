<script setup lang="ts">
import { Themes } from "@/shared/types";
import { ref } from "vue";

const documentTheme = ref(document.documentElement.getAttribute("data-theme"));
const theme = ref<Themes>((documentTheme.value as Themes) || "emerald");

const toggleTheme = () => {
  theme.value = theme.value === "emerald" ? "dark" : "emerald";
  document.documentElement.setAttribute("data-theme", theme.value);
};
</script>

<template>
  <button class="btn btn-square" @click="toggleTheme">
    <unicon v-if="theme === 'emerald'" name="sun" fill="#facc15"></unicon>
    <unicon v-if="theme === 'dark'" name="moon" fill="#c2410c"></unicon>
  </button>
</template>
