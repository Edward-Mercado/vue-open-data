<template>
    <router-link to="/map-view" :class="[themeObject.bg_2, themeObject.outline_1, themeObject.button_1, themeObject.outline_2]"
        class="flex items-center justify-center rounded-full min-w-12 min-h-12 w-14 h-14 mx-2 hover:rotate-5 active:rotate-30 duration-200 px-[2%] pb-[1.5%] pt-[2.5%]"
        value="back-home" aria-label="back-home">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"
        :class="themeObject.color_6" class="w-full h-full m-[%]" 
        >
            <polygon points="1,4 1,20 8,17 16,20 23,17 23,1 16,4 8,1" fill="none" stroke="currentColor"
                stroke-width="2.5" stroke-linejoin="round" />
            <line x1="8" y1="1" x2="8" y2="17" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
            <line x1="16" y1="4" x2="16" y2="20" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
        </svg>
    </router-link>
</template>

<script setup>
import { themeObject } from '@/store/variable_storage';
</script>

<style scoped></style>