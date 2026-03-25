<template>
    <div>  
        <h2 :class="themeObject.color_1" class="text-4xl text-center font-black saira-stencil-one-title"> ALL HOTSPOTS IN NEW YORK CITY </h2>
        <MapContainer></MapContainer>
    </div>
    <div class="fixed bottom-[1%] right-[1%] flex flex-row justify-end">
        <HomeButton class="z-10 h-[7%] w-[7%] p-0"></HomeButton>
        <MapButton class="z-10 h-[7%] w-[7%] p-0"></MapButton>
    </div>
</template>

<script setup lang="ts">
import { themeObject } from '@/store/variable_storage';
import HomeButton from '@/components/HomeButton.vue';
import MapButton from '@/components/MapButton.vue';
import MapContainer from '@/components/MapContainer.vue';
</script>

<style scoped>

</style>