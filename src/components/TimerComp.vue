<template>
  <div class="card card-border border-2 inline-flex m-6">
    <div class="card-body">
      <h2 class="card-title">{{ $props.id }}</h2>
      <div v-show="!isUpdated">
      </div>
      <button class="btn btn-ghost h-auto p-4 text-6xl font-mono font-bold tracking-widest"
        @click="$emit('open', $props.id)">
        <span v-show="!isUpdated" class="loading loading-spinner text-seondary"></span>
        <span v-show="isUpdated"> {{ formattedTime }} </span>
      </button>
      <div class="card-actions justify-around">
        <button class="btn btn-ghost" @click="stop" :disabled="!isUpdated">
          <stop-icon />
          Stop
        </button>

        <button class="btn btn-outline btn-primary" :class="{ hidden: isRunning }" @click="start"
          :disabled="!isUpdated">
          <play-icon />
          Start
        </button>

        <button class="btn btn-outline btn-primary" :class="{ hidden: !isRunning }" @click="pause"
          :disabled="!isUpdated">
          <pause-icon />
          Pause
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import StopIcon from "@/components/icons/Stop.vue";
import PlayIcon from "@/components/icons/Play.vue";
import PauseIcon from "@/components/icons/Pause.vue";

import { useTimerStore } from "@/stores/Timer.js";
import { useIdStore } from "@/stores/Id.js";
import { io } from "socket.io-client";

import { ref, onMounted, computed } from "vue";

const elapsed = ref(0);
const isUpdated = ref(false);
const isRunning = ref(false);
const isConnected = ref(false);
const props = defineProps(["id"]);
const emit = defineEmits(["open"]);

const timerStore = useTimerStore();
const idStore = useIdStore();

const url = import.meta.env.VITE_SERVER_URL;
const socket = io(url);

socket.on("connect", onConnected);
socket.on("disconnect", onDisconnect);
socket.on("connect_failed", onConnectionError);

socket.on("status:success", updateState);
socket.on("start:success", updateState);
socket.on("paused:success", updateState);
socket.on("stopped:success", updateState);
socket.on("timer:elapsed", updateData);

function updateState(state) {
  isRunning.value = !state.stopped && !state.paused;
  updateData(state);
  isUpdated.value = true;
}

function updateData(data) {
  elapsed.value = data.elapsed;
}

function start() {
  socket.emit("start");
}
function pause() {
  socket.emit("pause");
  socket.emit("status");
}
function stop() {
  socket.emit("stop");
  socket.emit("status");
}

function onConnected() {
  isConnected.value = true;
  isUpdated.value = false;
}

function onDisconnect() {
  isConnected.value = false;
  isUpdated.value = false;
}

function onConnectionError() {
  isConnected.value = false;
  isUpdated.value = false;
}

onMounted(() => {
  const registerData = JSON.stringify({
    timerId: props.id,
    userId: idStore.userId,
  });
  timerStore.timerList.set(props.id, elapsed);
  socket.emit("register", registerData);
  socket.emit("status");
});

const formattedTime = computed(() => {
  const seconds = Math.floor(elapsed.value / 1000) % 60;
  const minutes = Math.floor(elapsed.value / 60000);

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
});
</script>
