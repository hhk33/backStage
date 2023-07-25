<template>
    <div>
        <Category :sence="sence" />
        <el-card style="margin: 10px 0;">
            <div v-show="sence">
                <el-button type="primary" icon="Plus" :disabled="!categoryStore.c3Id" @click="addBtn">添加属性</el-button>
                <el-table border style="margin: 10px 0;" :data="categoryStore.c3Id ? categoryStore.attrArr : ''">
                    <el-table-column label="序号" type="index" aligin="center" width="80px"></el-table-column>
                    <el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
                    <el-table-column label="属性值名称">
                        <template #="{ row }">
                            <el-tag v-for="item in row.attrValueList" :key="item.id" style="margin: 5px;">{{ item.valueName
                            }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120px">
                        <template #="{ row }">
                            <el-button type="warning" size="small" icon="Edit" @click="updateAttr(row)"></el-button>
                            <el-popconfirm :title="`确定删除${row.attrName}`" width="200px" @confirm="deleteAttr(row.id)">
                                <template #reference>
                                    <el-button type="danger" size="small" icon="Delete"></el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-show="!sence">
                <el-form :inline="true">
                    <el-form-item label="属性名称">
                        <el-input v-model="attrParams.attrName" placeholder="请你输入属性名称"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" :disabled="!attrParams.attrName" @click="addAttrValue">添加属性值</el-button>
                <el-button @click="cancelBtn">取消</el-button>
                <el-table border style="margin: 10px 0;" :data="attrParams.attrValueList">
                    <el-table-column label="序号" type="index" aligin="center" width="80px"></el-table-column>
                    <el-table-column label="属性名称" width="120px">
                        <template #="{ row, $index }">
                            <el-input :ref="(vc: any) => inputArr[$index] = vc" v-if="flag[$index]" v-model="row.valueName"
                                placeholder="请输入属性名称" @blur="inputBlur(row, $index)"></el-input>
                            <div v-if="!flag[$index]" @click="inputToEdit($index)">{{ row.valueName }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="属性值操作">
                        <template #="{ row, $index }">
                            <el-button type="danger" size="small" icon="Delete" @click="deleteItem($index)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" :disabled="attrParams.attrValueList.length == 0" @click="saveBtn">保存</el-button>
                <el-button @click="cancelBtn">取消</el-button>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import useCategoryStore from '@/store/modules/category'
import { ref, watch, reactive, nextTick, onBeforeUnmount } from 'vue'
import { Attr, AttrValue } from '@/api/product/attr/type'
import { reqAddOrUpdateAttr, reqDeleteAttr } from '@/api/product/attr'
import { ElMessage } from 'element-plus'

let categoryStore = useCategoryStore()
let sence = ref<boolean>(true)
let flag = reactive<boolean[]>([])

const c3Change = () => {
    let { c1Id, c2Id, c3Id, getAttr } = categoryStore
    categoryStore.attrArr = []
    if (c3Id) {
        getAttr(c1Id, c2Id, c3Id)
    }
}
watch(() => categoryStore.c3Id, () => {
    c3Change()
})

const addBtn = () => {
    sence.value = false
    Object.assign(attrParams, {
        attrName: '',
        categoryId: categoryStore.c3Id,
        categoryLevel: 3,
        attrValueList: [],
    })
}

const cancelBtn = () => {
    sence.value = true
}

let attrParams = reactive<Attr>({
    attrName: '',
    categoryId: '',
    categoryLevel: 3,
    attrValueList: [],
})

const addAttrValue = () => {
    attrParams.attrValueList.push({
        valueName: ''
    })
    flag.push(true)
    nextTick(() => {
        inputArr[attrParams.attrValueList.length - 1].focus()
    })
}

const saveBtn = async () => {
    let res: any = await reqAddOrUpdateAttr(attrParams)
    if (res.code == 200) {
        sence.value = true
        ElMessage({
            type: 'success',
            message: attrParams.id ? '修改成功' : '添加成功'
        })
        let { c1Id, c2Id, c3Id, getAttr } = categoryStore
        getAttr(c1Id, c2Id, c3Id)
    }
    else {
        ElMessage({
            type: 'error',
            message: attrParams.id ? '修改失败' : '添加失败'
        })
    }
}

const inputBlur = (row: AttrValue, index: number) => {
    if (row.valueName.trim() == '') {
        attrParams.attrValueList.splice(index, 1)
        ElMessage({
            type: 'error',
            message: '属性值不能为空'
        })
        return
    }

    let repeat = attrParams.attrValueList.find((item) => {
        if (item != row) {
            return item.valueName == row.valueName
        }
    })
    if (repeat) {
        attrParams.attrValueList.splice(index, 1)
        ElMessage({
            type: 'error',
            message: '属性值不能重复'
        })
    }
    flag[index] = false
}

let inputArr = reactive<any>([])

const inputToEdit = (index: number) => {
    flag[index] = true
    nextTick(() => {
        inputArr[index].focus()
    })
}

const deleteItem = (index: number) => {
    attrParams.attrValueList.splice(index, 1)
    flag.splice(index, 1)
}

const updateAttr = (row: Attr) => {
    sence.value = false
    Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}

const deleteAttr = async (id: number | string) => {
    let res: any = await reqDeleteAttr(id)
    if (res.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        let { c1Id, c2Id, c3Id, getAttr } = categoryStore
        getAttr(c1Id, c2Id, c3Id)
    }
    else {
        ElMessage({
            tyoe: 'error',
            message: '删除失败'
        })
    }

}

onBeforeUnmount(() => {
    categoryStore.$reset()
})
</script>

<style scoped></style>