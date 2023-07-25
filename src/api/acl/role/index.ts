import request from '@/utils/request'
import type { RoleResponseData, RoleData, MenuResponseData } from './type'
enum API {
    ALLROLE_URL = '/admin/acl/role/',
    ADDROLE_URL = '/admin/acl/role/save',
    UPDATEROLE_URL = '/admin/acl/role/update',
    ALLPERMISSTION = '/admin/acl/permission/toAssign/',
    SETPERMISTION_URL = '/admin/acl/permission/doAssign/?',
    REMOVEROLE_URL = '/admin/acl/role/remove/',
}

//获取全部角色
export const reqAllRoleList = (page: number, limit: number, roleName: string) => {
    return request.get<any, RoleResponseData>(API.ALLROLE_URL + `${page}/${limit}/?roleName=${roleName}`)
}

export const reqAddOrUpdateRole = (data: RoleData) => {
    if (data.id) {
        return request.put<any, any>(API.UPDATEROLE_URL, data)
    } else {
        return request.post<any, any>(API.ADDROLE_URL, data)
    }
}

export const reqAllMenuList = (roleId: number) => {
    return request.get<any, MenuResponseData>(API.ALLPERMISSTION + roleId)
}

export const reqSetPermisstion = (roleId: number, permissionId: number[]) => {
    return request.post(API.SETPERMISTION_URL + `roleId=${roleId}&permissionId=${permissionId}`)
}

export const reqRemoveRole = (roleId: number) => {
    return request.delete<any, any>(API.REMOVEROLE_URL + roleId)
}
