interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

export interface SkuAttr {
    attrId: string | number,
    valueId: string | number,
    id?: string | number,
    valueName?: string,
}

export interface SkuSaleAttr {
    saleAttrId: string | number,
    saleAttrValueId: string | number,
    id?: string | number,
    saleAttrValueName?: string,
}

export interface skuImg {
    id: 161
    imgUrl: "http://39.98.123.211/group2/M00/02/DC/rBHu8mGyQOKAHoBTAAARB4P--g8514.jpg"
}

export interface SkuAddData {
    category3Id?: string | number,
    spuId?: string | number,
    tmId?: string | number,
    skuName?: string,
    price?: string | number,
    weight?: string | number,
    skuDefaultImg?: string,
    skuDesc?: string,
    skuAttrValueList?: SkuAttr[],
    skuSaleAttrValueList?: SkuSaleAttr[],
    skuImageList?: skuImg[],
    id?: number | string,
    isSale?: number
}

export interface SkuInfoResponse extends ResponseData {
    data: {
        records: SkuAddData[],
        total: number,
        size: number,
        current: number,
        orders: [],
        optimizeCountSql: boolean,
        hitCount: boolean,
        countId: null,
        maxLimit: null,
        searchCount: boolean,
        pages: number
    }
}

export interface SkuInfoData extends ResponseData {
    data: SkuAddData
}