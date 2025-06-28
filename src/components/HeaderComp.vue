<template>
    <div class="navbar bg-base-100 shadow-md">

        <div class="flex-1">
            <a class="btn btn-ghost text-xl">CyberTimer</a>
        </div>

        <div class="dropdown dropdown-end">
            <button class="btn btn-ghost rounded-full p-1" tabindex="0" role="button">
                <div class="avatar avatar-placeholder">
                    <div class="bg-neutral text-neutral-content w-8 rounded-full">
                        <span class="text-xs">UI</span>
                    </div>
                </div>
            </button>
            <ul tabindex="0" class="menu menu-sm dropdown-content bg-neutral rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li @click="$emit('openSetting')"><a>Settings</a></li>
            </ul>
        </div>

    </div>
</template>

<script setup>
defineEmits(["openSetting"]);
</script>