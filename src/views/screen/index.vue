<template>
    <div class="container">
        <div class="screen" ref="screen">
            <div class="top">
                <Top />
            </div>
            <div class="bottom">
                <div class="left">
                    <Tourist class="tourist" />
                    <Sex class="sex" />
                    <Age class="age" />
                </div>
                <div class="center">
                    <Map class="map" />
                    <Line class="line" />
                </div>
                <div class="right">
                    <Rank class="rank" />
                    <Year class="year" />
                    <Couter class="couter" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Top from './componemts/top/index.vue'
import Tourist from './componemts/tourist/index.vue'
import Sex from './componemts/sex/index.vue'
import Age from './componemts/age/index.vue'
import Map from './componemts/map/index.vue'
import Line from './componemts/line/index.vue'
import Rank from './componemts/rank/index.vue'
import Year from './componemts/year/index.vue'
import Couter from './componemts/couter/index.vue'

let screen = ref()

//数据大屏的缩放比例
const getScale = (w = 1920, h = 1080) => {
    let ww = window.innerWidth / w
    let wh = window.innerHeight / h
    console.log('缩放比例')
    return ww < wh ? ww : wh
}

onMounted(() => {
    screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
})

window.onresize = () => {
    screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
}
</script>

<style lang="scss" scoped>
.container {
    width: 100vw;
    height: 100vh;
    background: url(./images/bg.png) no-repeat;
    background-size: cover;

    .screen {
        position: fixed;
        width: 1980px;
        height: 1080px;
        top: 50%;
        left: 50%;
        transform-origin: left top;

        .top {
            width: 100%;
            height: 40px;
        }

        .bottom {
            display: flex;
            height: 1040px;

            .right {
                flex: 1;
                display: flex;
                flex-direction: column;

                .rank {
                    flex: 1.2;
                    margin-left: 0;
                    margin-right: 0;
                }

                .year {
                    flex: 1;
                    margin-left: 0;
                    margin-right: 0;
                }

                .couter {
                    flex: 1;
                    margin-left: 0;
                    margin-right: 0;
                }
            }

            .left {
                flex: 1;
                display: flex;
                flex-direction: column;

                .tourist {
                    flex: 1.2;
                }

                .sex {
                    flex: 1;
                }

                .age {
                    flex: 1;
                }

            }

            .left>*,
            .right>* {
                margin-top: 15px;
            }

            .center {
                flex: 2;
                display: flex;
                flex-direction: column;

                .map {
                    flex: 2.1;
                }

                .line {
                    flex: 1;
                }
            }
        }
    }
}
</style>