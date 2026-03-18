<template>
    <div :class="themeObject.bg_2" class="p-10 flex lg:flex-row-reverse flex-col justify-around rounded-3xl items-center my-5">
        <h2 :class="themeObject.color_6" class="saira-stencil-one-subtitle text-4xl lg:text-4xl lg:w-[20%] lg:pb-0 pb-3 text-center"> API PARAMETER INFORMATION</h2>
        <div :class="themeObject.bg" class="lg:w-[65%] w-[90%] rounded-4xl p-[3%] flex flex-row flex-wrap items-center justify-around">
            <SingleParam v-for="param in APIParams" :param="param"></SingleParam>
        </div>
    </div>
</template>

<script setup lang="ts">
import { themeObject } from '@/store/variable_storage';
import { APIParams } from '@/store/variable_storage';
import SingleParam from './SingleParam.vue'

</script>

<style scoped>

</style>