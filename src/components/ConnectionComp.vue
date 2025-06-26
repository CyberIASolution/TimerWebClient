<template>
    <input type="checkbox" id="modal" class="modal-toggle" :checked="!isConnected" />
    <dialog id="modal" class="modal">
        <div class="modal-box bg-neutral">
            <span class="loading loading-spinner text-primary"></span>
            <span class="ms-4">Connecting...</span>
        </div>
    </dialog>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isConnected = ref(false);
const url = import.meta.env.VITE_SERVER_URL;
var timeoutId = null;

function checkConnection() {
    fetch(url)
        .then((data) => {
            isConnected.value = true;
            timeoutId = setTimeout(checkConnection, 1000);
        })
        .catch(() => {
            isConnected.value = false;
            timeoutId = setTimeout(checkConnection, 1000);
        })
}

onMounted(() => {
    checkConnection();
})

onUnmounted(() => {
    clearTimeout(timeoutId);
})
</script>