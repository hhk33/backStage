<template>
    <div class="box">
        <div class="top">
            <p class="title">实时游客统计</p>
            <p class="bg"></p>
            <p class="right">可预约总量<span>99999</span>人</p>
        </div>
        <div class="number">
            <span v-for="(item, index) in people" :key="index">{{ item }}</span>
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
//引入水球图组件
import 'echarts-liquidfill'

//人数设置
let people = ref<string>('219608人')

//绘制水球图
let charts = ref()
onMounted(() => {
    let myEcharts = echarts.init(charts.value)
    myEcharts.setOption({
        series: {
            type: 'liquidFill',
            data: [0.6,0.6],
            radius: '85%'
        }
    })
})
</script>

<style lang="scss" scoped>
.box {
    background: url(../../images/dataScreen-main-lb.png);
    background-size: cover;
    color: white;
    font-size: 20px;

    .top {

        .title {
            margin-top: 20px;
        }

        .bg {
            width: 68px;
            height: 7px;
            margin-top: 10px;
            background: url(../../images/dataScreen-title.png) no-repeat;
        }

        .right {
            float: right;
            font-size: 18px;
            margin: -23px 10px 0 0;

            span {
                color: orange;
            }
        }
    }

    .number {
        margin: 50px 30px 0 30px;
        display: flex;

        span {
            flex: 1;
            height: 40px;
            text-align: center;
            line-height: 40px;
            background: url(../../images/total.png) no-repeat;
            background-size: 100% 100%;
        }
    }

    .charts {
        width: 100%;
        height: 230px;
    }
}
</style>

