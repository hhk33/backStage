interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

export interface Trademark {
    id?: number,
    createTime?: string,
    updateTime?: string,
    tmName: string,
    logoUrl: string
}

export type Records = Trademark[]

export interface TrademarkResponseData extends ResponseData {
    data: {
        records: Trademark[],
        total: number,
        size: number,
        current: number,
        searchCount: boolean,
        pages: number
    }
}