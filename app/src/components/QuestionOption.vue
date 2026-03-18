<template>
    <div :class="[themeObject.bg_2, themeObject.outline_2, getClasses(inputQuestion.number), themeObject.choice]" class="absolute w-[50.5%] h-[65%] rounded-4xl px-[5%] py-[1%] pb-[3%] transition-all ease-in-out hover:-translate-y-2 active:translate-y-2 flex flex-col justify-between items-center"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @click="$emit('chooseOption', inputQuestion.number)"
    >

    <div class="flex flex-col flex-nowrap justify-between items-center p-[5%] h-full">
        <h2 :class="themeObject.color_7" class="saira-stencil-one-title text-4xl text-center">
            {{  inputQuestion.param.name }}
        </h2>
        <h2 :class="themeObject.color_6" class="saira-stencil-one-title text-8xl">
            =
        </h2>
        <h2 :class="themeObject.color_7"  class="saira-stencil-one-title text-4xl text-center">
            {{  inputQuestion.tested_value }}
        </h2>
        <h2 :class="themeObject.color_6"  class="saira-stencil-one-title text-md text-center italic" v-if="inputQuestion.param.round"> 
            * Latitude/Longitude values are rounded to the nearest tenth.
        </h2>
    </div>

    <div v-if="isHovered" class="absolute bottom-[-10%] w-[60%] h-[18%] flex justify-center items-center rounded-2xl" :class="[themeObject.bg, themeObject.color_1, themeObject.outline_2]"> 
        <h2 :class="themeObject.color_1" class="text-center lexend-deca-bolded">
            { CLICK THE BOX TO SELECT }
        </h2> 
    </div>
    </div>
</template>

<script setup lang="ts">
import { themeObject } from '@/store/variable_storage';
import type { questionChoice } from '@/store/variable_storage';
import { PropType, ref } from 'vue'

const isHovered = ref<boolean>(false)

const props = defineProps({
    inputQuestion: {
        type: Object as PropType<questionChoice>,
        required: true
    }
})

const emit = defineEmits(['chooseOption'])

function getClasses(number:number) {
    if(number === 1) {
        return ['top-1', 'left-1', 'active:-rotate-5', 'hover:-rotate-1']
    } else {
        return ['bottom-1', 'right-1', 'active:rotate-5', 'hover:rotate-1']
    }
}

</script>

<style scoped>

</style>