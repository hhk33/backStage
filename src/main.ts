import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore 忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import '@/styles/index.scss'
import 'virtual:svg-icons-register'
import gloablComponent from './components/index'
import router from '@/router'
import pinia from '@/store'

const app = createApp(App)

//ElementPlus插件
app.use(ElementPlus, {
    locale: zhCn
})
//安装路由
app.use(router)
//安装自定义插件
app.use(gloablComponent)
//安装仓库
app.use(pinia)

app.mount('#app')
