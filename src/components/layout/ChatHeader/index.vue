<template>
  <div class="wrapper">
    <button
      class="flex justify-center items-center active:scale-95 ease-linear duration-200"
    >
      <unicon
        class="fill-base-content"
        name="angle-left"
        width="32"
        height="32"
      />
    </button>

    <div class="user">
      <div class="w-10 rounded-full overflow-hidden">
        <img
          alt="Tailwind CSS chat bubble component"
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        />
      </div>

      <p class="username">Username</p>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  @apply w-full px-6 py-4 border-b border-l border-base-100 flex items-center gap-4;
}

.user {
  @apply flex items-center gap-3;
}

.username {
  @apply text-base font-semibold;
}
</style>
