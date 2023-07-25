<template>
    <div class="box1">
        <div class="top">
            <p class="title">实时游客统计</p>
            <p class="bg"></p>
        </div>
        <div class="sex">
            <div class="man">
                <span>男士</span>
                <img src="../../images/man.png" alt="">
            </div>
            <div class="woman">
                <span>女士</span>
                <img src="../../images/woman.png" alt="">
            </div>
        </div>
        <div class="rate">
            <p>男士 58%</p>
            <p>女士 42%</p>
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
            show: false,
            min: 0,
            max: 100,
        },
        yAxis: {
            show: false,
            type: 'category'
        },
        series: [
            {
                type: 'bar',
                data: [58],
                z: 100,
                barWidth: 20,
                barGap: '-100%',
                itemStyle: {
                    borderRadius: 20
                }
            },
            {
                type: 'bar',
                data: [100],
                barWidth: 20,
                barGap: '-100%',
                itemStyle: {
                    color: 'pink',
                    borderRadius: 20
                }
            }
        ]
    })
})
</script>

<style lang="scss" scoped>
.box1 {
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

    .sex {
        display: flex;
        justify-content: center;
        padding-top: 20px;

        .man {
            margin: 25px 40px;
            width: 111px;
            height: 115px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: url(../../images/man-bg.png);
            background-size: 100% 100%;
        }

        .woman {
            margin: 25px 40px;
            width: 111px;
            height: 115px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: url(../../images/woman-bg.png);
            background-size: 100% 100%;
        }

        span {
            font-size: 16px;
            margin: -15px 0 15px 0;
        }
    }

    .rate {
        display: flex;
        justify-content: center;

        p {
            margin: 0 40px;
        }
    }

    .charts {
        width: 100%;
        height: 70px;
    }
}
</style>
