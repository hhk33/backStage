<template>
    <div class="layout_container">
        <div class="layout_shlider">
            <Logo />
            <!-- 滚动组件 -->
            <el-scrollbar class="scrollbar">
                <!-- 菜单组件 -->
                <el-menu background-color="#001529" text-color="white">
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar"></div>
        <!-- 内容展示区 -->
        <div class="layout_main">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from '@/views/main/index.vue'
import useUserStore from '@/store/modules/user'

let userStore = useUserStore();
</script>

<style lang="scss" scoped>
.layout_container {
    width: 100%;
    height: 100vh;
    color: white;

    .layout_shlider {
        width: $base-menu-width;
        height: 100vh;
        background: $base-menu-background;

        .scrollbar {
            width: 100%;
            height: calc(98vh - $base-menu-logo-height);

            .el-menu {
                border: none;
            }
        }
    }

    .layout_tabbar {
        position: fixed;
        width: calc(100% - $base-menu-width);
        height: $base-tabber-height;
        top: 0px;
        left: $base-menu-width;
    }

    .layout_main {
        position: absolute;
        width: calc(100% - $base-menu-width);
        height: calc(100% - $base-tabber-height);
        top: $base-tabber-height;
        left: $base-menu-width;
        overflow: auto;
        color: #000;
    }
}
</style>