<template>
    <el-form label-width="100px">
        <el-form-item label="SPU名称">
            <el-input placeholder="请输入SPU名称" v-model="SpuParams.spuName"></el-input>
        </el-form-item>
        <el-form-item label="SPU品牌">
            <el-select v-model="SpuParams.tmId">
                <el-option v-for="item in allTradeMark" :key="item.id" :label="item.tmName" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
            <el-input type="textarea" placeholder="请输入描述" v-model="SpuParams.description"></el-input>
        </el-form-item>
        <el-form-item label="SPU照片">
            <el-upload v-model:file-list="imgList" action="/api/admin/product/fileUpload" list-type="picture-card"
                :on-preview="handlePictureCardPreview" :before-upload="handleUpload">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>
            <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%;" />
            </el-dialog>
        </el-form-item>
        <el-form-item label="SPU销售属性">
            <el-select v-model="selectedSaleAttr"
                :placeholder="unSelectSaleAttr.length ? `还未选择${unSelectSaleAttr.length}个` : `无`">
                <el-option v-for="item in unSelectSaleAttr" :key="item.id" :label="item.name"
                    :value="`${item.id}:${item.name}`"></el-option>
            </el-select>
            <el-button @click="addSaleAttr
                " :disabled="selectedSaleAttr == '' ? true : false" type="primary" icon="Plus"
                style="margin-left: 10px;">添加销售属性</el-button>
            <el-table border style="margin:10px 0px" :data="saleAttr">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="销售属性名字" width="120px" prop="saleAttrName"></el-table-column>
                <el-table-column label="销售属性值">
                    <template #="{ row }">
                        <el-tag style="margin: 0 5px;" v-for="(item, index) in row.spuSaleAttrValueList" :key="item.id"
                            closable @close="row.spuSaleAttrValueList.splice(index, 1)">{{
                                item.saleAttrValueName }}</el-tag>
                        <el-input v-if="row.flag" v-model="row.saleAttrValue" placeholder="请输入属性名" style="width: 100px;"
                            size="small" @blur="toLook(row)"></el-input>
                        <el-button v-else type="success" icon="Plus" size="small" @click="row.flag = true"></el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120px">
                    <template #="{ row, $index }">
                        <el-button type="danger" icon="Delete" @click="saleAttr.splice($index, 1)"></el-button>
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
import { ref, computed } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { SPUData } from '@/api/product/spu/type'
import { reqAddOrUpdateSPU, reqGetTrademark, reqSpuImageList, reqSpuHasSaleAttr, reqAllSaleAttr } from '@/api/product/spu/index'
import type { SaleAttrValue, Trademark, AllTradeMark, SpuHasImg, SaleAttrResponseData, HasSaleAttrResponseData, HasSaleAttr, SaleAttr, SpuImg } from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
//对图片进行预览
const handlePictureCardPreview = (uploadFile: any) => {
    dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
}
//图片上传前检查
const handleUpload = (file: any) => {
    console.log(file)
    if (file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/gif') {
        if (file.size / 1024 / 1024 <= 3) {
            return true
        }
        else {
            ElMessage({
                type: 'error',
                message: '图片大小需要小于3MB'
            })
            return false
        }
    }
    else {
        ElMessage({
            type: 'error',
            message: '图片的类型应该为png|jpeg|gif'
        })
        return false
    }
}

//自定义事件，通过取消按钮进行页面切换
let $emit = defineEmits(['changeForm'])
const cancelBtn = () => {
    $emit('changeForm', 'update')
}
//当前场景add||update
let params = ref<string>('')
let allTradeMark = ref<Trademark[]>([])
let imgList = ref<SpuImg[]>([])
let saleAttr = ref<SaleAttr[]>([])
let allSaleAttr = ref<HasSaleAttr[]>([])
let SpuParams = ref<SPUData>({
    spuName: '',
    description: '',
    category3Id: '',
    tmId: '',
    spuSaleAttrList: [],
    spuImageList: [],
})
//接收父组件数据
const initSPUInfo = async (spu: SPUData) => {
    params.value = 'update'
    SpuParams.value = spu;
    let result: AllTradeMark = await reqGetTrademark()
    let result1: SpuHasImg = await reqSpuImageList((spu.id as number))
    let result2: SaleAttrResponseData = await reqSpuHasSaleAttr((spu.id as number))
    let result3: HasSaleAttrResponseData = await reqAllSaleAttr()
    allTradeMark.value = result.data
    saleAttr.value = result2.data
    allSaleAttr.value = result3.data
    imgList.value = result1.data.map(item => {
        return {
            name: item.imgName,
            url: item.imgUrl
        }
    })
}

const initAddSPU = async (category3Id: number | string) => {
    //清除数据
    Object.assign(SpuParams, {
        spuName: '',
        description: '',
        category3Id: '',
        tmId: '',
        spuSaleAttrList: [],
        spuImageList: [],
    })
    SpuParams.value.id = ''
    allSaleAttr.value = []
    allTradeMark.value = []
    selectedSaleAttr.value = ''

    params.value = 'add'
    SpuParams.value.category3Id = category3Id
    let result: AllTradeMark = await reqGetTrademark()
    let result3: HasSaleAttrResponseData = await reqAllSaleAttr()
    allTradeMark.value = result.data
    allSaleAttr.value = result3.data
}
//对外暴露
defineExpose({ initSPUInfo, initAddSPU })

//计算未选择品牌属性
let unSelectSaleAttr = computed(() => {
    let unSelectArr = allSaleAttr.value.filter((item) => {
        return saleAttr.value.every((item1) => {
            return item.name != item1.saleAttrName
        })
    })
    return unSelectArr
})

//存储选择器选择的品牌属性
let selectedSaleAttr = ref<string>('')
//添加品牌属性
const addSaleAttr = () => {
    let [baseSaleAttrId, saleAttrName] = selectedSaleAttr.value.split(':')
    let attr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: []
    }
    saleAttr.value.push(attr)
    selectedSaleAttr.value = ''
}
//属性值输入检查
const toLook = (row: SaleAttr) => {
    let { baseSaleAttrId, saleAttrValue } = row
    let newAttr: SaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: (saleAttrValue as string)
    }
    row.flag = false
    //是否为空
    if (saleAttrValue == undefined || (saleAttrValue as string).trim() == '') {
        ElMessage({
            type: 'error',
            message: '属性值不能为空'
        })
        return
    }
    //是否重复
    let repeat = row.spuSaleAttrValueList.find((item) => {
        return item.saleAttrValueName == saleAttrValue
    })
    if (repeat) {
        ElMessage({
            type: 'error',
            message: '属性值不能重复'
        })
        return
    }
    row.spuSaleAttrValueList.push(newAttr)
    row.saleAttrValue = ''
}
//保存
const saveBtn = async () => {
    SpuParams.value.spuImageList = imgList.value.map((item: any) => {
        return {
            imgName: item.name,
            imgUrl: (item.response && item.response.data) || item.url
        }
    })
    SpuParams.value.spuSaleAttrList = saleAttr.value
    let res = await reqAddOrUpdateSPU(SpuParams.value)
    if (res.code == 200) {
        ElMessage({
            type: 'success',
            message: '保存成功'
        })
        $emit('changeForm', params.value)
    } else {
        ElMessage({
            type: 'error',
            message: '保存失败'
        })
    }
}

</script>

<style scoped></style>