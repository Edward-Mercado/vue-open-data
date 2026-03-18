<template>
<div :class="[themeObject.bg, themeObject.outline_1]" class="fixed z-10 w-[90%] h-[90%] top-[5%] left-[5%] rounded-4xl flex items-center justify-between flex-col flex-nowrap pt-[5%] px-[5%] pb-[2%]">
    <div>
        <h2 :class="themeObject.color_1" class="saira-stencil-one-title text-6xl my-2 text-center"> YOU ANSWERED  </h2>

        <h4 :class="themeObject.color_2" class="saira-stencil-one-title text-3xl my-2 text-center"> You were {{ correctMessage }}. Your streak is now {{ streak }}. </h4>
    </div>
    <ChartContainers :currentQuestion="currentQuestion"></ChartContainers>
    <button  class="lexend-deca h-[10%] w-full flex items-center justify-center m-3 text-xl rounded-3xl text-center hover:-translate-y-0.5 active:translate-y-0.5 duration-150" :class="themeObject.button_2" @click="closeWindow()"> Close </button>
</div>
</template>

<script setup lang="ts">
import ChartContainers from './ChartContainers.vue';
import { currentQuestion, themeObject } from '@/store/variable_storage';
import { showingResults } from '@/store/variable_storage';
import { streak } from '@/store/variable_storage';
import { computed } from 'vue'
import { getHotspotData } from '@/store/functions';
import { useRoute } from 'vue-router';

const route = useRoute()

const props = defineProps({
    correct: {
        type: Boolean,
        required: true
    }
})

const correctMessage = computed(() => {
    return props.correct === true ? 'correct' : 'incorrect'
})

function closeWindow() {
    getHotspotData(route.params.borough.toString())
    showingResults.value = false
}

</script>

<style scoped>

</style>