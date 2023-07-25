<template>
    <el-icon @click="changeFold">
        <component :is="layoutSettingStore.flod? 'Fold':'Expand'"></component>
    </el-icon>
    <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" v-show="item.meta.title != 'layout'"
            :to="item.path">
            <el-icon>
                <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import useLayoutSettingStore from '@/store/modules/setting.ts'

let layoutSettingStore = useLayoutSettingStore()
let $route = useRoute()
//折叠按钮
const changeFold = () => {
    layoutSettingStore.changeFlod()
}
</script>

<style scoped>
.el-icon {
    margin: 0 30px 0 20px;
}

span {
    margin-left: -26px;
}
</style>