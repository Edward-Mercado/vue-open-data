import {ref, reactive} from 'vue'

export const hotspotData = ref<any[]>([])

export interface ApiResponse {
    results: any[]
}

export interface responseItem {
    borocode: string,
}

export interface themeTemplate {
    bg: string[],
    bg_2: string[],
    color_1: string[],
    color_2: string[],
    color_3: string[],
    color_4: string[],
    color_5: string[],
    color_6: string[],
    color_7: string[],
    button_1: string[],
    button_2: string[],
    outline_1: string[],
    outline_2: string[],
    choice: string[],
    chart_colors: string[]
}

export interface SingleParamTemplate {
    title: string,
    desc: string
}

export interface testableParamTemplate {
    name: string,
    round: boolean,
    possible_values: (string | number)[]
}

export interface questionChoice {
    param: testableParamTemplate,
    tested_value: (string | number),
    amount: number,
    number: number
}

export interface questionData {
    borough: number,
    option_one: questionChoice,
    option_two: questionChoice,
    correct_answer: number
}

export const streak = ref<number>(parseInt(localStorage.getItem("streak") || "0") || 0)

export const themes: 
Record<string, { bg: string[]; bg_2: string[]; color_1: string[]; color_2: string[]; color_3: string[]; color_4: string[]; color_5: string[]; color_6: string[]; color_7: string[]; button_1: string[]; button_2: string[]; outline_1: string[]; outline_2: string[]; choice: string[]; chart_colors: string[] }> = {
dark: {
    bg: ['bg-linear-to-tr', 'from-black', 'to-purple-950'],
    bg_2: ['bg-purple-300'],
    color_1: ['text-white'],
    color_2: ['text-purple-100'],
    color_3: ['text-pink-100'],
    color_4: ['text-purple-300'],
    color_5: ['text-purple-900'],
    color_6: ['text-indigo-800'],
    color_7: ['text-indigo-900'],
    button_1: ['bg-purple-100', 'hover:bg-purple-300', 'active:bg-purple-600', 'transition-all', 'duration-150',],
    button_2: ['bg-purple-800', 'hover:bg-purple-600', 'active:bg-purple-400', 'transition-all', 'duration-150',],
    outline_1: ['border-purple-100', 'border-4'],
    outline_2: ['border-purple-700', 'border-4'],
    choice: ['hover:bg-purple-400', 'active:bg-purple-500'],
    chart_colors: ['#ce99ff', '#bb60d6', "#fad1ff"]
  },
  light: {
    bg: ['bg-linear-to-tr', 'from-cyan-300', 'to-blue-100'],
    bg_2: ['bg-blue-950'],
    color_1: ['text-black'],
    color_2: ['text-blue-950'],
    color_3: ['text-blue-900'],
    color_4: ['text-cyan-900'],
    color_5: ['text-cyan-100'],
    color_6: ['text-sky-200'],
    color_7: ['text-sky-300'],
    button_1: ['bg-indigo-950', 'hover:bg-blue-800', 'active:bg-blue-600', 'transition-all', 'duration-150',],
    button_2: ['bg-cyan-700', 'hover:bg-cyan-500', 'active:bg-cyan-300', 'transition-all', 'duration-150',],
    outline_1: ['border-blue-950', 'border-4'],
    outline_2: ['border-sky-500', 'border-4'],
    choice: ['hover:bg-blue-800', 'active:bg-sky-700'],
    chart_colors: ['#195ab5', '#051d96', "#01093b"]
  },
  sunset: {
    bg: ['bg-linear-to-tr', 'from-pink-600', 'to-yellow-400'],
    bg_2: ['bg-rose-950'],
    color_1: ['text-black'],
    color_2: ['text-rose-950'],
    color_3: ['text-rose-900'],
    color_4: ['text-rose-800'],
    color_5: ['text-white'],
    color_6: ['text-orange-400'],
    color_7: ['text-yellow-300'],
    button_1: ['bg-rose-950', 'hover:bg-rose-800', 'active:bg-rose-600', 'transition-all', 'duration-150',],
    button_2: ['bg-orange-700', 'hover:bg-orange-500', 'active:bg-orange-300', 'transition-all', 'duration-150',],
    outline_1: ['border-rose-950', 'border-4'],
    outline_2: ['border-white', 'border-4'],
    choice: ['hover:bg-rose-900', 'active:bg-rose-700'],
    chart_colors: ['#fff099', '#fcb1dc', "#541609"]
  },
}

export const theme = ref<string>(localStorage.getItem("theme") || "light")

export const themeObject = reactive<themeTemplate>({
    bg: [],
    bg_2: [],
    color_1: [],
    color_2: [],
    color_3: [],
    color_4: [],
    color_5: [],
    color_6: [],
    color_7: [],
    button_1: [],
    button_2: [],
    outline_1: [],
    outline_2: [],
    choice: [],
    chart_colors: []
})

export const APIParams:SingleParamTemplate[] = [
    {
        title: 'boroname',
        desc: "The hotspot's borough."
    },
    {
        title: 'borocode',
        desc: "The hotspot's borough represented as a number."
    },
    {
        title: 'type',
        desc: "Which kind of hotspot it is (free, limited free, etc.)"
    },
    {
        title: 'latitude',
        desc: "Latitude."
    },
    {
        title: 'longitude',
        desc: "Longitude."
    },
    {
        title: 'location_t',
        desc: "The type of location it's in (outdoor, subway station, library, etc.)."
    }
]

export const testableParams:testableParamTemplate[] = [
    {
    name: 'provider',
    round: false,
    possible_values: ['ALTICEUSA', 'AT&T', 'BPL', 'Chelsea', 'City Tech', 'Downtown Brooklyn', 'Fiberless', 'Harlem', 'LinkNYC - Citybridge', 'Manhattan Down Alliance', 'NYCHA', 'NYPL', 'Partner', 'QPL', 'SPECTRUM', 'Spot on Networks', 'Transit Wireless']
},{
    name: 'type',
    round: false,
    possible_values: ['Limited Free', 'Free', 'Partner Site']
},{
    name: 'location_t',
    round: false,
    possible_values: ['Outdoor', 'Indoor', 'Outdoor TWC Aerial', 'Outdoor Kiosk', 'Subway Station']
},{
    name: 'latitude',
    round: true,
    possible_values: [40.5, 40.6, 40.7, 40.8, 40.9]
},{
    name: 'longitude',
    round: true,
    possible_values: [73.7, 73.8, 73.9, 74.0, 74.1, 74.2, 74.3]
}]

export let currentQuestion = reactive<questionData>({
    option_one: {
        param: {
            name: ''
        }
    } as questionChoice,
    option_two: {
        param: {
            name: ''
        }
    } as questionChoice,
    borough: 0,
    correct_answer: 0
} as questionData)

export const showingResults = ref<boolean>(false)