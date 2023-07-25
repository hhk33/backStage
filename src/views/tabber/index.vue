<template>
    <div class="tabber">
        <div class="tabber_left">
            <BreadCrumb></BreadCrumb>
        </div>
        <div class="tabber_right">
            <Setting></Setting>
        </div>
    </div>
</template>

<script setup lang="ts">
import BreadCrumb from '@/views/tabber/breadcrumb/index.vue'
import Setting from '@/views/tabber/setting/index.vue'
</script>

<style lang="scss" scoped>
.tabber {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 1px 5px #bbbbbb;

    .tabber_left {
        display: flex;
        align-items: center;
    }

    .tabber_right {
        display: flex;
        align-items: center;
    }
}
</style>