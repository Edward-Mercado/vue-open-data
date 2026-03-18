import { ApiResponse, hotspotData, responseItem, themes, testableParams, 
testableParamTemplate, questionChoice, questionData, themeObject, streak, currentQuestion } from "./variable_storage"

import { reactive } from 'vue'

export function makePieChart() {

}

export function makeBarChart() {

}

export async function getHotspotData(borocode:string) {
    try {
        const response:Response = await fetch(`https://data.cityofnewyork.us/resource/yjub-udmw.json`)

        if(!response.ok) {
            throw new Error(`Request failed with status ${response.status}`)
        }

        const data:ApiResponse = await response.json()
        hotspotData.value = Array.isArray(data) ? data.filter((item:responseItem) => item.borocode === borocode) : []

    } catch (error) {
        console.log(error)
        hotspotData.value = []
    }
}

export function getTheme(theme: string) {
    const newTheme = themes[theme] || themes['light']
    
    Object.keys(themeObject).forEach(key => {
        // @ts-ignore
        themeObject[key] = newTheme[key]
    })
}

export function randomInt(min:number, max:number) {
    return min + Math.floor((max-min)*(Math.random()))
}

export function getRandomParam() {
    return testableParams[randomInt(0, testableParams.length)]
}

export function filteredToNumberValid(data:any[], filter:testableParamTemplate, targetValue:(string | number)) {
    if(!filter.round) {
        return data.filter((hotspot) => hotspot[filter.name] === targetValue).length
    } else {
        return data.filter((hotspot) => Math.round(parseFloat(hotspot[filter.name])*10)/10 === targetValue).length
    }
}

export function getRandomTargetVal(filter:testableParamTemplate) {
    return filter.possible_values[randomInt(0, filter.possible_values.length)]
}

export function compare(value_1:number, value_2:number) {
    if(value_1 > value_2) {
        return 1
    } else if (value_2 > value_1) {
        return 2
    } else {
        return 0
    }
}

export function createQuestion(data:any[], filter_1:testableParamTemplate, targetValue_1:(string | number), 
filter_2:testableParamTemplate, targetValue_2:(string | number), borough:number) {

    const questionChoice_1 = reactive<questionChoice>({
        param: filter_1,
        tested_value: targetValue_1,
        amount: filteredToNumberValid(data, filter_1, targetValue_1),
        number: 1
    })

    const questionChoice_2 = reactive<questionChoice>({
        param: filter_2,
        tested_value: targetValue_2,
        amount: filteredToNumberValid(data, filter_2, targetValue_2),
        number: 2
    })

    const resultingQuestion:questionData = {
        borough: borough, 
        option_one: questionChoice_1,
        option_two: questionChoice_2,
        correct_answer: compare(questionChoice_1.amount, questionChoice_2.amount)
    }

    Object.keys(currentQuestion).forEach(key => {
        // @ts-ignore
        currentQuestion[key] = resultingQuestion[key]
    })
}

export function convertNumToBorough(num:number) {
    let boroughs:string[] = ['MANHATTAN', 'THE BRONX', 'BROOKLYN', 'QUEENS', 'STATEN ISLAND']

    return boroughs[num-1]
}

export function changeStreak(correct:boolean) {
    if(correct) {
        streak.value++
    } else {
        streak.value = 0
    }
    localStorage.setItem('streak', streak.value.toString())
}