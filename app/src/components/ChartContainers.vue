<template>
    <div class="flex flex-row flex-nowrap justify-around items-center w-full h-[65%] border-black border-4 rounded-3xl" :class="themeObject.outline_1">
        <BarChart></BarChart>
        <PieChart 
        v-if="(currentQuestion.option_one.amount + currentQuestion.option_two.amount) > 0">
        </PieChart>
        <NoData v-else></NoData>
    </div>
</template>

<script setup lang="ts">
import BarChart from './BarChart.vue';
import PieChart from './PieChart.vue';
import NoData from './NoData.vue';
import { currentQuestion, themeObject } from '@/store/variable_storage';
import type { questionData } from '@/store/variable_storage';
import { PropType } from 'vue';

defineProps({
    currentQuestion: {
        type: Object as PropType<questionData>,
        required: true
    }
})

</script>