<template>
    <div class="logo">
        <el-icon color="white" size="32px" v-show="setting.logoHidden">
            <SwitchFilled />
        </el-icon>
        <p :class="{ flod: layoutSettingStore.flod ? true : false }">{{ setting.title }}</p>
    </div>
</template>

<script setup lang ="ts">
import { SwitchFilled } from '@element-plus/icons-vue'
import useLayoutSettingStore from '@/store/modules/setting'
import setting from '@/setting.ts'
let layoutSettingStore = useLayoutSettingStore()
</script>

<style lang="scss" scoped>
.logo {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: 15px 0;
    color: white;

    p {
        overflow: scroll;
        height: 20px;
        margin-left: 10px;
        font-size: $base-logo-title-fontSize;
        transition: all 0.3s;

        &.flod {
            display: none;
            width: 0;
        }
    }

    ::-webkit-scrollbar {
        width: 0;
        height: 0;
    }

}
</style>
