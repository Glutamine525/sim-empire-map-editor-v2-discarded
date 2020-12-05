<template>
    <div>
        <div class="cell-container">
            <div v-for="li in 116" :key="li" class="line">
                <div
                    v-for="co in 116"
                    :key="co"
                    :id="'cell-' + li + '-' + co"
                    class="cell"
                    :class="assignClass(li, co)"
                ></div>
                <br />
            </div>
        </div>
        <container-biulding
            ref="building"
            class="building-container"
        ></container-biulding>
    </div>
</template>

<script>
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
        };
    },
    methods: {
        assignClass(li, co) {
            let c = {};
            if (this.isCorner(li, co)) {
                c.cornor = true;
            }
            let boundary = this.isBoundary(li, co);
            if (boundary) {
                c.boundary = true;
                c[boundary] = true;
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
    },
    mounted() {
        document.getElementById("cell-1-60").classList.add("angle-top");
        document.getElementById("cell-60-1").classList.add("angle-left");
        document.getElementById("cell-61-1").classList.add("angle-left0");
        document.getElementById("cell-57-116").classList.add("angle-right");
        document.getElementById("cell-116-57").classList.add("angle-bottom");
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
