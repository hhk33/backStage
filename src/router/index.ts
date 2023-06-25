import { createRouter, createWebHashHistory } from 'vue-router'
import { contantRoute } from './routes'

let router = createRouter({
    //路由模式：hash
    history: createWebHashHistory(),
    routes: contantRoute,
    //滚动行为
    scrollBehavior() {
        return {
            left: 0,
            top: 0
        }
    }
})

export default router;