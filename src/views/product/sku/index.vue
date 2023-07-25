<template>
    <el-card>
        <el-table border style="margin: 10px 0px;" :data="records">
            <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
            <el-table-column label="名称" width="150px" prop="skuName"></el-table-column>
            <el-table-column label="描述" width="150px" prop="skuDesc"></el-table-column>
            <el-table-column label="默认图片" width="150px">
                <template #="{ row }">
                    <img :src="row.skuDefaultImg" alt="" style="width: 100px; height: 100px;">
                </template>
            </el-table-column>
            <el-table-column label="重量" width="150px" prop="weight"></el-table-column>
            <el-table-column label="价格" width="150px" prop="price"></el-table-column>
            <el-table-column label="操作" width="250px" fixed="right">
                <template #="{ row }">
                    <el-button :type="row.isSale == 1 ? 'info' : 'primary'" size="small"
                        :icon="row.isSale == 1 ? 'Bottom' : 'Top'" @click="saleBtn(row)"></el-button>
                    <el-button type="warning" size="small" icon="Edit"></el-button>
                    <el-button type="info" size="small" icon="InfoFilled" @click="findSKU(row)"></el-button>
                    <el-popconfirm :title="`你确定要删除${row.skuName}?`" width="200px" @confirm="deleteBtn(row)">
                        <template #reference>
                            <el-button type="danger" size="small" icon="Delete"></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 5, 8, 10]"
            :background="true" layout=" prev, pager, next, jumper,->,sizes,total" :total="total"
            @size-change="handleSizeChange" @current-change="handlePageChange" />
        <!-- 抽屉组件 -->
        <el-drawer v-model="show">
            <template #header>
                <h4>查看商品详情</h4>
            </template>
            <template #default>
                <el-row>
                    <el-col :span="6">名称</el-col>
                    <el-col :span="18">{{ skuInfo.skuName }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">描述</el-col>
                    <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">价格</el-col>
                    <el-col :span="18">{{ skuInfo.price }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">平台属性</el-col>
                    <el-col :span="18">
                        <el-tag v-for="item in skuInfo.skuAttrValueList" :key="item.id">{{ item.valueName }}</el-tag>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">销售属性</el-col>
                    <el-col :span="18">
                        <el-tag v-for="item in skuInfo.skuSaleAttrValueList" :key="item.id">{{ item.saleAttrValueName
                        }}</el-tag>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">商品图片</el-col>
                    <el-col :span="18">
                        <!-- 轮播图 -->
                        <el-carousel :interval="4000" type="card" height="200px">
                            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id"
                                style="width: 160px; height: 160px;">
                                <img :src="item.imgUrl" alt="" style="width: 100%; height: 100%;">
                            </el-carousel-item>
                        </el-carousel>
                    </el-col>
                </el-row>
            </template>
        </el-drawer>
    </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqDeleteSKU, reqGetSKUInfo, reqGetSKU, reqOnSale, reqCancelSale } from '@/api/product/sku/index'
import type { SkuAddData, SkuInfoResponse, SkuInfoData } from '@/api/product/sku/type'
import { ElMessage } from 'element-plus'

let currentPage = ref<number>(1)
let pageSize = ref<number>(3)
let show = ref<boolean>(false)

let records = ref<SkuAddData[]>([])
let total = ref<number>(0)
const getSKU = async (page = 1) => {
    currentPage.value = page
    let res: SkuInfoResponse = await reqGetSKU(currentPage.value, pageSize.value)
    if (res.code == 200) {
        records.value = res.data.records
        total.value = res.data.total
    }
}

onMounted(() => {
    getSKU()
})
//分页器
const handlePageChange = (page: number) => {
    getSKU(page)
}
const handleSizeChange = () => {
    getSKU()
}
//上架/下架
const saleBtn = async (row: SkuAddData) => {
    if (row.isSale) {
        let res = await reqCancelSale((row.id as number))
        if (res.code == 200) {
            ElMessage({
                type: 'success',
                message: '下架成功'
            })
            getSKU(currentPage.value)
        }
    } else {
        let res = await reqOnSale((row.id as number))
        if (res.code == 200) {
            ElMessage({
                type: 'success',
                message: '上架成功'
            })
            getSKU(currentPage.value)
        }
    }
}
//查看商品详情
let skuInfo = ref<SkuAddData>({})
const findSKU = async (row: SkuAddData) => {
    show.value = true
    let res: SkuInfoData = await reqGetSKUInfo(row.id as number)
    if (res.code == 200) {
        skuInfo.value = res.data
    }
}

//删除商品
const deleteBtn = async (row: SkuAddData) => {
    let res: any = await reqDeleteSKU(row.id as number)
    if (res.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        getSKU(records.value.length > 1 ? currentPage.value : currentPage.value - 1)
    } else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        })
    }
}

</script>

<style lang="scss" scoped>
.el-row {
    margin: 12px 0;

    .el-tag {
        margin: 5px 5px;
    }
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}
</style>