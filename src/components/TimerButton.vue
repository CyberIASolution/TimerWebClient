<template>
  <button
    class="flex items-center gap-2 px-4 py-2 text-gray-500 rounded-full transition disabled:opacity-50"
  >
    <slot name="icon"></slot>
    <slot name="label"></slot>
  </button>
</template>
