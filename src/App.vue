<template>
  <main class="relative">
    <status class="m-4" />

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-40">
      <timer v-for="session in sessionList" :key="session" :id="session" />
    </div>

    <div class="fixed bottom-0 w-full flex p-10 justify-center">
      <button-component
        class="bg-zinc-800 text-zinc-100 hover:bg-zinc-700 rounded-full px-4 py-2 text-sm shadow-lg group"
        @click="addTimer()"
      >
        <template #icon> <plus-icon /> </template>
      </button-component>
    </div>
  </main>
</template>

<script setup>
import Timer from "@/components/Timer.vue";
import Status from "@/components/ConnectionStatus.vue";
import ButtonComponent from "./components/ButtonComponent.vue";
import PlusIcon from "@/components/icons/Plus.vue";

import { ref } from "vue";

const sessionList = ref([]);
var lastId = 1;

function addTimer() {
  sessionList.value.push(lastId);
  lastId++;
}
</script>
