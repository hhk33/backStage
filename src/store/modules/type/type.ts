import type { RouteRecordRaw } from 'vue-router'
import type { CategoryObj, Attr } from '@/api/product/attr/type'
export interface UserState {
    token: string | null,
    menuRoutes: RouteRecordRaw[],
    username: string | undefined,
    avatar: string | undefined,
    buttons: string[]
}

export interface CategoryState {
    c1: CategoryObj[],
    c1Id: string | number,
    c2: CategoryObj[],
    c2Id: string | number,
    c3: CategoryObj[],
    c3Id: string | number,
    attrArr: Attr[]
}

