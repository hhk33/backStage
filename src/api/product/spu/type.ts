interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

export interface SPUData {
    id?: number | string,
    createTime?: string,
    updateTime?: string,
    spuName: string,
    description: string,
    category3Id: number | string,
    tmId: number | string,
    spuSaleAttrList: null | SaleAttr[],
    spuImageList: null | SpuImg[],
    spuPosterList?: null | SpuImg[]
}

export type Records = SPUData[]

export interface SPUResponseData extends ResponseData {
    data: {
        records: Records,
        total: 13,
        size: 3,
        current: 1,
        orders: [],
        optimizeCountSql: boolean,
        hitCount: boolean,
        countId: null,
        maxLimit: null,
        searchCount: boolean,
        pages: number
    }
}

export interface Trademark {
    id: number,
    tmName: string,
    logoUrl: string,
}

export interface AllTradeMark extends ResponseData {
    data: Trademark[]
}


export interface SpuImg {
    id?: number,
    imgName?: string,
    imgUrl?: string,
    createTime?: string,
    updateTime?: string,
    spuId?: number,
    name?: string,
    url?: string,
}

export interface SpuHasImg extends ResponseData {
    data: SpuImg[]
}


export interface SaleAttrValue {
    id?: number,
    createTime?: null,
    updateTime?: null,
    spuId?: number,
    baseSaleAttrId: number | string,
    saleAttrValueName: string,
    saleAttrName?: string,
    isChecked?: null,
}

export type SpuSaleAttrValueList = SaleAttrValue[]


export interface SaleAttr {
    id?: number,
    createTime?: null,
    updateTime?: null,
    spuId?: number,
    baseSaleAttrId: number | string,
    saleAttrName: string,
    spuSaleAttrValueList: SpuSaleAttrValueList,
    flag?: boolean,
    saleAttrValue?: string,
    saleIdAndValueId?: string
}

export interface SaleAttrResponseData extends ResponseData {
    data: SaleAttr[]
}


export interface HasSaleAttr {
    id: number,
    name: string,
}

export interface HasSaleAttrResponseData extends ResponseData {
    data: HasSaleAttr[]
}

export interface Attr {
    attrId: number | string,
    valueId: number | string,
}

export interface saleArr {
    saleAttrId: number | string,
    saleAttrValueId: number | string,
}
export interface SkuData {
    category3Id: string | number,
    spuId: string | number,
    tmId: string | number,
    skuName: string,
    price: string | number,
    weight: string | number,
    skuDesc: string,
    skuAttrValueList?: Attr[],
    skuSaleAttrValueList?: saleArr[],
    skuDefaultImg: string,
}

export interface SkuInfoData extends ResponseData {
    data: SkuData[]
}

export interface SkuAttr {
    attrId: string | number,
    valueId: string | number,
}

export interface SkuSaleAttr {
    saleAttrId: string | number,
    saleAttrValueId: string | number,
}

export interface SkuAddData {
    category3Id: string | number,
    spuId: string | number,
    tmId: string | number,
    skuName: string,
    price: string | number,
    weight: string | number,
    skuDefaultImg: string,
    skuDesc: string,
    skuAttrValueList?: SkuAttr[],
    skuSaleAttrValueList?: SkuSaleAttr[],
}

export interface SkuInfoResponse extends ResponseData {
    data: SkuAddData[]
}