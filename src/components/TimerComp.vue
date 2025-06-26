<template>
  <div class="card card-border border-2 inline-flex m-6">
    <div class="card-body">
      <h2 class="card-title">{{ $props.id }}</h2>
      <button class="btn btn-ghost h-auto p-4 text-6xl font-mono font-bold tracking-widest"  @click="$emit('open', $props.id)">
        {{ formattedTime }}
      </button>
      <div class="card-actions justify-around">
        <button class="btn btn-ghost" @click="stop">
          <stop-icon />
          Stop
        </button>

        <button class="btn btn-outline btn-primary" :class="{'hidden': isRunning}" @click="start">
          <play-icon />
          Start
        </button>

        <button class="btn btn-outline btn-primary" :class="{'hidden': !isRunning}" @click="pause">
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
import { io } from "socket.io-client";

import { ref, computed } from "vue";

const elapsed = ref(0);
const isRunning = ref(false);
const connected = ref(false);
const props = defineProps(["id"]);
const emit = defineEmits(["open"]);

const url = import.meta.env.VITE_SERVER_URL;
const socket = io(url);

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
  updateData(state);
}

function updateData(data) {
  elapsed.value = data.elapsed;
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

const cost = computed(() => {
  return Math.ceil(elapsed.value / 60000) * 10;
});

const formattedTime = computed(() => {
  const seconds = Math.floor(elapsed.value / 1000) % 60;
  const minutes = Math.floor(elapsed.value / 60000);

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
});
</script>
