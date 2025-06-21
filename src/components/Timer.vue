<template>
  <div class="flex items-center justify-center">
    <div
      class="bg-white rounded-2xl shadow-md px-8 py-6 w-80 text-center relative"
    >
      <!-- Display -->
      <div
        class="text-5xl font-mono font-semibold text-gray-800 tracking-widest"
      >
        {{ formattedTime }}
      </div>

      <!-- Buttons -->
      <div class="mt-6 flex justify-center space-x-4">
        <TimerButton
          class="text-gray-500 bg-gray-200 hover:bg-gray-300"
          @click="reset()"
        >
          <template #icon> <reset-icon /> </template>
          <template #label> Reset </template>
        </TimerButton>

        <TimerButton
          v-if="!isRunning"
          class="text-white bg-violet-600 hover:bg-violet-700"
          @click="start()"
        >
          <template #icon> <play-icon /> </template>
          <template #label> Start </template>
        </TimerButton>

        <TimerButton
          v-if="isRunning"
          class="text-white bg-violet-600 hover:bg-violet-700"
          @click="pause()"
        >
          <template #icon> <pause-icon /> </template>
          <template #label> Pause </template>
        </TimerButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import TimerButton from "@/components/TimerButton.vue";
import ResetIcon from "@/components/icons/Reset.vue";
import PlayIcon from "@/components/icons/Play.vue";
import PauseIcon from "@/components/icons/Pause.vue";

import { ref, computed } from "vue";

const elapsed = ref(0);
const isRunning = ref(false);

const ws = new WebSocket("ws://localhost:8080");

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === "tick") {
    elapsed.value = data.elapsed;
  } else if (data.type === "message") {
    if (data.message === "stopped") {
    } else if (data.message === "started") {
      isRunning.value = true;
    } else if (data.message === "paused") {
      isRunning.value = false;
    }
  }
};

function start() {
  ws.send(JSON.stringify({ command: "start" }));
}

function stop() {
  ws.send(JSON.stringify({ command: "stop" }));
}

function pause() {
  ws.send(JSON.stringify({ command: "pause" }));
}

function reset() {
  ws.send(JSON.stringify({ command: "reset" }));
}

const formattedTime = computed(() => {
  const seconds = Math.floor(elapsed.value / 1000) % 60;
  const minutes = Math.floor(elapsed.value / 60000);

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
});
</script>
