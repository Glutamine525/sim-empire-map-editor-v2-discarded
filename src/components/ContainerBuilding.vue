<template>
    <div @mousedown="clickTest">
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
            @update:enter-range="onMouseEnter"
            @update:leave-range="onMouseLeave"
        ></building>
        <container-building-range ref="range" v-bind="buildingRange" />
    </div>
</template>

<script>
import Vue from "vue";
import { BuildingFixed } from "./../constants/building-fixed";
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
                let chessboard = Vue.prototype.chessboard;
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
                // if (chessboard[li - 1][co].occupied) {
                //     v.borderBottom = false;
                //     config.borderTop = false;
                // } else if (chessboard[li + 1][co].occupied) {
                //     v.borderTop = false;
                //     config.borderBottom = false;
                // } else if (chessboard[li][co - 1].occupied) {
                //     v.borderRight = false;
                //     config.borderLeft = false;
                // } else if (chessboard[li][co + 1].occupied) {
                //     v.borderLeft = false;
                //     config.borderRight = false;
                // }
            }
            this[catagory].push(config);
            this.$emit("update:create-building", config);
        },
        drawFixedBuilding(woodNum, type) {
            woodNum -= 3;
            let that = this;
            BuildingFixed[type][woodNum].map(function (v) {
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
                    text: BuildingFixed[`text_${type}`],
                    color: "var(--color-black)",
                    background: BuildingFixed[`color_${type}`],
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
            // console.log(
            //     this.$refs.range.isInRange(
            //         60,
            //         53,
            //         this.buildingRange.originLi,
            //         this.buildingRange.originCo,
            //         this.buildingRange.width,
            //         this.buildingRange.height,
            //         this.buildingRange.range
            //     )
            // );
        },
        onMouseLeave(event) {
            this.buildingRange.show = false;
        },
        onChangeWoodNum(woodNum) {
            this.water = [];
            this.mountain = [];
            this.tree = [];
            this.road = [];
            this.building = [];
            this.drawFixedBuilding(woodNum, "water");
            this.drawFixedBuilding(woodNum, "mountain");
            this.drawFixedBuilding(woodNum, "tree");
            this.drawFixedBuilding(woodNum, "road");
            this.drawFixedBuilding(woodNum, "stone");
            this.drawFixedBuilding(woodNum, "copper");
            this.drawFixedBuilding(woodNum, "wood");
            this.drawFixedBuilding(woodNum, "clay");
            this.drawFixedBuilding(woodNum, "wharf");
        },
        onChangeCivil(civil) {
            this.building = this.building.filter(function (v) {
                return v.isFixed;
            });
        },
        clickTest(event) {
            console.log(event.path);
        },
    },
    mounted() {
        this.createBuilding("building", true, {
            line: 57,
            column: 57,
            width: 3,
            height: 3,
            range: 4,
            text: "永和",
            color: "black",
            background: "red",
            borderWidth: 1,
            borderColor: "var(--color-border-base)",
        });
        this.createBuilding("building", true, {
            line: 60,
            column: 57,
            width: 6,
            height: 3,
            range: 6,
            text: "值",
            color: "black",
            background: "red",
            borderWidth: 1,
            borderColor: "var(--color-border-base)",
        });
        this.createBuilding("building", true, {
            line: 57,
            column: 60,
            width: 3,
            height: 3,
            range: 7,
            text: "test",
            color: "black",
            background: "red",
            borderWidth: 1,
            borderColor: "var(--color-border-base)",
        });
    },
};
</script>

<style lang="scss" scoped>
</style>