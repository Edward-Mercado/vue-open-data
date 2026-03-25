<template>
    <router-link to="/"
        :class="[themeObject.bg_2, themeObject.outline_1, themeObject.button_1, themeObject.outline_2]"
        class="flex items-center justify-center rounded-full min-w-12 min-h-12 w-14 h-14 mx-2 hover:rotate-5 active:rotate-30 duration-200 p-[0.25%]"
        value="back-home" aria-label="back-home">
        <svg :class="themeObject.color_6" class="w-full h-full" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 10.5 12 3 21 10.5" />
            <rect x="5" y="10.5" width="14" height="10" rx="0.5" />
            <rect x="9.5" y="14" width="5" height="6.5" />
        </svg>
    </router-link>
</template>

<script setup>
import { themeObject } from '@/store/variable_storage';
</script>

<style scoped>

</style>