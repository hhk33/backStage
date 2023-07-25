<template>
    <div class="box6">
        <div class="top">
            <p class="title">热门景区排行</p>
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
            //图形图标在x轴均匀分布展示
            type: 'category',
        },
        yAxis: {},
        grid: {
            left: 40,
            right: 20,
            top: 20,
            bottom: 25
        },
        series: [
            {
                type: 'bar',
                data: [10, 20, 30, 40, 50, 60, 70],
                //柱状图的:图形上的文本标签，
                label: {
                    show: true,
                    position: 'insideTop',
                    color: 'blue'
                },
                //是否显示背景颜色
                showBackground: true,
                //柱条的样式
                itemStyle: {
                    borderRadius: [3, 3, 0, 0],
                    //柱条颜色
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#83bff6' },
                        { offset: 0.5, color: '#188df0' },
                        { offset: 1, color: '#188df0' }
                    ])
                }
            },
            {
                type: 'line',
                data: [10, 20, 30, 40, 50, 60, 90],
                smooth: true,//平滑曲线
            },
        ],
        tooltip: {
            backgroundColor: 'rgba(50,50,50,0.7)'
        }
    })
})
</script>

<style lang="scss" scoped>
.box6 {
    background: url(../../images/dataScreen-main-lb.png);
    background-size: 100% 100%;
    color: white;
    font-size: 20px;
    margin: 5px 30px 0 30px;

    .top {
        margin-top: 20px;

        .bg {
            width: 68px;
            height: 7px;
            margin-top: 10px;
            background: url(../../images/dataScreen-title.png) no-repeat;
        }
    }

    .charts {
        width: 100%;
        height: 280px;
        margin-top: 25px;
    }
}
</style>