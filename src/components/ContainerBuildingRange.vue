<template>
    <transition name="el-fade-in-linear">
        <div
            class="building-range-container"
            v-show="show"
            :style="{
                top: getTop,
                left: getLeft,
                width: getWidth,
                height: getHeight,
            }"
        >
            <div
                v-for="li in range * 2 + height"
                :key="'range-' + li"
                class="range-row"
            >
                <div
                    v-for="co in range * 2 + width"
                    :key="'range-' + li + '-' + co"
                    class="range-cell"
                    :class="{ 'range-cell-hide': hideCell(li, co) }"
                ></div>
            </div>
        </div>
    </transition>
</template>

<script>
import { UtilChessboard } from "./../util/chessboard.js";

export default {
    name: "container-building-range",
    props: {
        show: { type: Boolean, required: true },
        originLi: { type: Number, required: true },
        originCo: { type: Number, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true },
        range: { type: Number, required: true },
    },
    computed: {
        diff() {
            return this.range - 4;
        },
        getTop() {
            return `${(this.originLi - 1 - this.range) * 30}px`;
        },
        getLeft() {
            return `${(this.originCo - 1 - this.range) * 30}px`;
        },
        getWidth() {
            return `${(this.width + this.range * 2) * 30}px`;
        },
        getHeight() {
            return `${(this.height + this.range * 2) * 30}px`;
        },
    },
    methods: {
        hideCell(li, co) {
            li -= this.range + 1;
            co -= this.range + 1;
            return (
                !UtilChessboard.isInBuildingRange(
                    li,
                    co,
                    0,
                    0,
                    this.width,
                    this.height,
                    this.range
                ) ||
                !UtilChessboard.isInRange(
                    this.$length,
                    this.originLi + li,
                    this.originCo + co
                )
            );
        },
    },
};
</script>

<style lang="scss" scoped>
.building-range-container {
    position: absolute;
    box-sizing: border-box;
    z-index: 8;
}

.range-row {
    z-index: 9;
    line-height: 0px;
    white-space: nowrap;
}

.range-cell {
    z-index: 9;
    width: 30px;
    height: 30px;
    display: inline-block;
    background: #00ff007f;
}

.range-cell-hide {
    background: transparent;
}
</style>