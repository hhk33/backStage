import request from '@/utils/request'
import { Trademark, TrademarkResponseData } from './type'

enum API {
    TRADEMARK_URL = '/admin/product/baseTrademark',
    ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
    UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
    DELETETRADEMARK_URL = '/admin/product/baseTrademark/remove',
}

export const reqHasTrademark = (page: number, limit: number) => {
    return request.get<any, TrademarkResponseData>(`${API.TRADEMARK_URL}/${page}/${limit}`)
}

export const reqAddTradeMark = (data:Trademark) => {
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
}

export const reqUpdateTradeMark = (data:Trademark) => {
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
}

export const reqDeleteTradeMark = (data:number) => {
    return request.delete<any, any>(API.UPDATETRADEMARK_URL+`/${data}`)
}