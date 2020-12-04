<template>
    <div>
        <div v-for="li in 116" :key="li" class="line">
            <div
                v-for="co in 116"
                :key="co"
                :id="li + '-' + co"
                class="cell"
                :class="assignClass(li, co)"
            ></div>
            <br />
        </div>
    </div>
</template>

<script>
export default {
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
        document.getElementById("1-60").classList.add("angle-top");
        document.getElementById("60-1").classList.add("angle-left");
        document.getElementById("61-1").classList.add("angle-left0");
        document.getElementById("57-116").classList.add("angle-right");
        document.getElementById("116-57").classList.add("angle-bottom");
    },
};
</script>

<style lang="scss" scoped>
.line {
    line-height: 0px;
    white-space: nowrap;
}

.cell {
    width: 30px;
    height: 30px;
    border: 1px solid black;
    background: $color-background-base;
    display: inline-block;
    box-sizing: border-box;
}

.cornor {
    background: $color-background-lighter;
    border: 0;
}

.boundary {
    background: $color-black;
    border: 0;
    position: relative;
    z-index: 5;
}

.top-left::before {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    border-left: 20px solid $color-background-lighter;
    border-bottom: 20px solid transparent;
}

.top-left::after {
    position: absolute;
    top: 20px;
    right: 30px;
    content: "";
    border-top: 10px solid transparent;
    border-right: 10px solid $color-black;
}

.bottom-right::before {
    position: absolute;
    top: 10px;
    left: 10px;
    content: "";
    border-top: 20px solid transparent;
    border-right: 20px solid $color-background-lighter;
}

.bottom-right::after {
    position: absolute;
    top: 30px;
    left: 0;
    content: "";
    border-right: 10px solid transparent;
    border-top: 10px solid $color-black;
}

.top-right::before {
    position: absolute;
    top: 0;
    right: 0;
    content: "";
    border-right: 20px solid $color-background-lighter;
    border-bottom: 20px solid transparent;
}

.top-right::after {
    position: absolute;
    top: 20px;
    right: -10px;
    content: "";
    border-right: 10px solid transparent;
    border-bottom: 10px solid $color-black;
}

.bottom-left::before {
    position: absolute;
    top: 10px;
    left: 0px;
    content: "";
    border-right: 20px solid transparent;
    border-bottom: 20px solid $color-background-lighter;
}

.bottom-left::after {
    position: absolute;
    top: 30px;
    left: 20px;
    content: "";
    border-right: 10px solid $color-black;
    border-bottom: 10px solid transparent;
}

.angle-top {
    position: relative;
}

.angle-top::after {
    position: absolute;
    top: 20px;
    left: 0;
    content: "";
    border-right: 10px solid transparent;
    border-bottom: 10px solid $color-black;
    z-index: 6;
}

.angle-top::before {
    position: absolute;
    top: 0;
    left: -20px;
    content: "";
    border-right: 20px solid $color-background-lighter;
    border-bottom: 20px solid transparent;
    z-index: 6;
}

.angle-right {
    position: relative;
}

.angle-right::before {
    position: absolute;
    top: 30px;
    left: 10px;
    content: "";
    border-right: 20px solid $color-background-lighter;
    border-bottom: 20px solid transparent;
    z-index: 6;
}

.angle-bottom {
    position: relative;
}

.angle-bottom::before {
    position: absolute;
    top: 10px;
    left: 30px;
    content: "";
    border-right: 20px solid transparent;
    border-bottom: 20px solid $color-background-lighter;
    z-index: 6;
}

.angle-bottom::after {
    position: absolute;
    top: 30px;
    left: 30px;
    content: "";
    border: 5px solid $color-background-lighter;
    z-index: 6;
}

.angle-left {
    position: relative;
}

.angle-left::before {
    position: absolute;
    top: -20px;
    left: 0;
    content: "";
    border-right: 30px solid $color-black;
    border-bottom: 30px solid $color-background-lighter;
    z-index: 6;
}

.angle-left::after {
    position: absolute;
    top: -20px;
    left: 0;
    content: "";
    border-left: 10px solid $color-background-lighter;
    border-bottom: 10px solid $color-black;
    z-index: 6;
}

.angle-left0 {
    position: relative;
}

.angle-left0::before {
    position: absolute;
    top: -60px;
    left: -10px;
    content: "";
    border-right: 30px solid transparent;
    border-bottom: 30px solid $color-background-lighter;
    z-index: 6;
}
</style>
