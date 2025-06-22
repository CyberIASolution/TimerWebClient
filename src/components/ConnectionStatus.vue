<template>
  <div
    class="flex items-center gap-3 px-4 py-2 rounded-full"
    :class="
      isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    "
  >
    <span
      class="w-2.5 h-2.5 rounded-full"
      :class="isConnected ? 'bg-green-500' : 'bg-red-500'"
    ></span>
    <span class="text-sm font-medium">
      {{ isConnected ? "Connected to server" : "Disconnected from server" }}
    </span>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isConnected = ref(false);
var intervalId = null;

onMounted(() => {
  intervalId = setInterval(() => {
    fetch("http://localhost:8080/status")
      .then((data) => {
        isConnected.value = data.status == 200;
      })
      .catch((err) => {
        console.log("Error while fetching status: ", err);
      });
  }, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>
