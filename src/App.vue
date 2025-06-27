<template>
  <HeaderComp class="fixed z-1" />
  <RouterView />
  <!-- <ConnectionComp /> -->
</template>

<script setup>
import HeaderComp from "@/components/HeaderComp.vue";
import ConnectionComp from "@/components/ConnectionComp.vue";
import { RouterView } from "vue-router";
</script>
