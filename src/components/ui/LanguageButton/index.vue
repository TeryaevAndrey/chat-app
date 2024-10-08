<script setup lang="ts">
import { Languages } from "@/shared/types";
import { ref } from "vue";

const documentLang = ref(document.documentElement.getAttribute("lang"));
const lang = ref<Languages>((documentLang.value as Languages) || "ru");

const toggleLang = () => {
  lang.value = lang.value === "ru" ? "en" : "ru";
};
</script>

<template>
  <button class="btn btn-square text-base-content" @click="toggleLang">
    <span v-if="lang === 'ru'">RU</span>
    <span v-if="lang === 'en'">EN</span>
  </button>
</template>
