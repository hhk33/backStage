<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form" :model="form" :rules="rules" ref="loginForm">
                    <h1>Hello</h1>
                    <h2>欢迎来到xxxxx</h2>
                    <el-form-item prop='username'>
                        <el-input v-model="form.username" :prefix-icon="User"></el-input>
                    </el-form-item>
                    <el-form-item prop='password'>
                        <el-input type="password" v-model="form.password" :prefix-icon="Lock" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="default" @click="login" :loading="loading">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import useUserStore from '@/store/modules/user.ts'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus';
import { getTime } from '@/utils/time'

let form = reactive({
    username: "admin",
    password: "atguigu123"
})
//表单验证规则
const validatorUserName = ({ }, value: any, callback: any) => {
    if (value.length >= 3)
        callback();
    else
        callback(new Error('用户名长度至少为三位'))
}

const validatorPassword = ({ }, value: any, callback: any) => {
    if (value.length >= 6)
        callback();
    else
        callback(new Error('密码长度至少为六位'))
}

const rules = reactive({
    username: [
        // {
        //     required: true, message: '用户名不能为空', trigger: 'blur'
        // },
        // {
        //     required: true, min: 6, max: 10, message: '用户名长度至少6位', trigger: 'change'
        // }
        {
            trigger: 'change', validator: validatorUserName
        }
    ],
    password: [
        {
            trigger: 'change', validator: validatorPassword
        }
    ]
})
//加载效果
let loading = ref(false)

let loginForm = ref()

//pinia小仓库
let userStore = useUserStore()
//路由器
let $router = useRouter()
let $route = useRoute()

const login = async () => {
    await loginForm.value.validate();
    loading.value = true
    try {
        await userStore.userLogin(form)
        let redirect: any = $route.query.redirect
        $router.push({ path: redirect || '/' })
        ElNotification({
            type: 'success',
            message: '欢迎回来',
            title: `HI, ${getTime()}好`
        })
        loading.value = false
    }
    catch (error) {
        loading.value = false
        ElNotification({
            type: 'error',
            message: (error as Error).message
        })
    }
}
</script>

<style lang="scss" scoped>
.login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;

    .login_form {
        position: relative;
        width: 80%;
        top: 30vh;
        padding: 40px;
        background: url('@/assets/images/login_form.png') no-repeat;
        background-size: cover;

        h1 {
            color: wheat;
            font-size: 40px;
        }

        h2 {
            color: wheat;
            font-size: 20px;
            margin: 20px 0;
        }
    }
}
</style>
