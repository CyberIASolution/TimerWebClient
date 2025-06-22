<template>
  <div class="flex items-center justify-center">
    <div
      class="bg-white rounded-2xl shadow-md px-8 py-6 w-80 text-center relative"
    >
      <div
        class="absolute top-0 left-0 border-1 border-gray-200 rounded-tl-2xl inline-block text-lg font-semibold p-2"
      >
        {{ $props.id }}
      </div>

      <div
        class="text-5xl font-mono font-semibold text-gray-800 tracking-widest"
      >
        {{ formattedTime }}
      </div>

      <div class="mt-6 flex justify-center space-x-4">
        <TimerButton
          class="text-gray-500 bg-gray-200 hover:bg-gray-300"
          @click="stop()"
        >
          <template #icon> <stop-icon /> </template>
          <template #label> Stop </template>
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
import StopIcon from "@/components/icons/Stop.vue";
import PlayIcon from "@/components/icons/Play.vue";
import PauseIcon from "@/components/icons/Pause.vue";

import { ref, computed } from "vue";

const elapsed = ref(0);
const isRunning = ref(false);
const connected = ref(false);
const props = defineProps(["id"]);

const socket = io("http://localhost:8080");

socket.on("connect", onConnected);
socket.on("disconnect", onDisconnect);
socket.on("connect_failed", onConnectionError);

socket.emit("register", { id: props.id });
socket.emit("state");

socket.on("state", updateState);
socket.on("started", updateState);
socket.on("paused", updateState);
socket.on("stopped", updateState);
socket.on("elapsed", updateData);

function updateState(state) {
  console.log("Updating state: ", state);
  isRunning.value = !state.stopped && !state.paused;
}

function updateData(data) {
  if (data.elapsed) elapsed.value = data.elapsed;
}

function start() {
  socket.emit("start");
}
function pause() {
  socket.emit("pause");
}
function stop() {
  socket.emit("stop");
}

function onConnected() {
  connected.value = true;
}

function onDisconnect() {
  connected.value = false;
}

function onConnectionError() {
  connected.value = false;
}

const formattedTime = computed(() => {
  const seconds = Math.floor(elapsed.value / 1000) % 60;
  const minutes = Math.floor(elapsed.value / 60000);

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
});
</script>
