<template>
    <div :class="themeObject.outline_1" class="p-[1%] w-full rounded-2xl text-left flex flex-col my-2.5">
        <h3 :class="themeObject.color_1" class="text-xl text-left font-extrabold lexend-deca"> {{ param.title }} </h3>
        <p :class="themeObject.color_2" class="text-left text-md lexend-deca"> {{ param.desc }} </p>
    </div>
</template>

<script setup lang="ts">
import { themeObject } from '@/store/variable_storage';
import type { SingleParamTemplate } from '@/store/variable_storage';
import type { PropType } from 'vue'

defineProps({
    param: {
        type: Object as PropType<SingleParamTemplate>,
        required: true,
    }
})

</script>

<style scoped>

</style>