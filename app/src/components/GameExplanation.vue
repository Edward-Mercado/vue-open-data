<template>
    <div :class="themeObject.bg_2" class="p-10 flex lg:flex-row flex-col justify-around rounded-3xl items-center my-5">
        <h2 :class="themeObject.color_6" class="saira-stencil-one-subtitle text-4xl lg:text-4xl lg:w-[15%] lg:pb-0 pb-3 text-center"> WHAT IS THIS GAME? </h2>
        <div :class="themeObject.bg" class="lg:w-[75%] w-[90%] rounded-4xl p-[3%]">
            <p :class="themeObject.color_2" class="font-bold text-lg lexend-deca"> Imagine you are stranded in the remote tribe of New York City. 
                You desperately need to find any form of civilization, such as Rhode Island, 
                or you will likely perish. Unfortunately, you bear nothing but the clothes on your back 
                and an iPad Air (with no data plans). Whatever will you do? You just <span class="italic">need</span> to find a hotspot,
                somewhere! So, you will be locked into one borough, and you will be given two choices (two different hotspot types),
                and you need to determine which one you are more likely to find. If you get a single choice wrong, then you die of no WiFi.
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { themeObject } from '@/store/variable_storage';


</script>

<style scoped>

</style>