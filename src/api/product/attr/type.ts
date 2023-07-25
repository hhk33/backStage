interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

export interface CategoryObj {
    id: number | string,
    name: string,
    category1Id?: number,
    category2Id?: number
}

export interface CategoryResponseData extends ResponseData {
    data: CategoryObj[]
}

export interface AttrValue {
    id?: number,
    createTime?: null,
    updateTime?: null,
    valueName: string,
    attrId?: number
}

export type AttrValueList = AttrValue[]

export interface Attr {
    id?: number,
    createTime?: null,
    updateTime?: null,
    attrName: string,
    categoryId: number | string,
    categoryLevel: number,
    attrValueList: AttrValueList,
    attrIdAndValueId?: string
}

export interface AttrResponseData extends ResponseData {
    data: Attr[]
}