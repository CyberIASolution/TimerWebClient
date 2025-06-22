<template>
  <main class="p-5">
    <status class="mb-4" />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <timer id="1" />
      <timer id="2" />
      <timer id="3" />
      <timer id="4" />
      <timer id="5" />
    </div>
  </main>
</template>

<script setup>
import Timer from "@/components/Timer.vue";
import Status from "@/components/ConnectionStatus.vue";
</script>
