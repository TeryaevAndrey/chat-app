<script setup lang="ts">
import { ChatHeader } from "@/components/layout";
import { Messages } from "..";
import { MessageTextField } from "@/components/ui";
</script>

<template>
  <div class="chat-wrapper">
    <ChatHeader />

    <Messages />

    <MessageTextField />
  </div>
</template>

<style scoped>
.chat-wrapper {
  @apply w-full h-full relative;
}
</style>
