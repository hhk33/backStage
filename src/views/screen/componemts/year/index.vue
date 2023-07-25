<template>
    <div class="box7">
        <div class="top">
            <p class="title">年度游客量对比</p>
            <p class="bg"></p>
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'

let charts = ref()
onMounted(() => {
    let myEcharts = echarts.init(charts.value)
    myEcharts.setOption({
        xAxis: {
            type: 'category',
        },
        yAxis: {
        },
        grid: {
            left: 40,
            top: 30,
            right: 20,
            bottom: 30
        },
        series: {
            type: 'scatter',
            data: [33, 88, 21, 9, 88, 234, 113, 231, 674, 3, 88, 33, 21, 888, 332, 313, 123, 5, 657, 7],
            //标记图形设置
            symbol: 'circle',
            symbolSize: 15,
            //图文标签
            label: {
                show: true,
                position: 'top',
                color: 'white'
            },
        }
    })
})
</script>

<style lang="scss" scoped>
.box7 {
    background: url(../../images/dataScreen-main-lb.png);
    background-size: 100% 100%;
    color: white;
    font-size: 20px;
    margin: 5px 30px 0 30px;

    .top {
        .bg {
            width: 68px;
            height: 7px;
            margin-top: 10px;
            background: url(../../images/dataScreen-title.png) no-repeat;
        }
    }

    .charts {
        width: 100%;
        height: 240px;
        margin-top: 25px;
    }
}
</style>