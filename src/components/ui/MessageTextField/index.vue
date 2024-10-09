<template>
  <div class="message-text-field">
    <label class="input input-bordered flex items-center gap-2 w-full">
      <input type="text" class="grow" placeholder="Search" />
    </label>

    <button class="btn btn-square">
      <unicon class="fill-base-content" name="message"></unicon>
    </button>
  </div>
</template>

<style scoped>
.message-text-field {
  @apply w-full px-6 mt-auto absolute py-4 bottom-0 bg-base-200 flex items-center gap-4 ;
}
</style>
