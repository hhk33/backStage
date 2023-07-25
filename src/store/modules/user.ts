import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import { UserState } from './type/type'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import { loginFormData, loginRequestData, userInfoRequestData } from '@/api/user/type'
//引入路由
import { contantRoute, asnycRoute, anyRoute } from '@/router/routes'
//@ts-ignore
import cloneDeep from 'lodash/cloneDeep'
import router from '@/router'

//过滤异步路由
function filterAsyncRoute(asnycRoute: any, routes: any) {
    return asnycRoute.filter((item: any) => {
        if (routes.includes(item.name)) {
            if (item.children && item.children.length > 0) {
                item.children = filterAsyncRoute(item.children, routes)
            }
            return true
        }
    })
}

let useUserStore = defineStore('User', {
    //存储数据
    state: (): UserState => {
        return {
            token: GET_TOKEN(),
            //生成菜单需要路由数组
            menuRoutes: contantRoute,
            username: '',
            avatar: '',
            //用户按钮使用权限
            buttons: []
        }
    },
    //处理异步|逻辑
    actions: {
        async userLogin(data: loginFormData) {
            let res: loginRequestData = await reqLogin(data)
            console.log(res)
            if (res.code == 200) {
                this.token = (res.data as string)
                SET_TOKEN(res.data as string)
                return 'ok'
            }
            else {
                return Promise.reject(new Error(res.data))
            }
        },
        async userInfo() {
            let result: userInfoRequestData = await reqUserInfo()
            if (result.code == 200) {
                this.username = result.data.name
                this.avatar = result.data.avatar
                this.buttons = result.data.buttons
                //计算当前用户需要展示的异步路由
                const userAsyncRoute = filterAsyncRoute(
                    cloneDeep(asnycRoute),
                    result.data.routes,
                )
                this.menuRoutes = [...contantRoute, ...userAsyncRoute, anyRoute];
                //异步路由、任意路由动态追加
                [...userAsyncRoute, anyRoute].forEach((route: any) => {
                    router.addRoute(route)
                })
                return 'ok'
            }
            else {
                return Promise.reject(new Error(result.message))
            }
        },
        async userLogout() {
            let res: any = await reqLogout()
            if (res.code == 200) {
                this.token = ""
                this.username = ""
                this.avatar = ""
                REMOVE_TOKEN()
                return 'ok'
            }
            else {
                return Promise.reject(new Error(res.message))
            }
        }
    },
    getters: {}
})

export default useUserStore