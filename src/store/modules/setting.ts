import { defineStore } from "pinia"

let useLayoutSettingStore = defineStore('Setting', {
    state: () => {
        return {
            flod: false,
            refresh: false,
        }
    },
    actions: {
        changeFlod() {
            this.flod = !this.flod
        },
        changeRefresh() {
            this.refresh = !this.refresh
        },
    }
})

export default useLayoutSettingStore