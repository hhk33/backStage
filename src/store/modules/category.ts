import { defineStore } from "pinia"
import { reqAttr, reqC1, reqC2, reqC3 } from '@/api/product/attr'
import type { AttrResponseData, CategoryResponseData } from '@/api/product/attr/type'
import type { CategoryState } from '@/store/modules/type/type'

let useCategoryStore = defineStore('Attr', {
    state: (): CategoryState => {
        return {
            c1: [],
            c1Id: '',
            c2: [],
            c2Id: '',
            c3: [],
            c3Id: '',
            attrArr: []
        }
    },
    actions: {
        async getC1Info() {
            let res: CategoryResponseData = await reqC1()
            if (res.code == 200) {
                this.c1 = res.data
                return 'ok'
            }
            else {
                return Promise.reject(new Error(res.message))
            }
        },
        async getC2Info(data: number | string) {
            let res: CategoryResponseData = await reqC2(data)
            if (res.code == 200) {
                this.c2 = res.data
                return 'ok'
            }
            else {
                return Promise.reject(new Error(res.message))
            }
        },
        async getC3Info(data: number | string) {
            let res: CategoryResponseData = await reqC3(data)
            if (res.code == 200) {
                this.c3 = res.data
                return 'ok'
            }
            else {
                return Promise.reject(new Error(res.message))
            }
        },
        async getAttr(c1Id: number | string, c2Id: number | string, c3Id: number | string) {
            let res: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
            if (res.code == 200) {
                this.attrArr = res.data
                return 'ok'
            }
            else {
                return Promise.reject(new Error(res.message))
            }
        }
    }
})

export default useCategoryStore