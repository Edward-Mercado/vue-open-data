<template>
    <div class="fab fixed bottom-[1%] left-3 flex flex-row items-center">
        <div tabindex="0" role="button" :class="themeObject.button_1" class="btn btn-xl btn-circle btn-primary flex items-center justify-center hover:-rotate-5 active:-rotate-30 duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                :class="themeObject.color_6" class="w-full h-full fill-current">
                <path
                    :d="themeSVG" />
            </svg>
        </div>

        <button :class="themeObject.button_1" class="btn btn-xl btn-circle btn-primary flex items-center justify-center hover:-rotate-10" value="light-mode" aria-label="light-mode"
            @click="$emit('changeTheme', 'light')">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            :class="themeObject.color_6"
                class="fill-current w-full h-full">
                <path
                    d="M12 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm0 16a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1Zm10-6a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1ZM4 12a1 1 0 0 1-1 1H2a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1Zm15.07-7.07a1 1 0 0 1 0 1.41l-.71.71a1 1 0 1 1-1.41-1.41l.71-.71a1 1 0 0 1 1.41 0ZM7.05 16.95a1 1 0 0 1 0 1.41l-.71.71a1 1 0 1 1-1.41-1.41l.71-.71a1 1 0 0 1 1.41 0Zm12.02 2.12a1 1 0 0 1-1.41 0l-.71-.71a1 1 0 1 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41ZM7.05 7.05a1 1 0 0 1-1.41 0l-.71-.71A1 1 0 0 1 6.34 4.93l.71.71a1 1 0 0 1 0 1.41ZM12 7a5 5 0 1 1 0 10A5 5 0 0 1 12 7Z" />
            </svg>
        </button>

        <button :class="themeObject.button_1" class="btn btn-xl btn-circle btn-primary flex items-center justify-center hover:-rotate-10" value="dark-mode" aria-label="dark-mode"
        @click="$emit('changeTheme', 'dark')">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            :class="themeObject.color_6"
                class="w-full h-full fill-current">
                <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" />
            </svg>
        </button>

        <button :class="themeObject.button_1" class="btn btn-xl btn-circle btn-primary flex items-center justify-center hover:-rotate-10" value="sunset-mode" aria-label="sunset-mode"
            @click="$emit('changeTheme', 'sunset')">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            :class="themeObject.color_6"
                class="w-[300%] h-full fill-current">
                <path
                    d="M12 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm7.07 2.93a1 1 0 0 1 0 1.41l-.71.71a1 1 0 1 1-1.41-1.41l.71-.71a1 1 0 0 1 1.41 0ZM4.93 4.93a1 1 0 0 1 1.41 0l.71.71A1 1 0 1 1 5.64 7.05l-.71-.71a1 1 0 0 1 0-1.41ZM2 13a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Zm19 0a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1ZM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm-9 5h18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2Zm3.5 4h11a1 1 0 0 1 0 2h-11a1 1 0 0 1 0-2Z" />
            </svg>
        </button>
    </div>
</template>

<script setup lang="ts">
import { theme } from '@/store/variable_storage'
import { themeObject } from '@/store/variable_storage';
import { computed } from 'vue'

const emits = defineEmits(['changeTheme'])

const themeSVG = computed<string | undefined>(() => {
    if(theme.value === 'light') {
        return "M12 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm0 16a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1Zm10-6a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1ZM4 12a1 1 0 0 1-1 1H2a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1Zm15.07-7.07a1 1 0 0 1 0 1.41l-.71.71a1 1 0 1 1-1.41-1.41l.71-.71a1 1 0 0 1 1.41 0ZM7.05 16.95a1 1 0 0 1 0 1.41l-.71.71a1 1 0 1 1-1.41-1.41l.71-.71a1 1 0 0 1 1.41 0Zm12.02 2.12a1 1 0 0 1-1.41 0l-.71-.71a1 1 0 1 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41ZM7.05 7.05a1 1 0 0 1-1.41 0l-.71-.71A1 1 0 0 1 6.34 4.93l.71.71a1 1 0 0 1 0 1.41ZM12 7a5 5 0 1 1 0 10A5 5 0 0 1 12 7Z"
    } else if (theme.value === 'dark') {
        return "M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z"
    } else if (theme.value === 'sunset') {
        return 'M12 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm7.07 2.93a1 1 0 0 1 0 1.41l-.71.71a1 1 0 1 1-1.41-1.41l.71-.71a1 1 0 0 1 1.41 0ZM4.93 4.93a1 1 0 0 1 1.41 0l.71.71A1 1 0 1 1 5.64 7.05l-.71-.71a1 1 0 0 1 0-1.41ZM2 13a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Zm19 0a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1ZM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm-9 5h18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2Zm3.5 4h11a1 1 0 0 1 0 2h-11a1 1 0 0 1 0-2Z'
    } else { // error handling
        theme.value = 'light'
        return "M12 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm0 16a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1Zm10-6a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1ZM4 12a1 1 0 0 1-1 1H2a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1Zm15.07-7.07a1 1 0 0 1 0 1.41l-.71.71a1 1 0 1 1-1.41-1.41l.71-.71a1 1 0 0 1 1.41 0ZM7.05 16.95a1 1 0 0 1 0 1.41l-.71.71a1 1 0 1 1-1.41-1.41l.71-.71a1 1 0 0 1 1.41 0Zm12.02 2.12a1 1 0 0 1-1.41 0l-.71-.71a1 1 0 1 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41ZM7.05 7.05a1 1 0 0 1-1.41 0l-.71-.71A1 1 0 0 1 6.34 4.93l.71.71a1 1 0 0 1 0 1.41ZM12 7a5 5 0 1 1 0 10A5 5 0 0 1 12 7Z"
    }
})

</script>

<style scoped></style>