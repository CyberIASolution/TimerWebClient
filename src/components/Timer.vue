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
        class="text-5xl font-mono font-bold text-slate-900 tracking-widest"
      >
        {{ formattedTime }}
      </div>

      <div class="mt-6 flex justify-center space-x-4">
        <button-component
          class="text-zinc-700 bg-zinc-100 hover:bg-zinc-200"
          @click="stop()"
        >
          <template #icon> <stop-icon /> </template>
          <template #label> Stop </template>
        </button-component>

        <button-component
          v-if="!isRunning"
          class="text-white bg-violet-500 hover:bg-violet-600"
          @click="start()"
        >
          <template #icon> <play-icon /> </template>
          <template #label> Start </template>
        </button-component>

        <button-component
          v-if="isRunning"
          class="text-white bg-violet-500 hover:bg-violet-600"
          @click="pause()"
        >
          <template #icon> <pause-icon /> </template>
          <template #label> Pause </template>
        </button-component>
      </div>
    </div>
  </div>
</template>

<script setup>
import ButtonComponent from "@/components/ButtonComponent.vue";
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
  isRunning.value = !state.stopped && !state.paused;
  updateData();
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
