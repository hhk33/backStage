import request from "@/utils/request"
import type { SkuInfoResponse, SkuAddData, SPUData, SPUResponseData, AllTradeMark, SpuHasImg, SaleAttrResponseData, HasSaleAttrResponseData, } from './type'

enum API {
    GETSPU_URL = '/admin/product/',
    GETTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
    GETSOUIMAGE_URL = '/admin/product/spuImageList/',
    GETSALEATTR_URL = '/admin/product/spuSaleAttrList/',
    GETBASESALEATTR_URL = '/admin/product/baseSaleAttrList',
    ADDSPU_URL = '/admin/product/saveSpuInfo',
    UPDATE_URL = '/admin/product/updateSpuInfo',
    ADDSKU_URL = '/admin/product/saveSkuInfo',
    SKUINFO_URL = '/admin/product/findBySpuId/',
    DELETESPU_URL = '/admin/product/deleteSpu/'
}

export const reqGetSPU = (page: number, limit: number, c3Id: number | string) => {
    return request.get<any, SPUResponseData>(API.GETSPU_URL + `${page}/${limit}?category3Id=${c3Id}`)
}
//SPU品牌数据
export const reqGetTrademark = () => {
    return request.get<any, AllTradeMark>(API.GETTRADEMARK_URL)
}
//商品的图片地址
export const reqSpuImageList = (spuId: number) => {
    return request.get<any, SpuHasImg>(API.GETSOUIMAGE_URL + spuId)
}
//SPU销售属性
export const reqSpuHasSaleAttr = (spuId: number) => {
    return request.get<any, SaleAttrResponseData>(API.GETSALEATTR_URL + spuId)
}
//全部销售属性
export const reqAllSaleAttr = () => {
    return request.get<any, HasSaleAttrResponseData>(API.GETBASESALEATTR_URL)
}
//添加或更新SPU
export const reqAddOrUpdateSPU = (data: SPUData) => {
    if (data.id)
        return request.post<any, any>(API.UPDATE_URL, data)
    else
        return request.post<any, any>(API.ADDSPU_URL, data)
}

export const reqAddSKU = (data: SkuAddData) => {
    return request.post<any, any>(API.ADDSKU_URL, data)
}

export const reqSKUInfo = (spuId: number | string) => {
    return request.get<any, SkuInfoResponse>(API.SKUINFO_URL + spuId)
}

export const reqDeleteSPU = (spuId: number | string) => {
    return request.get<any, any>(API.DELETESPU_URL + spuId)
}