<template>
    <input type="checkbox" id="modal" class="modal-toggle" :checked="isOpen" />
    <dialog id="timerAbout" class="modal">
        <div class="modal-box">
            <div class="flex items-center gap-2">
                <CogIcon class="size-4 text-info" />
                <h2 class="text-lg font-semibold text-info"> Setting </h2>
            </div>

            <div class="flex justify-between text-sm mt-6">
                <span class="text-slate-400 flex items-center gap-2">
                    <CashIcon class="size-4" /> <span>Cost:</span>
                </span>
                <label class="input">
                    <input type="text" placeholder="0" v-model="minuteCost" />
                    <span class="label"> Ar/min</span>
                </label>
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
import CogIcon from "./icons/Cog.vue";
import CashIcon from "@/components/icons/Cash.vue";
import { useSettingStore } from "@/stores/Setting";
import { onMounted, ref, watch } from "vue";

const isOpen = ref(false);
const minuteCost = ref(null);
const setting = useSettingStore();

const open = function () {
    isOpen.value = true;
}

const close = function () {
    isOpen.value = false;
}

defineExpose({ open, close })
watch(minuteCost, function (value) {
    if (value) setting.setMinuteCost(value);
})
onMounted(function () {
    minuteCost.value = setting.getMinuteCost();
})
</script>