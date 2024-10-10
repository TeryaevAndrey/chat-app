<script setup lang="ts">
import { ref } from "vue";
import EmojiPicker from "vue3-emoji-picker";
import { onClickOutside } from "@vueuse/core";

const text = ref("");
const isOpenEmojiPicker = ref(false);
const emojiPickerRef = ref(null);

const onChangeText = (e: Event) => {
  const { value } = <HTMLInputElement>e.target;

  text.value = value;
};

const onSelectEmoji = (emoji: { i: string }) => {
  text.value = text.value + emoji.i;
};

const toggleOpenEmojiPicker = () => {
  isOpenEmojiPicker.value = !isOpenEmojiPicker.value;
};

onClickOutside(emojiPickerRef, () => (isOpenEmojiPicker.value = false));
</script>

<template>
  <div class="message-text-field">
    <label class="input input-bordered flex items-center gap-2 w-full">
      <input
        type="text"
        class="grow"
        placeholder="Написать сообщение"
        :value="text"
        @input="onChangeText"
      />

      <div class="relative">
        <button
          class="cursor-pointer flex justify-center items-center ease-linear duration-200 active:scale-95"
          @click="toggleOpenEmojiPicker"
        >
          <unicon class="fill-yellow-600" name="smile" />
        </button>

        <EmojiPicker
          ref="emojiPickerRef"
          class="absolute right-0 bottom-0 ease-out duration-200 opacity-0 pointer-events-none"
          :class="{
            'opacity-100 bottom-[calc(100%+16px)] pointer-events-auto':
              isOpenEmojiPicker,
          }"
          :native="true"
          @select="onSelectEmoji"
        />
      </div>
    </label>

    <button class="btn btn-square">
      <unicon class="fill-base-content" name="message"></unicon>
    </button>
  </div>
</template>

<style scoped>
.message-text-field {
  @apply w-full px-6 mt-auto absolute py-4 bottom-0 bg-base-200 flex items-center gap-4;
}
</style>
