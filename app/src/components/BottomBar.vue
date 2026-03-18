<template>
    <div class="flex flex-row-reverse fixed right-3 w-[13%] bottom-[1%]">
        <router-link to="/"
            :class="[themeObject.bg_2, themeObject.outline_1, themeObject.button_1, themeObject.outline_2]"
            class="flex items-center justify-center rounded-full min-w-12 min-h-12 mx-2 p-[2%] hover:rotate-5 active:rotate-30 duration-200"
            value="back-home" aria-label="back-home">
            <svg :class="themeObject.color_6" class="w-full h-full" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 10.5 12 3 21 10.5" />
                <rect x="5" y="10.5" width="14" height="10" rx="0.5" />
                <rect x="9.5" y="14" width="5" height="6.5" />
            </svg>
        </router-link>

        <button @click="$emit('rerollQuestion')"
            :class="[themeObject.bg_2, themeObject.outline_1, themeObject.button_1, themeObject.outline_2]"
            class="flex items-center justify-center rounded-full min-w-12 min-h-12 mx-2 p-[2%] hover:-rotate-5 active:-rotate-30 duration-200"
            value="reroll-question" aria-label="back-home">
            <svg :class="themeObject.color_6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                height="24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"
                stroke-linejoin="round">
                <path d="M9 14L4 9l5-5" />
                <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
            </svg>
        </button>

        <button @click="resetStreak()"
            :class="[themeObject.bg_2, themeObject.outline_1, themeObject.button_1, themeObject.outline_2]"
            class="flex items-center justify-center rounded-full min-w-12 min-h-12 mx-2 p-[2%] hover:rotate-5 active:rotate-30 duration-200"
            value="reset-streak" aria-label="reset streak">
            <svg :class="themeObject.color_6" class="w-full h-full" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
        </button>
            <div :class="[themeObject.bg_2, themeObject.outline_1, themeObject.outline_2]"
                class="h-12 z-80 flex items-center justify-center rounded-2xl min-w-45">
                <h2 :class="themeObject.color_6" class="saira-stencil-one-subtitle text-xl text-center"> STREAK: {{ streak }}</h2>
            </div>
    </div>
</template>

<script setup lang="ts">
import { themeObject } from '@/store/variable_storage';
import { streak } from '@/store/variable_storage';

function resetStreak() {
    streak.value = 0
    localStorage.setItem("streak", "0")
}

const emit = defineEmits(['rerollQuestion'])

</script>

<style scoped>

</style>