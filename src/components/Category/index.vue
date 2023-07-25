<template>
    <el-card>
        <el-form :inline="true">
            <el-form-item label="一级分类">
                <!-- change:选中值发生变化时触发 -->
                <el-select v-model="categoryStore.c1Id" @change="c1Change" :disabled="!sence">
                    <el-option v-for="c1 in categoryStore.c1" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select v-model="categoryStore.c2Id" @change="c2Change" :disabled="!sence">
                    <el-option v-for="c2 in categoryStore.c2" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select v-model="categoryStore.c3Id" :disabled="!sence">
                    <el-option v-for="c3 in categoryStore.c3" :key="c3.id" :label='c3.name' :value="c3.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useCategoryStore from '@/store/modules/category'

let categoryStore = useCategoryStore()
const getC1 = () => {
    categoryStore.getC1Info()
}

const c1Change = () => {
    categoryStore.c2 = []
    categoryStore.c2Id = ''
    categoryStore.c3 = []
    categoryStore.c3Id = ''
    categoryStore.getC2Info(categoryStore.c1Id)
}

const c2Change = () => {
    categoryStore.c3 = []
    categoryStore.c3Id = ''
    categoryStore.getC3Info(categoryStore.c2Id)
}

defineProps(['sence'])

onMounted(() => {
    getC1()
})
</script>

<style scoped></style>@/store/modules/attr