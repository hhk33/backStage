import request from "@/utils/request"
import { SkuInfoResponse, SkuInfoData } from './type'

enum API {
    GETSKU_URL = '/admin/product/list/',
    //上架
    ONSALE_URL = '/admin/product/onSale/',
    //下架
    CANCELSALE_URL = '/admin/product/cancelSale/',
    //商品信息
    GETSKUINFO_URL = '/admin/product/getSkuInfo/',
    //删除SKU
    DELETESKU_URL = '/admin/product/deleteSku/'
}

export const reqGetSKU = (page: number, limit: number) => {
    return request.get<any, SkuInfoResponse>(API.GETSKU_URL + `${page}/${limit}`)
}

export const reqOnSale = (skuId: number) => {
    return request.get<any, any>(API.ONSALE_URL + skuId)
}

export const reqCancelSale = (skuId: number) => {
    return request.get<any, any>(API.CANCELSALE_URL + skuId)
}

export const reqGetSKUInfo = (skuId: number) => {
    return request.get<any, SkuInfoData>(API.GETSKUINFO_URL + skuId)
}

export const reqDeleteSKU = (skuId: number) => {
    return request.delete<any, any>(API.DELETESKU_URL + skuId)
}