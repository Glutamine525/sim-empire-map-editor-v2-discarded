<template>
    <div
        class="building"
        :id="id"
        :class="{
            hoverable: isHoverable(),
            'protection-mask': showProtectionMask(),
            preview: isPreview,
        }"
        :style="{
            top: getTop,
            left: getLeft,
            width: getWidth,
            height: getHeight,
            color: color,
            background: background,
            borderWidth: getBorderWidth,
            borderStyle: getBorderStyle,
            borderColor: borderColor,
        }"
        @mousemove="onMouseMove"
        @mouseleave="onMouseLeave"
    >
        <div class="text">{{ text }}</div>
        <span class="marker" v-if="showMarker()">{{ marker }}</span>
    </div>
</template>

<script>
import Vue from "vue";
import { LabelText } from "./../constants/label-text.js";

export default {
    name: "Building",
    data() {
        return {
            // marker: 1,
            showEffect: true,
            protection: {
                // 值: [1],
            },
        };
    },
    props: {
        line: { type: Number, required: true },
        column: { type: Number, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true },
        range: {
            type: Number,
            required: true,
            validator: function (v) {
                return !v || v > 3;
            },
        },
        text: { type: String, required: true },
        color: { type: String, required: true },
        background: { type: String, required: true },
        borderWidth: { type: Number, required: true },
        borderColor: { type: String, required: true },
        id: { type: String, required: false },
        isMiracel: { type: Boolean, required: false, default: false },
        isFixed: { type: Boolean, required: false, default: false },
        isBarrier: { type: Boolean, required: false, default: false },
        isProtection: { type: Boolean, required: false, default: false },
        barrierType: { type: String, required: false, default: "" },
        isRoad: { type: Boolean, required: false, default: false },
        borderTop: { type: Boolean, required: false, default: true },
        borderRight: { type: Boolean, required: false, default: true },
        borderBottom: { type: Boolean, required: false, default: true },
        borderLeft: { type: Boolean, required: false, default: true },
        special: { type: String, required: false },
        isPreview: { type: Boolean, required: false, default: false },
    },
    computed: {
        getTop() {
            return `${(this.line - 1) * 30}px`;
        },
        getLeft() {
            return `${(this.column - 1) * 30}px`;
        },
        getWidth() {
            return `${this.width * 30}px`;
        },
        getHeight() {
            return `${this.height * 30}px`;
        },
        getBorderWidth() {
            return `${this.borderWidth}px `;
        },
        getBorderStyle() {
            let style = "";
            style += this.borderTop ? "solid " : "none ";
            style += this.borderRight ? "solid " : "none ";
            style += this.borderBottom ? "solid " : "none ";
            style += this.borderLeft ? "solid " : "none ";
            return style;
        },
        // isProtection() {
        //     if (
        //         LabelText.protection_building[this.civil].indexOf(this.text) >
        //         -1
        //     ) {
        //         return true;
        //     }
        //     return false;
        // },
        marker() {
            let num = 0;
            if (!this.isRoad) {
                for (let v in this.protection) {
                    num += v.length ? 1 : 0;
                }
            }
            return num;
        },
    },
    methods: {
        setShowEffect(v) {
            this.showEffect = v;
        },
        showMarker() {
            if (this.text === "" && !this.isRoad) return false;
            if (this.marker === 0) return false;
            if (this.isProtection) return false;
            if (this.isMiracel) return false;
            return true;
        },
        showProtectionMask() {
            return this.isProtection && this.showEffect && !this.isPreview;
        },
        isHoverable() {
            return (
                (!this.isFixed || this.text) && !this.isPreview && !this.isRoad
            );
        },
        onMouseMove() {
            if (this.range) {
                this.$emit("update:enter-range", {
                    li: this.line,
                    co: this.column,
                    w: this.width,
                    h: this.height,
                    r: this.range,
                });
            }
        },
        onMouseLeave() {
            if (this.range) {
                this.$emit("update:leave-range", {
                    li: this.line,
                    co: this.column,
                    w: this.width,
                    h: this.height,
                    r: this.range,
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.building {
    position: absolute;
    box-sizing: border-box;
    display: flex;
    font-weight: bold;
    user-select: none;
    z-index: 5;
}

.preview {
    transition: all 0.05s ease-in;
}

.hoverable:hover {
    transform: scale(1.02);
    box-shadow: 0px 0px 10px $color-border-base;
    z-index: 10;
}

.text {
    margin: auto;
    text-shadow: $color-white 0px 1px 10px;
}

.marker {
    font-size: 10px;
    position: absolute;
    left: 2px;
    zoom: 0.75;
    text-shadow: $color-white 0px 1px 5px;
}

@keyframes scale {
    0% {
        transform: scale(0);
    }
    50%,
    75% {
        transform: scale(1.5);
    }
    78%,
    100% {
        opacity: 0;
    }
}

.protection-mask::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    background-color: #ff7373;
    opacity: 0.7;
    z-index: 4;
    border-radius: 50%;
    animation: scale 2s infinite cubic-bezier(0, 0, 0.49, 1.02);
    animation-delay: 300ms;
}
</style>