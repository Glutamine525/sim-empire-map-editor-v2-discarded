<template>
    <div class="chessboard-container">
        <div class="cell-container">
            <div v-for="li in length" :key="li" class="line">
                <div
                    v-for="co in length"
                    :key="co"
                    :id="li + '-' + co"
                    class="cell"
                    :class="assignClass(li, co)"
                ></div>
                <br />
            </div>
        </div>
        <container-biulding
            ref="building-container"
            class="building-container"
            @update:create-building="onCreateBuilding"
        ></container-biulding>
    </div>
</template>

<script>
import Vue from "vue";
import ContainerBiulding from "./ContainerBuilding.vue";

export default {
    name: "container-chessboard",
    components: {
        ContainerBiulding,
    },
    data() {
        return {
            length: 116,
            halfLength: 58,
            chessboard: [],
            lastPreviewSession: "",
        };
    },
    computed: {},
    methods: {
        assignClass(li, co) {
            let c = {};
            if (this.isCorner(li, co)) {
                c.cornor = true;
            }
            let boundary = this.isBoundary(li, co);
            if (boundary) {
                c.boundary = true;
                if (li === 1 && co === this.halfLength + 1) {
                    c["angle-top"] = true;
                } else if (
                    li === this.halfLength &&
                    co === this.halfLength * 2
                ) {
                    c["angle-right"] = true;
                } else if (
                    li === this.halfLength * 2 &&
                    co === this.halfLength
                ) {
                    c["angle-bottom"] = true;
                } else if (li === this.halfLength + 1 && co === 1) {
                    c["angle-left"] = true;
                } else {
                    c[boundary] = true;
                }
            }
            return c;
        },
        isCorner(li, co) {
            if (li + co < this.halfLength + 2) return true;
            if (li + co > this.halfLength * 3) return true;
            if (li < co - this.halfLength) return true;
            if (li > co + this.halfLength) return true;
            return false;
        },
        isBoundary(li, co) {
            if (li + co === this.halfLength + 2) return "top-left";
            if (li + co === this.halfLength * 3) return "bottom-right";
            if (li === co - this.halfLength) return "top-right";
            if (li === co + this.halfLength) return "bottom-left";
            return false;
        },
        isInRange(li, co) {
            if (li + co <= this.halfLength + 2) return false;
            if (li + co >= this.halfLength * 3) return false;
            if (li <= co - this.halfLength) return false;
            if (li >= co + this.halfLength) return false;
            return true;
        },
        onCreateBuilding(event) {
            for (let li = event.line; li < event.line + event.height; li++) {
                for (
                    let co = event.column;
                    co < event.column + event.width;
                    co++
                ) {
                    this.chessboard[li - 1][co - 1].occupied = event;
                }
            }
            // if (event.text)
            //     this.$nextTick(() => {
            //         setTimeout(() => {
            //             console.log(this.getBuilding(event.id));
            //         }, 1);
            //     });
        },
        getBuilding(id) {
            return this.$refs["building-container"].$refs[id][0];
        },
    },
    created() {
        for (let li = 1; li <= this.length; li++) {
            let row = [];
            for (let co = 1; co <= this.length; co++) {
                row.push({
                    isCorner: this.isCorner(li, co),
                    isBoundary: this.isBoundary(li, co) ? true : false,
                });
            }
            this.chessboard.push(row);
        }
        Vue.prototype.chessboard = this.chessboard;
    },
};
</script>

<style lang="scss" scoped>
@import "./../styles/boundary.scss";

.building-container {
    width: 3480px;
    height: 3480px;
    position: absolute;
    top: 32px;
    left: 32px;
}

.line {
    line-height: 0px;
    white-space: nowrap;
}

.cell {
    width: 30px;
    height: 30px;
    border: 1px solid $color-border-base;
    background: $color-background-base;
    display: inline-block;
    box-sizing: border-box;
    z-index: 4;
    position: relative;
}

.cornor {
    background: $color-background-darker;
    border: 0;
}

.boundary {
    background: $color-black;
    border: 0;
    position: relative;
    z-index: 5;
}
</style>
