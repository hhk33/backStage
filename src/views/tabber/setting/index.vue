<template>
    <el-button icon="Refresh" circle @click="updateRefresh" />
    <el-button icon="FullScreen" circle @click="fullSreen" />
    <el-button icon="Setting" circle />
    <!-- 用户头像 -->
    <img :src="userStore.avatar">
    <!-- 下拉菜单 -->
    <el-dropdown>
        <span class="el-dropdown-link">
            <span>{{ userStore.username }}</span>
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="userLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import useLayoutSettingStore from '@/store/modules/setting'
import { useRouter, useRoute } from 'vue-router'

let $route = useRoute()
let $router = useRouter()
let userStore = useUserStore()
let layoutSettingStore = useLayoutSettingStore()
//更新按钮
const updateRefresh = () => {
    layoutSettingStore.changeRefresh()
}
//全屏按钮
const fullSreen = () => {
    let full = document.fullscreenElement
    if (!full) {
        document.documentElement.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
}
//退出登录
const userLogout = async () => {
    await userStore.userLogout()
    $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>

<style scoped>
img {
    width: 35px;
    height: 35px;
    margin-left: 20px;
    background-color: wheat;
    border-radius: 30px;
}

.el-dropdown {
    margin: 0 12px;
}
</style>