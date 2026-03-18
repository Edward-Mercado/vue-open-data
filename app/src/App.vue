<template>
  <div :class="themeObject.bg" class="w-full min-h-screen lg:h-[180%] p-10 transition-colors duration-150 ease-in">
    <theme-buttons @changeTheme="(themeArg) => theme = themeArg"></theme-buttons>
    <h1 :class="themeObject.color_1" class='saira-stencil-one-title unica-one-regular text-7xl text-center'>GOTTA SPOT A HOTSPOT (uh)</h1>
    <menu-select></menu-select>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { getTheme } from '@/store/functions'
import { watch } from 'vue'
import { theme, themeObject } from '@/store/variable_storage'
import ThemeButtons from './components/ThemeButtons.vue'
import MenuSelect from '@/components/MenuSelect.vue'

getTheme(theme.value)

watch(() => theme.value, () => {
    getTheme(theme.value)
    localStorage.setItem("theme", theme.value)
})

</script>

<style scoped></style>