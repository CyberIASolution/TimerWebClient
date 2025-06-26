<template>
    <input type="checkbox" id="modal" class="modal-toggle" :checked="isOpen" />
    <dialog id="timerAbout" class="modal">
        <div class="modal-box">
            <div class="flex items-center gap-2">
                <InfoIcon class="size-4 text-info" />
                <h2 class="text-lg font-semibold text-info">Information  {{ $props.timerId }} </h2>
            </div>

            <div class="grid grid-cols-2 gap-y-2 text-sm mt-6">
                <span class="text-slate-400 flex items-center gap-2">
                    <ClockIcon class="size-4" /> <span>Duration:</span>
                </span>
                <span>{{ formattedTime }}</span>
                <span class="text-slate-400 flex items-center gap-2">
                    <CashIcon class="size-4" /> <span>Cost:</span>
                </span>
                <span>{{ cost }} Ar</span>
            </div>
            <div class="modal-action">
                <form method="dialog">
                    <button class="btn" @click="close">Close</button>
                </form>
            </div>
        </div>
    </dialog>
</template>

<script setup>
import InfoIcon from "@/components/icons/Info.vue";
import ClockIcon from "@/components/icons/Clock.vue";
import CashIcon from "@/components/icons/Cash.vue";

import { io } from "socket.io-client";
import { ref, computed } from "vue";

const elapsed = ref(0);

const props = defineProps(["timerId"]);
const isOpen = ref(false);

const url = import.meta.env.VITE_SERVER_URL;
var socket = null;

function initSocket() {
    socket.on("state", updateData);
    socket.on("started", updateData);
    socket.on("paused", updateData);
    socket.on("stopped", updateData);
    socket.on("elapsed", updateData);
}

function updateData(data) {
    elapsed.value = data.elapsed;
}

const cost = computed(() => {
    return Math.ceil(elapsed.value / 60000) * 10;
});

const close = function () {
    isOpen.value = false;
    socket.close();
}
const open = function () {
    if (!props.timerId) return;
    isOpen.value = true;

    socket = io(url);

    socket.emit("register", { id: props.timerId });
    socket.emit("state");
    initSocket();
}

defineExpose({ close, open })

const formattedTime = computed(() => {
    const seconds = Math.floor(elapsed.value / 1000) % 60;
    const minutes = Math.floor(elapsed.value / 60000);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
});
</script>