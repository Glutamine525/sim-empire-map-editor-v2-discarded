<template>
    <div
        class="building"
        :id="getID"
        :class="{ hoverable: !isFixed || text }"
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
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
    >
        <div class="text">{{ text }}</div>
        <span class="protection" v-if="showMarker()">{{ marker }}</span>
    </div>
</template>

<script>
export default {
    name: "Building",
    data() {
        return {
            // marker: 1,
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
        range: { type: Number, required: true },
        isProtection: { type: Boolean, required: false, default: false },
        isMiracel: { type: Boolean, required: false, default: false },
        isFixed: { type: Boolean, required: false, default: false },
        isRoad: { type: Boolean, required: false, default: false },
        text: { type: String, required: true },
        color: { type: String, required: true },
        background: { type: String, required: true },
        borderWidth: { type: Number, required: true },
        borderColor: { type: String, required: true },
        borderTop: { type: Boolean, required: false, default: true },
        borderRight: { type: Boolean, required: false, default: true },
        borderBottom: { type: Boolean, required: false, default: true },
        borderLeft: { type: Boolean, required: false, default: true },
        special: { type: String, required: false },
    },
    computed: {
        getID() {
            if (this.width == this.height)
                return `${this.line}-${this.column}-${this.width}`;
            else
                return `${this.line}-${this.column}-${this.width}-${this.height}`;
        },
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
        showMarker() {
            if (this.text === "" && !this.isRoad) return false;
            if (this.marker === 0) return false;
            if (this.isProtection) return false;
            if (this.isMiracel) return false;
            return true;
        },
        onMouseEnter() {
            if (!this.range) return;
            this.$emit("update:enter-range", {
                li: this.line,
                co: this.column,
                w: this.width,
                h: this.height,
                r: this.range,
            });
        },
        onMouseLeave() {
            if (!this.range) return;
            this.$emit("update:leave-range", {
                li: this.line,
                co: this.column,
                w: this.width,
                h: this.height,
                r: this.range,
            });
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

.hoverable:hover {
    transform: scale(1.02);
    box-shadow: 0px 0px 10px $color-border-base;
    z-index: 10;
}

.text {
    margin: auto;
    text-shadow: $color-white 0px 1px 10px;
}

.protection {
    font-size: 10px;
    position: absolute;
    left: 2px;
    zoom: 0.75;
    text-shadow: $color-white 0px 1px 5px;
}
</style>