<template>
    <el-form label-width="100px">
        <el-form-item label="SPU名称">
            <el-input placeholder="SKU名称" v-model="skuParams.skuName"></el-input>
        </el-form-item>
        <el-form-item label="价格(元)">
            <el-input placeholder="价格(元)" type="number" v-model="skuParams.price"></el-input>
        </el-form-item>
        <el-form-item label="重量(g)">
            <el-input placeholder="重量(g)" type="number" v-model="skuParams.weight"></el-input>
        </el-form-item>
        <el-form-item label="SPU描述">
            <el-input placeholder="SKU描述" type="textarea" v-model="skuParams.skuDesc"></el-input>
        </el-form-item>
        <el-form-item label="平台属性">
            <el-form :inline="true" label-width="80px">
                <el-form-item v-for="item in attrList" :key="item.id" :label="item.attrName">
                    <el-select v-model="item.attrIdAndValueId">
                        <el-option :value="`${item.id}:${attr.id}`" v-for="attr in item.attrValueList" :key="attr.id"
                            :label="attr.valueName"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="销售属性">
            <el-form :inline="true" label-width="80px">
                <el-form-item v-for="item in saleAttr" :key="item.id" :label="item.saleAttrName">
                    <el-select v-model="item.saleIdAndValueId">
                        <el-option :value="`${item.id}:${val.id}`" v-for="val in item.spuSaleAttrValueList" :key="val.id"
                            :label="val.saleAttrValueName"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="图片名称">
            <el-table border :data="imgList" ref="table">
                <el-table-column type="selection" width="80px" align="center"></el-table-column>
                <el-table-column label="图片">
                    <template #="{ row }">
                        <img :src="row.imgUrl" alt="" style="width: 100px; height: 100px;">
                    </template>
                </el-table-column>
                <el-table-column label="名称" prop="imgName"></el-table-column>
                <el-table-column label="操作">
                    <template #="{ row }">
                        <el-button @click="handle(row)" type="warning">设置默认</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="saveBtn">保存</el-button>
            <el-button @click="cancelBtn">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import type { SkuAddData, SPUData, SpuImg, SaleAttr, SpuHasImg, SaleAttrResponseData } from '@/api/product/spu/type'
import type { AttrResponseData, Attr } from '@/api/product/attr/type'
import { reqSpuImageList, reqSpuHasSaleAttr, reqAddSKU } from '@/api/product/spu/index'
import { reqAttr } from '@/api/product/attr/index'
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

//取消按钮，返回界面
let $emit = defineEmits(['changeForm'])
const cancelBtn = () => {
    $emit('changeForm', 'update')
}

//照片选择
let imgList = ref<SpuImg[]>([])
//销售属性
let saleAttr = ref<SaleAttr[]>([])
//平台属性
let attrList = ref<Attr[]>([])
let skuParams = reactive<SkuAddData>({
    category3Id: '',
    spuId: '',
    tmId: '',
    skuName: '',
    price: '',
    weight: '',
    skuDefaultImg: '',
    skuDesc: '',
    skuAttrValueList: [],
    skuSaleAttrValueList: [],
})

//初始化数据方法，并对外暴露
const initSKUInfo = async (c1Id: number | string, c2Id: number | string, row: SPUData) => {
    skuParams.category3Id = row.category3Id
    skuParams.spuId = (row.id as string)
    skuParams.tmId = row.tmId
    console.log(skuParams)

    let res1: SpuHasImg = await reqSpuImageList(row.id as number)
    let res2: SaleAttrResponseData = await reqSpuHasSaleAttr(row.id as number)
    let res3: AttrResponseData = await reqAttr(c1Id, c2Id, row.category3Id)

    imgList.value = res1.data
    saleAttr.value = res2.data
    attrList.value = res3.data
}
defineExpose({ initSKUInfo })

//设置默认图片
let table = ref()
const handle = (row: SpuImg) => {
    skuParams.skuDefaultImg = (row.imgUrl as string)
    imgList.value.forEach((item) => {
        table.value.toggleRowSelection(item, false)
    })
    table.value.toggleRowSelection(row, true)
}

const saveBtn = async () => {
    skuParams.skuAttrValueList = attrList.value.reduce((prev: any, next: any) => {
        if (next.attrIdAndValueId) {
            let [attrId, valueId] = next.attrIdAndValueId.split(':')
            prev.push({
                attrId,
                valueId
            })
        }
        return prev
    }, [])
    skuParams.skuSaleAttrValueList = saleAttr.value.reduce((prev: any, next: any) => {
        if (next.saleIdAndValueId) {
            let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':')
            prev.push({
                saleAttrId,
                saleAttrValueId
            })
        }
        return prev
    }, [])

    let res: any = await reqAddSKU(skuParams)
    if (res.code == 200) {
        ElMessage({
            type: 'success',
            message: '添加SKU成功'
        })
        $emit('changeForm', 'update')
    }
    else {
        ElMessage({
            type: 'error',
            message: '添加SKU失败'
        })
    }
}
</script>

<style scoped></style>