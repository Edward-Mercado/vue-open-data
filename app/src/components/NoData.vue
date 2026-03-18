<template>
    <div :class="[themeObject.bg_2, themeObject.outline_2]" class="w-[47%] h-[60%] rounded-full flex items-center justify-center p-[3%]">
        <h2 class="lexend-deca lg:text-3xl text-lg text-center" :class="themeObject.color_6"> Since there's no valid data, there's nothing to graph! Whoops. </h2>
    </div>
</template>

<script setup lang="ts">
import { themeObject } from '@/store/variable_storage';

</script>

<style scoped>

</style>