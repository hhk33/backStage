<template>
    <el-card>
        <el-form :inline="true" class="form">
            <el-form-item label="职位搜索">
                <el-input placeholder="请你输入搜索职位关键字"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default">搜索</el-button>
                <el-button size="default">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin: 10px 0px;">
        <el-button type="primary" size="default" icon="Plus">添加职位</el-button>
        <el-table border style="margin: 10px 0px;">
            <el-table-column type="index" align="center" label="#"></el-table-column>
            <el-table-column label="ID" align="center" prop="id"></el-table-column>
            <el-table-column label="职位名称" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
            <el-table-column label="创建世间" align="center" show-overflow-tooltip prop="createTime"></el-table-column>
            <el-table-column label="更新时间" align="center" show-overflow-tooltip prop="updateTime"></el-table-column>
            <el-table-column label="操作" width="280px" align="center">
                <!-- row:已有的职位对象 -->
                <template #="{ row }">
                    <el-button type="primary" size="small" icon="User">分配权限</el-button>
                    <el-button type="primary" size="small" icon="Edit">编辑</el-button>
                    <el-popconfirm :title="`你确定要删除${row.roleName}?`" width="260px" @confirm="">
                        <template #reference>
                            <el-button type="primary" size="small" icon="Delete">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 8, 10]"
            :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="20" @current-change="pageChange"
            @size-change="sizeChange" />
    </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let pageNo = ref<number>(1)
let pageSize = ref<number>(3)

const pageChange = () => {

}
const sizeChange = () => {

}
</script>

<style scoped></style>