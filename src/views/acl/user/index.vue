<template>
    <el-card style="height: 80px;">
        <el-form :inline="true" class="form">
            <el-form-item label="用户名：">
                <el-input placeholder="请输入搜索的用户名" v-model="keyWord"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="searchBtn" type="primary" :disabled="!keyWord.trim()">搜索</el-button>
                <el-button @click="resetBtn">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin: 10px 0;">
        <el-button type="primary" @click="addUser">添加用户</el-button>
        <el-button type="primary" @click="deleteSelectUser" :disabled="!selectUser.length">批量删除</el-button>
        <el-table @selection-change="selectChange" style="margin: 10px 0;" border :data="records">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column label="#" align="center" type="index"></el-table-column>
            <el-table-column label="id" align="center" prop="id"></el-table-column>
            <el-table-column label="用户名字" align="center" prop="username"></el-table-column>
            <el-table-column label="用户名称" align="center" prop="name"></el-table-column>
            <el-table-column label="用户角色" align="center" prop="roleName"></el-table-column>
            <el-table-column label="创建时间" align="center" prop="createTime"></el-table-column>
            <el-table-column label="更新时间" align="center" prop="updateTime"></el-table-column>
            <el-table-column label="操作" align="center" width="300px">
                <template #="{ row }">
                    <el-button type="primary" icon="User" size="small" @click="setRole(row)">分配角色</el-button>
                    <el-button type="primary" icon="Edit" size="small" @click="updateUser(row)">编辑</el-button>
                    <el-popconfirm :title="`确定要删除${row.username}吗?`" width="260px" @confirm="deleteUser(row)">
                        <template #reference>
                            <el-button type="primary" icon="Delete" size="small">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 5, 8, 10]"
            :background="true" layout=" prev, pager, next, jumper,->,sizes,total" :total="total"
            @size-change="handleSizeChange" @current-change="handlePageChange" />
    </el-card>
    <!-- 抽屉1 添加或更新用户信息 -->
    <el-drawer v-model="drawerShow">
        <template #header>
            <h4>{{ userParams.id ? '更新用户' : '添加用户' }}</h4>
        </template>
        <template #default>
            <el-form ref="form" :model="userParams" :rules="rules">
                <el-form-item label="用户姓名" prop="username">
                    <el-input placeholder="请输入用户姓名" v-model="userParams.username"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" prop="name">
                    <el-input placeholder="请输入用户昵称" v-model="userParams.name"></el-input>
                </el-form-item>
                <el-form-item v-show="!userParams.id" prop="password" label="用户密码">
                    <el-input placeholder="请输入用户密码" v-model="userParams.password"></el-input>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <div style="flex:auto">
                <el-button @click="drawerShow = false">取消</el-button>
                <el-button type="primary" @click="saveBtn">确定</el-button>
            </div>
        </template>
    </el-drawer>
    <!-- 抽屉2 分配用户角色 -->
    <el-drawer v-model="drawerShow2">
        <template #header>
            <h4>分配用户角色</h4>
        </template>
        <template #default>
            <el-form ref="form">
                <el-form-item label="用户姓名">
                    <el-input v-model="userParams.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="角色列表">
                    <!-- 多选框 -->
                    <el-checkbox @change="handleCheckAllChange" v-model="checkAll"
                        :indeterminate="isIndeterminate">全选</el-checkbox>
                    <el-checkbox-group v-model="userRole" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="( role, index ) in  allRole " :key="index" :label="role">{{ role.roleName
                        }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <div style="flex:auto">
                <el-button @click="drawerShow = false">取消</el-button>
                <el-button type="primary" @click="confirmClick">确定</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import { reqSelectUser, reqRemoveUser, reqUserInfo, reqAddOrUpdateUser, reqAllRole, reqSetUserRole } from '@/api/acl/user'
import type { SetRoleData, UserResponseData, Records, User, AllRoleResponseData, AllRole } from '@/api/acl/user/type';
import { ElMessage } from 'element-plus'

//搜索关键字
let keyWord = ref<string>('')
//抽屉显示
let drawerShow = ref<boolean>(false)
let drawerShow2 = ref<boolean>(false)

//分页器
let currentPage = ref<number>(1)
let pageSize = ref<number>(3)
const handlePageChange = (page: number) => {
    getUserInfo(page)
}
const handleSizeChange = () => {
    getUserInfo()
}

//获取用户信息
let records = ref<Records>([])
let total = ref<number>()
const getUserInfo = async (page = 1) => {
    currentPage.value = page
    let res: UserResponseData = await reqUserInfo(currentPage.value, pageSize.value, keyWord.value)
    if (res.code == 200) {
        records.value = res.data.records
        total.value = res.data.total
    }
}

let userParams = reactive<User>({
    username: '',
    password: '',
    name: '',
})
let form = ref()

//添加用户
const addUser = () => {
    drawerShow.value = true
    Object.assign(userParams, {
        id: 0,
        username: '',
        password: '',
        name: '',
    })
    nextTick(() => {
        form.value.clearValidate(['username', 'name', 'password'])
    })
}
//修改用户信息
const updateUser = (row: User) => {
    drawerShow.value = true
    Object.assign(userParams, row)
    nextTick(() => {
        form.value.clearValidate(['username', 'name'])
    })
}

const saveBtn = async () => {
    await form.value.validate()
    let res: any = await reqAddOrUpdateUser(userParams)
    if (res.code == 200) {
        drawerShow.value = false
        ElMessage({
            type: 'success',
            message: userParams.id ? '更新成功' : '添加成功'
        })
        getUserInfo(userParams.id ? currentPage.value : 1)
        //浏览器自动刷新
        window.location.reload()
    } else {
        drawerShow.value = false
        ElMessage({
            type: 'error',
            message: userParams.id ? '更新失败' : '添加失败'
        })
    }

}
//校验规则
const validatorUsername = (_rule: any, value: any, callBack: any) => {
    if (value.trim().length >= 5) {
        callBack()
    } else {
        callBack(new Error('用户名字至少需要5位'))
    }
}
const validatorName = (_rule: any, value: any, callBack: any) => {
    if (value.trim().length >= 5) {
        callBack()
    } else {
        callBack(new Error('用户昵称至少需要5位'))
    }
}
const validatorPassword = (_rule: any, value: any, callBack: any) => {
    if (value.trim().length >= 6) {
        callBack()
    } else {
        callBack(new Error('用户密码至少需要6位'))
    }
}
const rules = {
    username: [{
        required: true,
        trigger: 'blur',
        validator: validatorUsername
    }],
    name: [{
        required: true,
        trigger: 'blur',
        validator: validatorName
    }],
    password: [{
        required: true,
        trigger: 'blur',
        validator: validatorPassword
    }]
}

//分配角色
let allRole = ref<AllRole>([]);
let userRole = ref<AllRole>([]);
const setRole = async (row: User) => {
    Object.assign(userParams, row)
    let res: AllRoleResponseData = await reqAllRole(row.id as number)
    if (res.code == 200) {
        allRole.value = res.data.allRolesList
        userRole.value = res.data.assignRoles
        drawerShow2.value = true
    }
}

const checkAll = ref<boolean>(false);
const isIndeterminate = ref<boolean>(true);
//全部复选框的change事件
const handleCheckAllChange = (val: boolean) => {
    userRole.value = val ? allRole.value : [];
    isIndeterminate.value = false
}
//复选框change事件
const handleCheckedCitiesChange = (value: string[]) => {
    checkAll.value = value.length === allRole.value.length;
    isIndeterminate.value = value.length !== allRole.value.length
}
//分配角色确定
const confirmClick = async () => {
    let data: SetRoleData = {
        userId: (userParams.id as number),
        roleIdList: userRole.value.map((item) => {
            return (item.id as number)
        })
    }
    let res = await reqSetUserRole(data)
    if (res.code == 200) {
        ElMessage({
            type: 'success',
            message: '分配职务成功'
        })
        drawerShow2.value = false
        getUserInfo(currentPage.value)
    } else {
        ElMessage({
            type: 'error',
            message: '分配职务失败'
        })
    }
}

//删除单个用户
const deleteUser = async (row: User) => {
    let res = await reqRemoveUser((row.id as number))
    if (res.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        getUserInfo(records.value.length > 1 ? currentPage.value : currentPage.value - 1)
    } else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        })
    }
}

//批量删除用户
let selectUser = ref<User[]>([])
const selectChange = (val: User[]) => {
    selectUser.value = val
}
const deleteSelectUser = async () => {
    let data: number[] = selectUser.value.map((item) => {
        return (item.id as number)
    })
    let res: any = await reqSelectUser(data)
    if (res.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        getUserInfo(records.value.length > 1 ? currentPage.value : currentPage.value - 1)
    } else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        })
    }
}

//搜索
const searchBtn = () => {
    getUserInfo()
    keyWord.value = ''
}

//重置
const resetBtn = () => {
    getUserInfo()
}

onMounted(() => {
    getUserInfo()
})
</script>

<style scoped>
.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>