import { defineStore } from "pinia";
import { reqAddTradeMark, reqDeleteTradeMark, reqHasTrademark, reqUpdateTradeMark } from "@/api/product/trademark";
import { TrademarkResponseData, Records, Trademark } from "@/api/product/trademark/type";

let useTrademarkStore = defineStore('Trademark', {
    state: () => {
        return {
            total: 10 as number,
            records: [] as Records
        }
    },
    actions: {
        async getTrademark(page: number, limit: number) {
            let res: TrademarkResponseData = await reqHasTrademark(page, limit)
            if (res.code == 200) {
                this.total = res.data.total
                this.records = res.data.records
                return 'ok'
            }
            else {
                return Promise.reject(new Error(res.message))
            }
        },
        async addTradeMark(data: Trademark) {
            let res: any = await reqAddTradeMark(data)
            if (res.code == 200) {

                return 'ok'
            }
            else {
                return Promise.reject(new Error(res.message))
            }
        },
        async UpdateTradeMark(data: Trademark) {
            let res: any = await reqUpdateTradeMark(data)
            if (res.code == 200) {
                return 'ok'
            }
            else {
                return Promise.reject(new Error(res.message))
            }
        },
        async deleteTradeMark(data: number) {
            let res = await reqDeleteTradeMark(data)
            if (res.code == 200) {
                return 'ok'
            }
            else {
                return Promise.reject(new Error(res.message))
            }
        }
    }
})

export default useTrademarkStore