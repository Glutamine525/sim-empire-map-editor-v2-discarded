<template>
    <div>
        <building
            v-for="(item, index) in water"
            :key="'water-' + index"
            v-bind="item"
        ></building>
        <building
            v-for="(item, index) in mountain"
            :key="'mountain-' + index"
            v-bind="item"
        ></building>
        <building
            v-for="(item, index) in tree"
            :key="'tree-' + index"
            v-bind="item"
        ></building>
        <building
            v-for="(item, index) in road"
            :key="'road-' + index"
            v-bind="item"
        ></building>
        <building
            v-for="(item, index) in building"
            :key="'building-' + index"
            v-bind="item"
            @update:enter-range="onMouseEnter($event)"
            @update:leave-range="onMouseLeave($event)"
        ></building>
        <container-building-range v-bind="buildingRange" />
    </div>
</template>

<script>
import { FixedBuilding } from "./../fixed-building";
import Building from "./Building.vue";
import ContainerBuildingRange from "./ContainerBuildingRange.vue";

export default {
    name: "ContainerBuilding",
    components: {
        ContainerBuildingRange,
        Building,
    },
    data() {
        return {
            water: [],
            mountain: [],
            tree: [],
            road: [],
            building: [],
            buildingRange: {
                show: false,
                originLi: 0,
                originCo: 0,
                width: 0,
                height: 0,
                range: 0,
            },
        };
    },
    methods: {
        createBuilding(catagory, checkBorder, config) {
            if (checkBorder) {
                let li = config.line;
                let co = config.column;
                for (let v of this[catagory]) {
                    if (li - v.line === 1 && co === v.column) {
                        v.borderBottom = false;
                        config.borderTop = false;
                    } else if (li - v.line === -1 && co === v.column) {
                        v.borderTop = false;
                        config.borderBottom = false;
                    } else if (co - v.column === 1 && li === v.line) {
                        v.borderRight = false;
                        config.borderLeft = false;
                    } else if (co - v.column === -1 && li === v.line) {
                        v.borderLeft = false;
                        config.borderRight = false;
                    }
                }
            }
            this[catagory].push(config);
        },
        drawFixedBuilding(woodNum, type) {
            woodNum -= 3;
            let that = this;
            FixedBuilding[type][woodNum].map(function (v) {
                let unit = v.split("-");
                if (unit.length < 3) unit.push(1);
                if (unit.length < 4) unit.push(unit[2]);
                let targetArr =
                    "water|mountain|tree|road".split("|").indexOf(type) > -1
                        ? type
                        : "building";
                that.createBuilding(targetArr, true, {
                    line: +unit[0],
                    column: +unit[1],
                    width: +unit[2],
                    height: +unit[3],
                    range: 0,
                    isFixed: true,
                    isRoad: type === "road",
                    text: FixedBuilding[`text_${type}`],
                    color: "var(--color-black)",
                    background: FixedBuilding[`color_${type}`],
                    borderWidth: 1,
                    borderColor: "var(--color-border-base)",
                });
            });
        },
        onMouseEnter(event) {
            this.buildingRange.show = true;
            this.buildingRange.originLi = event.li;
            this.buildingRange.originCo = event.co;
            this.buildingRange.width = event.w;
            this.buildingRange.height = event.h;
            this.buildingRange.range = event.r;
        },
        onMouseLeave(event) {
            this.buildingRange.show = false;
        },
    },
    mounted() {
        let that = this;
        this.drawFixedBuilding(5, "water");
        this.drawFixedBuilding(5, "mountain");
        this.drawFixedBuilding(5, "tree");
        this.drawFixedBuilding(5, "road");
        this.drawFixedBuilding(5, "stone");
        this.drawFixedBuilding(5, "copper");
        this.drawFixedBuilding(5, "wood");
        this.drawFixedBuilding(5, "clay");
        this.drawFixedBuilding(5, "wharf");
        this.createBuilding("building", true, {
            line: 57,
            column: 57,
            width: 3,
            height: 3,
            range: 4,
            text: "test",
            color: "black",
            background: "black",
            borderWidth: 1,
            borderColor: "var(--color-border-base)",
        });
        this.createBuilding("building", true, {
            line: 60,
            column: 57,
            width: 6,
            height: 3,
            range: 6,
            text: "test",
            color: "black",
            background: "black",
            borderWidth: 1,
            borderColor: "var(--color-border-base)",
        });
        this.createBuilding("building", true, {
            line: 57,
            column: 60,
            width: 3,
            height: 3,
            range: 0,
            text: "test",
            color: "black",
            background: "black",
            borderWidth: 1,
            borderColor: "var(--color-border-base)",
        });
    },
};
</script>

<style lang="scss" scoped>
</style>