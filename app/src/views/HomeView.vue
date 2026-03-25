<template>
    <GameExplanation></GameExplanation>
    <ParamInfo></ParamInfo>
    <div class="fixed bottom-[1%] right-[1%] flex flex-row justify-end">
        <HomeButton class="z-10 h-[7%] w-[7%] p-0"></HomeButton>
        <MapButton class="z-10 h-[10%] w-[10%]"></MapButton>
    </div>
</template>

<script setup lang="ts">
import GameExplanation from '@/components/GameExplanation.vue';
import ParamInfo from '@/components/ParamInfo.vue';
import MapButton from '@/components/MapButton.vue';
import HomeButton from '@/components/HomeButton.vue';
import { getTheme } from '@/store/functions'
import { watch } from 'vue'
import { theme } from '@/store/variable_storage';

watch(() => theme.value, () => {
    getTheme(theme.value)
})

</script>

<style scoped></style>