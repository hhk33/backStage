<template>
    <div class="layout_container">
        <div class="layout_shlider" :class="{ flod: layoutSettingStore.flod ? true : false }">
            <Logo />
            <!-- 滚动组件 -->
            <el-scrollbar class="scrollbar">
                <!-- 菜单组件 -->
                <el-menu background-color="#001529" text-color="white" :default-active="$route.path"
                    :collapse="layoutSettingStore.flod">
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar" :class="{ flod: layoutSettingStore.flod ? true : false }">
            <Tabber></Tabber>
        </div>
        <!-- 内容展示区 -->
        <div class="layout_main" :class="{ flod: layoutSettingStore.flod ? true : false }">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from '@/views/main/index.vue'
import Tabber from '@/views/tabber/index.vue'
import useUserStore from '@/store/modules/user'
import { useRoute, useRouter } from 'vue-router'
import useLayoutSettingStore from '@/store/modules/setting'
// import { onMounted } from 'vue'

let layoutSettingStore = useLayoutSettingStore()
let $route = useRoute()
// let $router = useRouter()
let userStore = useUserStore()
// onMounted(() => {
//     try {
//         userStore.userInfo()
//     } catch (error) {
//         userStore.userLogout()
//         $router.push({ path: '/login', query: { redirect: $route.path } })
//     }
// })
</script>

<style lang="scss" scoped>
.layout_container {
    width: 100%;
    height: 100vh;

    .layout_shlider {
        width: $base-menu-width;
        height: 100vh;
        background: $base-menu-background;
        color: white;
        transition: all 0.3s;

        .scrollbar {
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);

            .el-menu {
                border: none;
            }

        }

        &.flod {
            width: $base-menu-min-width;
        }

    }


    .layout_tabbar {
        position: fixed;
        width: calc(100% - $base-menu-width);
        height: $base-tabber-height;
        top: 0px;
        left: $base-menu-width;
        transition: all 0.3s;

        &.flod {
            width: calc(100% - $base-menu-min-width);
            left: $base-menu-min-width;
        }
    }

    .layout_main {
        position: absolute;
        width: calc(100% - $base-menu-width);
        height: calc(100% - $base-tabber-height);
        top: $base-tabber-height;
        left: $base-menu-width;
        padding: 20px 15px;
        overflow: auto;
        transition: all 0.3s;

        &.flod {
            width: calc(100% - $base-menu-min-width);
            left: $base-menu-min-width;
        }
    }

}
</style>