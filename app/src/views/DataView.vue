<template>
    <div class="flex flex-col justify-center items-center">
        <h2 :class="themeObject.color_1" class="text-4xl text-center font-black saira-stencil-one-title"> HOTSPOT DATA IN {{ convertNumToBorough(parseInt(borough)) }} </h2>
        <div data-aos="flip-left" class="w-[95%] bg-black/90 rounded-3xl my-4 py-4">
            <AllBars :trait="'location_t'" :allDataInBorough="allDataInBorough" :theme="theme"></AllBars>
            <h3 :class="themeObject.color_6" class="text-xl text-center font-extrabold lexend-deca"> LOCATION TYPE </h3>
        </div>
        <div data-aos="flip-right" class="w-[95%] bg-black/90 rounded-3xl my-4 py-4">
            <AllBars :trait="'type'" :allDataInBorough="allDataInBorough" :theme="theme"></AllBars>
            <h3 :class="themeObject.color_6" class="text-xl text-center font-extrabold lexend-deca"> TYPE </h3>
        </div>
        <div data-aos="flip-left" class="w-[95%] bg-black/90 rounded-3xl my-4 py-4">
            <AllBars :trait="'provider'" :allDataInBorough="allDataInBorough" :theme="theme"></AllBars>
            <h3 :class="themeObject.color_6" class="text-xl text-center font-extrabold lexend-deca"> PROVIDER </h3>
        </div>
        <div data-aos="flip-right" class="w-[95%] bg-black/90 rounded-3xl my-4 py-4">
            <AllBars :trait="'latitude'" :allDataInBorough="allDataInBorough" :theme="theme"></AllBars>
            <h3 :class="themeObject.color_6" class="text-xl text-center font-extrabold lexend-deca"> LATITUDE </h3>
        </div>
        <div data-aos="flip-left" class="w-[95%] bg-black/90 rounded-3xl my-4 py-4">
            <AllBars :trait="'longitude'" :allDataInBorough="allDataInBorough" :theme="theme"></AllBars>
            <h3 :class="themeObject.color_6" class="text-xl text-center font-extrabold lexend-deca"> LONGITUDE </h3>
        </div>
        <div data-aos="flip-right" class="w-[70vw] h-[70vw] bg-black/90 rounded-3xl my-4 py-4 flex flex-col justify-center items-center">
            <AllDoughnuts :trait="'location_t'" :allDataInBorough="allDataInBorough" :theme="theme"></AllDoughnuts>
            <h3 :class="themeObject.color_6" class="text-xl text-center font-extrabold lexend-deca"> LOCATION TYPE </h3>
        </div>
        <div data-aos="flip-left" class="w-[70vw] h-[70vw] bg-black/90 rounded-3xl my-4 py-4 flex flex-col justify-center items-center">
            <AllDoughnuts :trait="'type'" :allDataInBorough="allDataInBorough" :theme="theme"></AllDoughnuts>
            <h3 :class="themeObject.color_6" class="text-xl text-center font-extrabold lexend-deca"> TYPE </h3>
        </div>
        <div data-aos="flip-right" class="w-[70vw] h-[70vw] bg-black/90 rounded-3xl my-4 py-4 flex flex-col justify-center items-center">
            <AllDoughnuts :trait="'provider'" :allDataInBorough="allDataInBorough" :theme="theme"></AllDoughnuts>
            <h3 :class="themeObject.color_6" class="text-xl text-center font-extrabold lexend-deca"> PROVIDER </h3>
        </div>
        <div data-aos="flip-left" class="w-[70vw] h-[70vw] bg-black/90 rounded-3xl my-4 py-4 flex flex-col justify-center items-center">
            <AllDoughnuts :trait="'latitude'" :allDataInBorough="allDataInBorough" :theme="theme"></AllDoughnuts>
            <h3 :class="themeObject.color_6" class="text-xl text-center font-extrabold lexend-deca"> LATITUDE </h3>
        </div>
        <div data-aos="flip-right" class="w-[70vw] h-[70vw] bg-black/90 rounded-3xl my-4 py-4 flex flex-col justify-center items-center">
            <AllDoughnuts :trait="'longitude'" :allDataInBorough="allDataInBorough" :theme="theme"></AllDoughnuts>
            <h3 :class="themeObject.color_6" class="text-xl text-center font-extrabold lexend-deca"> LONGITUDE </h3>
        </div>
    </div>
    <div class="fixed bottom-[1%] right-[1%] flex flex-row justify-end">
        <HomeButton class="z-10 h-[7%] w-[7%] p-0"></HomeButton>
        <MapButton class="z-10 h-[7%] w-[7%] p-0"></MapButton>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onBeforeMount, watch } from 'vue';
import { convertNumToBorough, getHotspotData } from '@/store/functions';
import { populateBoroughData } from '@/store/functions';
import { hotspotData } from '@/store/variable_storage';
import { allDataInBorough } from '@/store/variable_storage';
import { theme } from '@/store/variable_storage';
import { themeObject } from '@/store/variable_storage';
import AllBars from '@/components/AllBars.vue';
import AllDoughnuts from '@/components/AllDoughnuts.vue';
import MapContainer from '@/components/MapContainer.vue';
import HomeButton from '@/components/HomeButton.vue';
import MapButton from '@/components/MapButton.vue';
import { onMounted } from 'vue';

import AOS from 'aos'
import 'aos/dist/aos.css'

onMounted(() => {
  AOS.init()
})

const route = useRoute()

let borough = route.params.borough as string

onBeforeMount(() => {
    getHotspotData(borough)
})

watch(() => route.params.borough, () => {
    borough = route.params.borough as string
    getHotspotData(borough)
})

watch(() => hotspotData.value, () => {
    populateBoroughData(hotspotData.value)
})

</script>

<style scoped></style>