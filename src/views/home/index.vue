<template>
    <el-card>
        <div class="box">
            <img :src="userStore.avatar" alt="" class="avatar">
            <div>
                <h3>{{ getTime() }}好,{{ userStore.username }}</h3>
                <p>XX后台管理平台</p>
            </div>
        </div>
    </el-card>
    <div class="bottoms">
        <svg-icon name="welcome" width="600px" height="300px"></svg-icon>
    </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import { getTime } from '@/utils/time'

let userStore = useUserStore()
</script>

<style lang="scss" scoped>
.box {
    display: flex;

    .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }

    div {
        margin: auto;
        margin-left: 30px;

        h3 {
            font-size: 22px;
            font-weight: bold;
            margin-bottom: 20px;
        }

        p {
            font-style: italic;
            color: gray;
        }
    }

}

.bottoms {
    margin-top: 30px;
    display: flex;
    justify-content: center;
}
</style>