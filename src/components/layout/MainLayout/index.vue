<template>
  <div class="root">
    <div class="main-block"><slot></slot></div>
  </div>
</template>

<style scoped>
.root {
  @apply bg-base-100 flex justify-center items-center min-h-screen;
}

.main-block {
  @apply max-w-4xl xl:max-w-5xl w-full bg-base-200 rounded-3xl h-[70vh] overflow-hidden;
}
</style>
