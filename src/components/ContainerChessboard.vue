<template>
    <div class="chessboard-container">
        <canvas
            :width="length * 30"
            :height="length * 30"
            id="cell-canvas"
        ></canvas>
        <container-biulding
            ref="building-container"
            class="building-container"
        ></container-biulding>
    </div>
</template>

<script>
import Vue from "vue";
import ContainerBiulding from "./ContainerBuilding.vue";
import { LightMode } from "./../constants/light-mode.js";
import { DarkMode } from "./../constants/dark-mode.js";

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
        isCorner(li, co) {
            if (li + co < this.halfLength + 2) return true;
            if (li + co > this.halfLength * 3) return true;
            if (li < co - this.halfLength) return true;
            if (li > co + this.halfLength) return true;
            return false;
        },
        isBoundary(li, co) {
            let result = false;
            if (li + co === this.halfLength + 2) result = "top-left";
            if (li + co === this.halfLength * 3) result = "bottom-right";
            if (li === co - this.halfLength) result = "top-right";
            if (li === co + this.halfLength) result = "bottom-left";
            if (li === 1 && co === this.halfLength + 1) result = "angle-top";
            if (li === this.halfLength && co === this.halfLength * 2)
                result = "angle-right";
            if (li === this.halfLength * 2 && co === this.halfLength)
                result = "angle-bottom";
            if (li === this.halfLength + 1 && co === 1) result = "angle-left";
            return result;
        },
        isInRange(li, co) {
            if (li + co <= this.halfLength + 2) return false;
            if (li + co >= this.halfLength * 3) return false;
            if (li <= co - this.halfLength) return false;
            if (li >= co + this.halfLength) return false;
            return true;
        },
        onClickDarkMode(isDarkMode) {
            if (isDarkMode) {
                this.drawCell(
                    DarkMode["color-border-darker"],
                    DarkMode["color-black"]
                );
            } else {
                this.drawCell(
                    LightMode["color-border-darker"],
                    LightMode["color-black"]
                );
            }
        },
        drawCell(borderColor, boundaryColor) {
            let canvas = document.getElementById("cell-canvas");
            let ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, 116 * 30, 116 * 30);
            ctx.lineWidth = 1;
            ctx.strokeStyle = borderColor;
            ctx.fillStyle = boundaryColor;
            for (let li = 1; li <= this.length; li++) {
                for (let co = 1; co <= this.length; co++) {
                    if (this.isInRange(li, co)) {
                        ctx.strokeRect((co - 1) * 30, (li - 1) * 30, 30, 30);
                    }
                    let boundary = this.isBoundary(li, co);
                    switch (boundary) {
                        case "top-left":
                            ctx.moveTo((co - 1) * 30 - 10, li * 30);
                            ctx.lineTo(co * 30, li * 30);
                            ctx.lineTo(co * 30, (li - 1) * 30 - 10);
                            ctx.fill();
                            break;
                        case "top-right":
                            ctx.moveTo((co - 1) * 30, (li - 1) * 30 - 10);
                            ctx.lineTo((co - 1) * 30, li * 30);
                            ctx.lineTo(co * 30 + 10, li * 30);
                            ctx.fill();
                            break;
                        case "bottom-left":
                            ctx.moveTo((co - 1) * 30 - 10, (li - 1) * 30);
                            ctx.lineTo(co * 30, (li - 1) * 30);
                            ctx.lineTo(co * 30, li * 30 + 10);
                            ctx.fill();
                            break;
                        case "bottom-right":
                            ctx.moveTo((co - 1) * 30, li * 30 + 10);
                            ctx.lineTo((co - 1) * 30, (li - 1) * 30);
                            ctx.lineTo(co * 30 + 10, (li - 1) * 30);
                            ctx.fill();
                            break;
                        case "angle-top":
                            ctx.moveTo(co * 30, li * 30);
                            ctx.lineTo((co - 1) * 30, li * 30);
                            ctx.lineTo((co - 1) * 30, li * 30 - 10);
                            ctx.lineTo(co * 30 - 15, li * 30 - 25);
                            ctx.lineTo(co * 30, li * 30 - 10);
                            ctx.fill();
                            break;
                        case "angle-right":
                            ctx.moveTo((co - 1) * 30, li * 30);
                            ctx.lineTo((co - 1) * 30, (li - 1) * 30);
                            ctx.lineTo((co - 1) * 30 + 10, (li - 1) * 30);
                            ctx.lineTo(co * 30 - 5, li * 30 - 15);
                            ctx.lineTo((co - 1) * 30 + 10, li * 30);
                            ctx.fill();
                            break;
                        case "angle-bottom":
                            ctx.moveTo((co - 1) * 30, (li - 1) * 30);
                            ctx.lineTo(co * 30, (li - 1) * 30);
                            ctx.lineTo(co * 30, (li - 1) * 30 + 10);
                            ctx.lineTo(co * 30 - 15, li * 30 - 5);
                            ctx.lineTo((co - 1) * 30, (li - 1) * 30 + 10);
                            ctx.fill();
                            break;
                        case "angle-left":
                            ctx.moveTo(co * 30, li * 30);
                            ctx.lineTo(co * 30, (li - 1) * 30);
                            ctx.lineTo(co * 30 - 10, (li - 1) * 30);
                            ctx.lineTo(co * 30 - 25, li * 30 - 15);
                            ctx.lineTo(co * 30 - 10, li * 30);
                            ctx.fill();
                            break;
                    }
                }
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.building-container {
    width: 3480px;
    height: 3480px;
    position: absolute;
    top: 32px;
    left: 32px;
}
</style>
