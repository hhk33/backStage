<template>
    <div class="box8">
        <div class="top">
            <p class="title">数据统计</p>
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
        radar: {
            // shape: 'circle',
            indicator: [
                { name: '消费', max: 6500 },
                { name: '好感', max: 16000 },
                { name: '出行', max: 30000 },
                { name: '小吃', max: 38000 },
                { name: '爱好', max: 52000 },
                { name: '景点', max: 25000 }
            ]
        },
        series: [
            {
                type: 'radar',
                data: [
                    {
                        value: [4200, 3000, 20000, 35000, 50000, 18000],
                        name: '购物'
                    },
                    {
                        value: [5000, 14000, 28000, 26000, 42000, 21000],
                        name: '吃饭'
                    }
                ]
            }
        ],
        tooltip: {
        }
    })
})
</script>

<style lang="scss" scoped>
.box8 {
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