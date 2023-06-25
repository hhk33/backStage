import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'
import { loginForm, loginResponseData } from '@/api/user/type'
import { UserState } from './type/type'
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
//引入常量路由
import { contantRoute } from '@/router/routes'
let useUserStore = defineStore('User', {
    //存储数据
    state: (): UserState => {
        return {
            token: GET_TOKEN(),
            menuRoutes: contantRoute,
        }
    },
    //处理异步|逻辑
    actions: {
        async userLogin(data: loginForm) {
            let res: loginResponseData = await reqLogin(data)
            console.log(res)
            if (res.code == 200) {
                this.token = (res.data.token as string)
                SET_TOKEN(res.data.token as string)
                return 'ok'
            }
            else {
                return Promise.reject(new Error(res.data.message))
            }
        }
    },
    getters: {}
})

export default useUserStore