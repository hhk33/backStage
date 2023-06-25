<template>
    <div class="logo">
        <el-icon color="white" size="32px" v-show="setting.logoHidden">
            <SwitchFilled />
        </el-icon>
        <p>{{ setting.title }}</p>
    </div>
</template>

<script setup lang="ts">
import { SwitchFilled } from '@element-plus/icons-vue'
import setting from '@/setting.ts'
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
        margin-left: 10px;
        font-size: $base-logo-title-fontSize;
    }
}
</style>