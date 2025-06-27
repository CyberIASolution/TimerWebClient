<template>
  <main class="py-16 h-screen flex justify-center items-center">
    <div class="card card-border bg-neutral w-96">
      <div class="card-body">
        <h2 class="card-title">Login</h2>
        <div class="my-6 grid gap-2">
          <label class="input">
            <UserIcon class="size-6 opacity-50" />
            <input
              type="text"
              class="grow"
              placeholder="username"
              v-model="username"
            />
          </label>
          <label class="input">
            <LockIcon class="size-6 opacity-50" />
            <input
              type="password"
              class="grow"
              placeholder="password"
              v-model="password"
            />
          </label>
        </div>
        <div class="card-actions justify-end">
          <button class="btn btn-ghost" @click="reset">Reset</button>
          <button class="btn btn-outline btn-primary" @click="submit">
            Login
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import UserIcon from "@/components/icons/User.vue";
import LockIcon from "@/components/icons/Lock.vue";
import { useIdStore } from "@/stores/Id.js";
import { useRouter } from "vue-router";
import { ref } from "vue";

const id = useIdStore();
const router = useRouter();
const username = ref("");
const password = ref("");
const url = import.meta.env.VITE_SERVER_URL;

function reset() {
  username.value = "";
  password.value = "";
}

function submit() {
  const headers = { "content-type": "application/json" };
  const body = JSON.stringify({
    username: username.value,
    password: password.value,
  });

  fetch(url + "/auth", {
    method: "POST",
    headers,
    body,
  })
    .then(async (data) => {
      if (!data.ok) return;
      data = await data.json();
      id.userId = data.id;
      router.push("/timer");
    })
    .catch((err) => {
      console.log(err);
    });
}
</script>
