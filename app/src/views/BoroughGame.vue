<template>
    <div class="w-full h-screen">
        <div :class="themeObject.color_1" class="saira-stencil-one-subtitle text-5xl text-center my-5">
            IN <span :class="themeObject.color_3"> {{ boroughName }} </span>,
        </div>

        <Transition name="result-popup">
        <QuestionResults :correct="correct" v-if="showingResults"> </QuestionResults>
        </Transition>
            <div class="w-full h-[60%] flex flex-col justify-around relative">
            <h2 :class="themeObject.color_1"
                class="absolute top-0 right-1 saira-stencil-one-subtitle text-5xl w-[40%] text-center"> ARE THERE MORE
                HOTSPOTS OF... </h2>

            <Transition name="question-one">
            <QuestionOption :inputQuestion="currentQuestion.option_one" v-if="!showingResults"
                @chooseOption="(number) => chooseOption(number)"></QuestionOption>
            </Transition>

            <Transition name="question-two">
                <QuestionOption :inputQuestion="currentQuestion.option_two" v-if="!showingResults"
                @chooseOption="(number) => chooseOption(number)"></QuestionOption>
            </Transition>
            <button :class="[themeObject.button_1, themeObject.outline_2, themeObject.choice[0]]"
                class="absolute top-[45%] left-[47%] w-[6%] h-[10%] flex items-center justify-center rounded-full hover:scale-130 hover:-rotate-180 transition-all duration-1000" @click="streak = randomInt(-100, 100)" aria-label="random streak lol">
                <h2 :class="themeObject.color_6" class="text-center w-full text-3xl lexend-deca font-black">
                    OR
                </h2>
            </button>
            <h2 :class="[themeObject.color_1, 'absolute', 'bottom-0', 'left-1', 'saira-stencil-one-subtitle', 'text-8xl', 'w-[50%]', 'text-center']"
                class="absolute bottom-0 left-1 saira-stencil-one-subtitle text-8xl w-[50%] text-center"> ? </h2>
        </div>
    </div>

    <BottomBar @rerollQuestion="getHotspotData(route.params.borough.toString())"></BottomBar>

</template>

<script setup lang="ts">
import BottomBar from '@/components/BottomBar.vue'
import QuestionOption from '@/components/QuestionOption.vue'
import QuestionResults from '@/components/QuestionResults.vue'
import { useRoute } from 'vue-router'
import { watch, onBeforeMount, ref } from 'vue'
import { getHotspotData } from '@/store/functions'
import { getRandomParam } from '@/store/functions'
import { hotspotData } from '@/store/variable_storage'
import { createQuestion } from '@/store/functions'
import { getRandomTargetVal } from '@/store/functions'
import { themeObject } from '@/store/variable_storage'
import { convertNumToBorough } from '@/store/functions'
import { changeStreak } from '@/store/functions'
import { currentQuestion } from '@/store/variable_storage'
import { showingResults } from '@/store/variable_storage'
import { randomInt } from '@/store/functions'
import { streak } from '@/store/variable_storage'

const route = useRoute()

let boroughName = ref<string>(convertNumToBorough(parseInt(route.params.borough as string)))
let correct = ref<boolean>(false)

function chooseOption(optionNumber: number) {
    if(currentQuestion.correct_answer === 0) {
        correct.value = true
    } else {
        if(currentQuestion.correct_answer === optionNumber) {
            correct.value = true
        } else {
            correct.value = false
        }
    }
    changeStreak(correct.value)
    showingResults.value = true
}

onBeforeMount(() => {
    getHotspotData(route.params.borough.toString())

    let filter_1 = getRandomParam()
    let targetValue_1 = getRandomTargetVal(filter_1)
    let filter_2 = getRandomParam()
    let targetValue_2 = getRandomTargetVal(filter_2)
    createQuestion(hotspotData.value, filter_1, targetValue_1,
    filter_2, targetValue_2, parseInt((route.params.borough).toString()))
})

watch(() => route.params.borough, () => {
    getHotspotData(route.params.borough.toString())
    boroughName.value = convertNumToBorough(parseInt(route.params.borough as string))
})

watch(() => hotspotData.value, () => { // everytime i run getHotspotData(), it will run this function, which asks the question
    let filter_1 = getRandomParam()
    let targetValue_1 = getRandomTargetVal(filter_1)
    let filter_2 = getRandomParam()
    let targetValue_2 = getRandomTargetVal(filter_2)
    createQuestion(hotspotData.value, filter_1, targetValue_1, filter_2, targetValue_2, parseInt(route.params.borough as string))
    console.log(currentQuestion)
})

</script>

<style scoped>
.result-popup-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
.result-popup-enter-active {
  transition: all 0.1s ease-out;
}
.result-popup-enter-to {
  opacity: 1;
  transform: scale(1);
}

.result-popup-leave-from {
  opacity: 1;
  transform: scale(1);
}
.result-popup-leave-active {
  transition: all 0.3s ease-in;
}
.result-popup-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

/* -------- */

.question-one-enter-from {
    opacity: 0;
    transform: translateY(-100%) scale(0.5)
}

.question-one-enter-active {
    transition: all 0.5s ease-in-out;
}

.question-one-enter-to {
    opacity: 1;
    transform: translateY(0) scale(1)
}

.question-one-leave-from {
    opacity: 1;
    transform: translateY(0) scale(1)
}

.question-one-leave-active {
    transition: all 2s ease-in-out;
}

.question-one-leave-to {
    opacity: 0;
    transform: translateY(100%) scale(0.5)
}

/* -------- */

.question-two-enter-from {
    opacity: 0;
    transform: translateY(100%) scale(0.5)
}

.question-two-enter-active {
    transition: all 0.5s ease-in-out;
}

.question-two-enter-to {
    opacity: 1;
    transform: translateY(0) scale(1)
}

.question-two-leave-from {
    opacity: 1;
    transform: translateY(0) scale(1)
}

.question-two-leave-active {
    transition: all 2s ease-in-out;
}

.question-two-leave-to {
    opacity: 0;
    transform: translateY(-100%) scale(0.5)
}

</style>