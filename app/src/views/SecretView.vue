<template>
    <div>
 <img src="/images/secret.jpeg" alt="secret" class="max-h-[20vh]">
 <h2 :class="themeObject.color_1" class="text-3xl saira-stencil-one-title italic"> wowowowow!! look! i did a good job today!!!</h2>
    </div>
    <BottomBar></BottomBar>
</template>

<script setup>
import { themeObject } from '@/store/variable_storage';
import BottomBar from '@/components/BottomBar.vue';
</script>

<style scoped>

</style>