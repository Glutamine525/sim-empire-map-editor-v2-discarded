<template>
    <div class="chessboard-container">
        <canvas
            :width="$length * 30"
            :height="$length * 30"
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
import { UtilChessboard } from "./../util/chessboard.js";
import { LightMode } from "./../constants/light-mode.js";
import { DarkMode } from "./../constants/dark-mode.js";

export default {
    name: "container-chessboard",
    components: {
        ContainerBiulding,
    },
    data() {
        return {
            halfLength: 58,
            chessboard: [],
            lastPreviewSession: "",
        };
    },
    computed: {},
    methods: {
        onClickDarkMode(isDarkMode) {
            if (isDarkMode) {
                this.drawCell(DarkMode["color-border-darker"]);
            } else {
                this.drawCell(LightMode["color-border-darker"]);
            }
        },
        drawCell(borderColor) {
            let length = this.$length;
            let canvas = document.getElementById("cell-canvas");
            let ctx = canvas.getContext("2d");
            let offset = 0.5;
            ctx.lineWidth = 1;
            ctx.strokeStyle = borderColor;
            for (let li = 1; li <= length; li++) {
                for (let co = 1; co <= length; co++) {
                    if (UtilChessboard.isInRange(length, li, co)) {
                        ctx.clearRect(
                            co * 30 - 30 + offset,
                            li * 30 - 30 + offset,
                            29,
                            29
                        );
                        ctx.strokeRect(
                            co * 30 - 30 + offset,
                            li * 30 - 30 + offset,
                            29,
                            29
                        );
                    }
                }
            }
        },
        drawBoundary(boundaryColor) {
            let length = this.$length;
            let canvas = document.getElementById("cell-canvas");
            let ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, length * 30, length * 30);
            ctx.fillStyle = boundaryColor;
            for (let li = 1; li <= length; li++) {
                for (let co = 1; co <= length; co++) {
                    let boundary = UtilChessboard.isBoundary(length, li, co);
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
    mounted() {
        this.drawBoundary("black");
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
