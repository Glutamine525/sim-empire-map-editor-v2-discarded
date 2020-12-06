<template>
    <div @mousedown="clickTest">
        <div class="barrier">
            <building
                v-for="(item, index) in water"
                :key="'water-' + index"
                v-bind="item"
            />
            <building
                v-for="(item, index) in mountain"
                :key="'mountain-' + index"
                v-bind="item"
            />
            <building
                v-for="(item, index) in tree"
                :key="'tree-' + index"
                v-bind="item"
            />
        </div>
        <div class="road">
            <building
                v-for="(item, index) in road"
                :key="'road-' + index"
                v-bind="item"
            />
        </div>
        <div class="buildings">
            <building
                v-for="(item, index) in building"
                :key="'building-' + index"
                v-bind="item"
                :ref="item.id"
                @update:enter-range="onMouseEnterRange"
                @update:leave-range="onMouseLeaveRange"
            />
        </div>
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
            lastPreviewSession: "",
            isPreviewing: false,
            previewBuilding: {
                line: 0,
                height: 0,
                width: 0,
                height: 0,
                range: 0,
                text: "",
                color: "#000000",
                background: "#ffffff",
                borderWidth: 1,
                borderColor: "#000000",
                isPreview: true,
            },
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
        getID(line, column, width, height) {
            if (width === height) return `${line}-${column}-${width}`;
            else return `${line}-${column}-${width}-${height}`;
        },
        getBuilding(id) {
            return this.$refs[id][0];
        },
        createBuilding(catagory, checkBorder, config) {
            config.id = this.getID(
                config.line,
                config.column,
                config.width,
                config.height
            );
            if (checkBorder) {
                let li = config.line;
                let co = config.column;
                let chessboard = Vue.prototype.chessboard;
                let target = chessboard[li - 2][co - 1].occupied;
                if (
                    target &&
                    target.isBarrier &&
                    config.isBarrier &&
                    target.barrierType === config.barrierType
                ) {
                    target.borderBottom = false;
                    config.borderTop = false;
                }
                target = chessboard[li][co - 1].occupied;
                if (
                    target &&
                    target.isBarrier &&
                    config.isBarrier &&
                    target.barrierType === config.barrierType
                ) {
                    target.borderTop = false;
                    config.borderBottom = false;
                }
                target = chessboard[li - 1][co - 2].occupied;
                if (
                    target &&
                    target.isBarrier &&
                    config.isBarrier &&
                    target.barrierType === config.barrierType
                ) {
                    target.borderRight = false;
                    config.borderLeft = false;
                }
                target = chessboard[li - 1][co].occupied;
                if (
                    target &&
                    target.isBarrier &&
                    config.isBarrier &&
                    target.barrierType === config.barrierType
                ) {
                    target.borderLeft = false;
                    config.borderRight = false;
                }
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
                let catagory =
                    "water|mountain|tree|road".split("|").indexOf(type) > -1
                        ? type
                        : "building";
                let isBarrier =
                    catagory !== "building" && catagory !== "road"
                        ? true
                        : false;
                let barrierType =
                    catagory !== "building" && catagory !== "road" ? type : "";
                that.createBuilding(catagory, true, {
                    line: +unit[0],
                    column: +unit[1],
                    width: +unit[2],
                    height: +unit[3],
                    range: 0,
                    isFixed: true,
                    isBarrier: isBarrier,
                    barrierType: barrierType,
                    isRoad: type === "road",
                    text: BuildingFixed[`text_${type}`],
                    color: "var(--color-black)",
                    background: BuildingFixed[`color_${type}`],
                    borderWidth: 1,
                    borderColor: "var(--color-border-base)",
                });
            });
        },
        onMouseEnterRange(event) {
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
        onMouseLeaveRange(event) {
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
                line: 57,
                column: 60,
                width: 3,
                height: 6,
                range: 7,
                text: "test",
                color: "black",
                background: "red",
                borderWidth: 1,
                borderColor: "var(--color-border-base)",
            });
        },
    },
    mounted() {},
};
</script>

<style lang="scss" scoped>
</style>