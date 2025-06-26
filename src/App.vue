<template>
  <HeaderComp class="fixed z-1" />
  <main class="py-16">
    <div class="lock fixed top bottom-0 left-1/2 -translate-x-1/2 mb-10 z-1">
      <button class="btn btn-wide btn-primary" @click="addTimer">
        Add timer
      </button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      <TimerComp v-for="id in sessionList" :key="id" :id="id"></TimerComp>
    </div>
  </main>
</template>

<script setup>
import HeaderComp from "@/components/HeaderComp.vue";
import TimerComp from "@/components/TimerComp.vue";
import PlusIcon from "@/components/icons/Plus.vue";

import { ref } from "vue";

const sessionList = ref([]);
var lastId = 1;

function addTimer() {
  sessionList.value.push(lastId);
  lastId++;
}
</script>
