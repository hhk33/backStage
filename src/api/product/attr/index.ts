import request from '@/utils/request'
import type { CategoryResponseData, AttrResponseData, Attr } from '@/api/product/attr/type'

enum API {
    C1_URL = '/admin/product/getCategory1',
    C2_URL = '/admin/product/getCategory2/',
    C3_URL = '/admin/product/getCategory3/',
    ATTR_URL = '/admin/product/attrInfoList/',
    ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',
    DELETEATTER_URL = '/admin/product/deleteAttr/'
}

export const reqC1 = () => {
    return request.get<any, CategoryResponseData>(API.C1_URL)
}

export const reqC2 = (id: number | string) => {
    return request.get<any, CategoryResponseData>(API.C2_URL + id)
}

export const reqC3 = (id: number | string) => {
    return request.get<any, CategoryResponseData>(API.C3_URL + id)
}

export const reqAttr = (c1Id: number | string, c2Id: number | string, c3Id: number | string) => {
    return request.get<any, AttrResponseData>(API.ATTR_URL + `${c1Id}/${c2Id}/${c3Id}`)
}

export const reqAddOrUpdateAttr = (data: Attr) => {
    return request.post<any, any>(API.ADDORUPDATEATTR_URL, data)
}

export const reqDeleteAttr = (id: number | string) => {
    return request.delete<any, any>(API.DELETEATTER_URL + id)
}