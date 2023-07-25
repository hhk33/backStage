//自定义指令
import useUserStore from "@/store/modules/user"
import pinia from "@/store"
let UserStore = useUserStore(pinia)
export const isHasButton = (app: any) => {
    app.directive('has', {
        mounted(el: any, options: any) {
            if (!UserStore.buttons.includes(options.value)) {
                el.parentNode.removeChild(el)
            }
        },
    })
}