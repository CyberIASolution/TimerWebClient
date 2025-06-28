<template>
  <input type="checkbox" id="modal" class="modal-toggle" :checked="isOpen" />
  <dialog id="timerAbout" class="modal">
    <div class="modal-box">
      <div class="flex items-center gap-2">
        <InfoIcon class="size-4 text-info" />
        <h2 class="text-lg font-semibold text-info">
          Information {{ $props.timerId }}
        </h2>
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

import { useSettingStore } from "@/stores/Setting.js";
import { useTimerStore } from "@/stores/Timer.js";
import { useIdStore } from "@/stores/Id.js";

import { ref, computed } from "vue";

const props = defineProps(["timerId"]);
const isOpen = ref(false);

const timerStore = useTimerStore();
const setting = useSettingStore();

const close = function () {
  isOpen.value = false;
};

const open = function () {
  if (!props.timerId) return;
  isOpen.value = true;
};

defineExpose({ close, open });

const cost = computed(() => {
  return Math.ceil(timerStore.timerList.get(props.timerId).value / 60000) * setting.minuteCost;
});

const formattedTime = computed(() => {
  const seconds = Math.floor(timerStore.timerList.get(props.timerId).value / 1000) % 60;
  const minutes = Math.floor(timerStore.timerList.get(props.timerId).value / 60000);

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
});
</script>
