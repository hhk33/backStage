import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import setting from './setting'
import useUserStore from './store/modules/user'
import pinia from './store'
//进度条
nprogress.configure({ showSpinner: false })

router.beforeEach(async (to, _from, next) => {
    let userStore = useUserStore(pinia)
    document.title = `${setting.title}-${to.meta.title}`
    nprogress.start()
    //获取token,去判断用户登录、还是未登录
    const token = userStore.token
    //获取用户名字
    const username = userStore.username
    //已登录
    if (token) {
        if (to.path == '/login') {
            next({ path: '/' })
        }
        else {
            if (username) {
                next()
            } else {
                //如果没有用户信息,在守卫这里发请求获取到了用户信息再放行
                try {
                    await userStore.userInfo()
                    //万一:刷新的时候是异步路由,有可能获取到用户信息、异步路由还没有加载完毕,出现空白的效果
                    next({ ...to })
                } catch (error) {
                    await userStore.userLogout()
                    next({ path: '/login', query: { redirect: to.path } })
                }
            }
        }
    }
    //未登录
    else {
        if (to.path == '/login') {
            next()
        }
        else {
            await userStore.userLogout()
            next({ path: '/login', query: { redirect: to.path } })
        }
    }

})

router.afterEach((_to, _form) => {
    nprogress.done()
})