<template>
    <div class="box5">
        <div class="top">
            <p class="title">未来7天游客量趋势图</p>
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
            //两侧不留白
            boundaryGap: false,
            //分割线
            splitLine: {
                show: false,
            },
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        },
        yAxis: {
            splitLine: {
                show: false
            },
            //轴线的设置
            axisLine: {
                show: true
            },
            //刻度
            axisTick: {
                show: true
            }
        },
        grid: {
            left: 50,
            top: 20,
            right: 20,
            bottom: 20
        },
        //系列
        series: [
            {
                type: 'line',
                data: [220, 240, 606, 1299, 321, 1890, 500],
                //平滑曲线的设置
                smooth: true,
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgb(255, 158, 68)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(255, 70, 131)'
                        }
                    ])
                },
            }
        ]
    })
})
</script>

<style lang="scss" scoped>
.box5 {
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