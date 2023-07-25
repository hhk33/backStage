<template>
    <!-- Talbe -->
    <el-card class="box-card">
        <el-button type="primary" icon="Plus" @click="addTradeMark">添加品牌</el-button>
        <el-table border :data="trademarkStore.records">
            <el-table-column label="序号" align="center" type="index" width="80px" />
            <el-table-column label="品牌名称" prop="tmName" />
            <el-table-column label="品牌LOGO">
                <template #="{ row }">
                    <img :src="row.logoUrl" style="width: 120px; height: 120px;">
                </template>
            </el-table-column>
            <el-table-column label="品牌操作">
                <template #="{ row }">
                    <el-button type="warning" size="small" icon="Edit" @click="updatedTradeMark(row)"></el-button>
                    <el-popconfirm :title="`确定要删除${row.tmName}吗?`" width="200px" icon="Delete"
                        @confirm="deleteTradeMark(row.id)">
                        <template #reference>
                            <el-button type="danger" size="small" icon="Delete"></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <div class="demo-pagination-block">
            <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4" :page-sizes="[3, 5, 8, 10]"
                :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="trademarkStore.total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
    </el-card>
    <!-- Dialog -->
    <el-dialog v-model="dialogFormVisible" :title="form.id ? '修改品牌' : '添加品牌'">
        <el-form :model="form" style="width: 80%;" :rules="rules" ref="formRef">
            <el-form-item label="品牌名称" label-width="100px" prop="tmName">
                <el-input v-model="form.tmName" aria-placeholder="请输入品牌名称" />
            </el-form-item>
            <el-form-item label="品牌Logo" label-width="100px" prop="logoURL">
                <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
                    :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="form.logoUrl" :src="form.logoUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="cancelBtn">取消</el-button>
                <el-button type="primary" @click="confirmBtn">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import useTransitionState from '@/store/modules/product/trademark'
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import { Trademark } from '@/api/product/trademark/type'

//Table
//当前页码
let currentPage4 = ref<number>(1)
//每页显示几条数据
let pageSize4 = ref<number>(3)

let formRef = ref()

const getTradeMark = async (page: number, limit: number) => {
    await trademarkStore.getTrademark(page, limit)
}

const handleSizeChange = (val: number) => {
    currentPage4.value = 1
    getTradeMark(currentPage4.value, val)
}
const handleCurrentChange = (val: number) => {
    getTradeMark(val, pageSize4.value)
}

//Dialog
let form = reactive<Trademark>({
    tmName: '',
    logoUrl: ''
})
let dialogFormVisible = ref<boolean>(false)
//添加品牌
const addTradeMark = () => {
    form.id = 0
    form.logoUrl = ''
    form.tmName = ''
    //问号语法
    // formRef.value?.clearValidate('tmName')
    // formRef.value?.clearValidate('logoURL')
    //nextTick
    nextTick(() => {
        formRef.value.clearValidate('tmName')
        formRef.value.clearValidate('logoURL')
    })
    dialogFormVisible.value = true
}
//更新品牌
const updatedTradeMark = (row: Trademark) => {
    dialogFormVisible.value = true
    //合并对象
    Object.assign(form, row)
    // form.tmName = row.tmName
    // form.logoUrl = row.logoUrl
    // form.id = row.id
    nextTick(() => {
        formRef.value.clearValidate('tmName')
        formRef.value.clearValidate('logoURL')
    })
}

const deleteTradeMark = async (id: number) => {
    try {
        await trademarkStore.deleteTradeMark(id)
        ElMessage({
            type: 'success',
            message: '删除品牌成功'
        })
        if (trademarkStore.records.length > 1)
            getTradeMark(currentPage4.value, pageSize4.value)
        else {
            if (currentPage4.value > 1)
                currentPage4.value = currentPage4.value - 1
            getTradeMark(currentPage4.value, pageSize4.value)
        }
    } catch (error) {
        ElMessage({
            type: 'error',
            message: '删除品牌失败'
        })
    }
}
//dialog取消按钮
const cancelBtn = () => {
    dialogFormVisible.value = false
}
//确定按钮
const confirmBtn = async () => {

    try {
        await formRef.value.validate()
    } catch (error) {
        console.log(error)
    }
    if (!form.id) {
        try {
            await trademarkStore.addTradeMark(form)
            dialogFormVisible.value = false
            ElMessage({
                type: 'success',
                message: '添加品牌成功'
            })
            getTradeMark(currentPage4.value, pageSize4.value)
        } catch (error) {
            ElMessage({
                type: 'error',
                message: '添加品牌失败'
            })
        }
    }
    else {
        try {
            await trademarkStore.UpdateTradeMark(form)
            dialogFormVisible.value = false
            ElMessage({
                type: 'success',
                message: '修改品牌成功'
            })
            getTradeMark(currentPage4.value, pageSize4.value)
        } catch (error) {
            ElMessage({
                type: 'error',
                message: '修改品牌失败'
            })
        }
    }
}

const validatorTmName = (_: any, value: string, callBack: any) => {
    if (value.trim().length >= 2) {
        callBack()
    }
    else {
        callBack(new Error('品牌名称位数大于等于两位'))
    }
}

const validatorLogoUrl = (_: any, value: string, callBack: any) => {
    //如果图片上传
    if (value) {
        callBack();
    } else {
        callBack(new Error('LOGO图片务必上传'))
    }
}

const rules = {
    tmName: [
        {
            required: true,
            tigger: 'blur',
            validator: validatorTmName
        }
    ],
    logoURL: [
        {
            required: true,
            validator: validatorLogoUrl
        }
    ]
}

//图片上传
let trademarkStore = useTransitionState()
type UploadProps = typeof UploadProps
//图片上传成功
const handleAvatarSuccess: UploadProps['onSuccess'] = (response: any) => {
    form.logoUrl = response.data
    formRef.value.clearValidate('logoUrl');
}
//图片上传前
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile: any) => {
    if (rawFile.type == 'image/png' || rawFile.type == 'image/jpeg' || rawFile.type == 'image/gif') {
        if (rawFile.size / 1024 / 1024 <= 4)
            return true
        else {
            ElMessage({
                type: 'error',
                message: '上传文件大小需要小于等于4MB'
            })
        }
    }
    else {
        ElMessage({
            type: 'error',
            message: '上传文件格式务必为PNG/JPEG/GIF'
        })
    }
}

onMounted(() => {
    getTradeMark(currentPage4.value, pageSize4.value)
})
</script>

<style lang="scss" scoped>
.el-table {
    margin: 10px 0;
}

.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>