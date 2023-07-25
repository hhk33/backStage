<template>
    <div>
        <Category :sence="sence" />
        <el-card style="margin: 10px 0;">
            <div v-show="form == 0">
                <el-button type="primary" icon="Plus" @click="addSPU" :disabled="!categoryStore.c3Id">添加SPU</el-button>
                <el-table style="margin: 10px 0" border :data="records">
                    <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                    <el-table-column label="SPU名称" prop="spuName"></el-table-column>
                    <el-table-column label="SPU描述" prop="description"></el-table-column>
                    <el-table-column label="SPU操作">
                        <template #="{ row }">
                            <el-button type="primary" size="small" icon="Plus" title="添加SKU"
                                @click="addSKU(row)"></el-button>
                            <el-button type="warning" size="small" icon="Edit" title="修改SPU"
                                @click="updateSPU(row)"></el-button>
                            <el-button type="info" size="small" icon="View" title="查看SKU列表"
                                @click="showSKUList(row)"></el-button>
                            <el-popconfirm :title="`你确定删除${row.spuName}?`" width="200px" @confirm="deleteBtn(row)">
                                <template #reference>
                                    <el-button type="danger" size="small" icon="Delete" title="删除SPU"></el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 5, 8, 10]"
                    :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total"
                    @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>
            <SPUForm v-show="form == 1" @changeForm="changeForm" ref="spu"></SPUForm>
            <SKUForm v-show="form == 2" @changeForm="changeForm" ref="sku"></SKUForm>
            <el-dialog title="SKU列表" v-model="show">
                <el-table border :data="skuInfoList">
                    <el-table-column label="SKU名字" prop="skuName"></el-table-column>
                    <el-table-column label="SKU价格" prop="price"></el-table-column>
                    <el-table-column label="SKU重量" prop="weight"></el-table-column>
                    <el-table-column label="SKU图片">
                        <template #="{ row }">
                            <img :src="row.skuDefaultImg" style="width: 100px; height: 100px;" alt="">
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import useCategoryStore from '@/store/modules/category'
import { reqGetSPU, reqSKUInfo, reqDeleteSPU } from '@/api/product/spu/index'
import type { SkuData, SPUResponseData, Records, SPUData } from '@/api/product/spu/type'
import SKUForm from './skuForm.vue'
import SPUForm from './spuForm.vue'
import { ElMessage } from 'element-plus'

//选择器是否使用
let sence = ref<boolean>(true)
//场景选择
let form = ref<number>(0)
const currentPage = ref(1)
const pageSize = ref(3)

//dialog显示
let show = ref<boolean>(false)

let categoryStore = useCategoryStore()
watch(() => [categoryStore.c3Id], () => {
    records.value = []
    if (!categoryStore.c3Id)
        return
    getSPU()
})

let records = ref<Records>([])
let total = ref<number>()
const getSPU = async (page: number = 1) => {
    currentPage.value = page
    let res: SPUResponseData = await reqGetSPU(currentPage.value, pageSize.value, categoryStore.c3Id)
    if (res.code == 200) {
        records.value = res.data.records
        total.value = res.data.total
    }
}

const handleSizeChange = () => {
    getSPU()
}

const handleCurrentChange = () => {
    getSPU(currentPage.value)
}


//更新SPU信息
let spu = ref()
const updateSPU = (row: SPUData) => {
    sence.value = false
    form.value = 1
    spu.value.initSPUInfo(row)
}
//添加spu
const addSPU = () => {
    sence.value = false
    form.value = 1
    spu.value.initAddSPU(categoryStore.c3Id)
}
//自定义事件，切换回到场景
const changeForm = (params: string) => {
    sence.value = true
    form.value = 0
    if (params == 'add')
        getSPU()
    else
        getSPU(currentPage.value)
}
//添加sku
let sku = ref()
const addSKU = (row: SPUData) => {
    sence.value = false
    form.value = 2
    sku.value.initSKUInfo(categoryStore.c1Id, categoryStore.c2Id, row)
}
//查看sku
let skuInfoList = ref<SkuData[]>([])
const showSKUList = async (row: SPUData) => {
    let res = await reqSKUInfo((row.id as string))
    skuInfoList.value = res.data
    show.value = true
}

const deleteBtn = async (row: SPUData) => {
    let res = await reqDeleteSPU((row.id as string))
    if (res.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        getSPU(records.value.length > 1 ? currentPage.value : currentPage.value - 1)
    } else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        })
    }
}

onBeforeUnmount(() => {
    //清空仓库的数据
    categoryStore.$reset()
})
</script>

<style scoped></style>