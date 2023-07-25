<template>
    <div class="box2">
        <div class="top">
            <p class="title">年龄比例</p>
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
        tooltip: {
            trigger: 'item'
        },
        legend: {
            right: 60,
            top: 40,
            orient: 'vertical',
            textStyle: {
                color: 'white',
                fontSize: 14
            },
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '80%'],
                left: -120,
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    position: 'inside',
                    color: 'white',
                    formatter: '{d}%'
                },

                labelLine: {
                    show: false
                },
                data: [
                    { value: 118, name: '10岁已下' },
                    { value: 895, name: '10-18岁' },
                    { value: 722, name: '18-30岁' },
                    { value: 643, name: '30-40岁' },
                    { value: 208, name: '40-60岁' },
                    { value: 120, name: '60岁以上' }
                ]
            }
        ]
    })
})

</script>

<style lang="scss" scoped>
.box2 {
    background: url(../../images/dataScreen-main-lb.png);
    background-size: cover;
    color: white;
    font-size: 20px;

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
        height: 260px;
        padding: 20px 0px 0 0;
    }

}
</style>