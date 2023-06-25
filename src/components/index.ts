//配置全部的全局组件
import SvgIcon from './SvgIcon/index.vue';
import type { App, Component } from 'vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const components: { [name: string]: Component } = { SvgIcon };
export default {
    install(app: App) {
        Object.keys(components).forEach((key: string) => {
            app.component(key, components[key]);
        });
        //element-plus图标注册为全局组件
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        };
    }
}