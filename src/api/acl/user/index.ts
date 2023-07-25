import request from "@/utils/request";
import { UserResponseData, User, AllRoleResponseData, SetRoleData, } from './type'
enum API {
    //获取用户信息
    ALLUSER_URL = '/admin/acl/user/',
    //添加用户
    ADDUSER_URL = '/admin/acl/user/save',
    //更新用户
    UPDATEUSER_URL = '/admin/acl/user/update',
    //获取职位,当前账号拥有的职位
    ALLROLEURL = '/admin/acl/user/toAssign/',
    //分配角色
    SETROLE_URL = '/admin/acl/user/doAssignRole',
    //删除账号
    DELETEUSER_URL = '/admin/acl/user/remove/',
    //批量删除
    DELETEALLUSER_URL = '/admin/acl/user/batchRemove',
}

export const reqUserInfo = (page: number, limit: number, username: string) => {
    return request.get<any, UserResponseData>(API.ALLUSER_URL + `${page}/${limit}/?username=${username}`)
}

export const reqAddOrUpdateUser = (data: User) => {
    if (data.id) {
        return request.put<any, any>(API.UPDATEUSER_URL, data)
    } else {
        return request.post<any, any>(API.ADDUSER_URL, data)
    }
}

export const reqAllRole = (userId: number) => {
    return request.get<any, AllRoleResponseData>(API.ALLROLEURL + userId)
}

export const reqSetUserRole = (data: SetRoleData) => {
    return request.post<any, any>(API.SETROLE_URL, data)
}

export const reqRemoveUser = (userId: number) => {
    return request.delete<any, any>(API.DELETEUSER_URL + userId)
}

export const reqSelectUser = (idList: number[]) => {
    return request.delete(API.DELETEALLUSER_URL, { data: idList })
}
