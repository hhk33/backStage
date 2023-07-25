<template>
    <div>404</div>
    <button @click="goHome">返回首页</button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
let $router = useRouter()
const goHome = () => {
    $router.push('./home')
}
</script>

<style scoped></style>
