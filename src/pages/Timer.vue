<template>
  <HeaderComp class="fixed z-1" @openSetting="openSetting" />
  <main class="py-16">
    <div class="lock fixed top bottom-0 left-1/2 -translate-x-1/2 mb-10 z-1">
      <button class="btn btn-wide btn-primary" @click="addTimer">
        Add timer
      </button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      <TimerComp v-for="id in sessionList" :key="id" :id="id" @open="openTimerAbout"></TimerComp>
    </div>
  </main>

  <TimerAboutComp ref="timerAbout" :timerId="curretnTimer" />
  <SettingComp ref="setting" />

</template>

<script setup>
import TimerComp from "@/components/TimerComp.vue";
import HeaderComp from "@/components/HeaderComp.vue";
import TimerAboutComp from "@/components/TimerAboutComp.vue";
import SettingComp from "@/components/SettingComp.vue";

import { ref } from "vue";

//  template ref
const timerAbout = ref(null);
const setting = ref(null);

const curretnTimer = ref(null);
const sessionList = ref([]);
var lastId = 1;

function openTimerAbout(id) {
  curretnTimer.value = id;
  timerAbout.value.open();
}

function openSetting() {
  setting.value.open();
}

function addTimer() {
  sessionList.value.push(lastId);
  lastId++;
}
</script>
