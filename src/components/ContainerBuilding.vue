<template>
    <div
        @click.left="onMouseClick"
        @mousemove.left="onMouseMove"
        @mousedown.left="isMouseDown = true"
        @mouseup.left="isMouseDown = false"
    >
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
                @update:enter-range="onMouseEnterRange"
                @update:leave-range="onMouseLeaveRange"
            />
        </div>
        <building v-bind="previewBuilding" v-show="isPreviewing" />
        <container-building-range ref="range" v-bind="buildingRange" />
    </div>
</template>

<script>
import Vue from "vue";
import Building from "./Building.vue";
import ContainerBuildingRange from "./ContainerBuildingRange.vue";
import { BuildingFixed } from "./../constants/building-fixed.js";
import { UtilChessboard } from "./../util/chessboard.js";

export default {
    name: "ContainerBuilding",
    components: {
        ContainerBuildingRange,
        Building,
    },
    data() {
        return {
            isMouseDown: false,
            heightHeader: 40,
            water: [],
            mountain: [],
            tree: [],
            road: [],
            building: [],
            cell: [],
            isPreviewing: false,
            lastHoldingSession: "",
            previewBuilding: {
                line: 0,
                column: 0,
                height: 0,
                width: 0,
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
        createBuilding(catagory, checkBorder, config) {
            config.id = this.getID(
                config.line,
                config.column,
                config.width,
                config.height
            );
            if (checkBorder) {
            }
            this[catagory].push(config);
            for (let li = config.line; li < config.line + config.height; li++) {
                for (
                    let co = config.column;
                    co < config.column + config.width;
                    co++
                ) {
                    this.cell[li][co].occupied = config.id;
                }
            }
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
            this.drawFixedBuilding(woodNum, "road");
            this.drawFixedBuilding(woodNum, "stone");
            this.drawFixedBuilding(woodNum, "copper");
            this.drawFixedBuilding(woodNum, "wood");
            this.drawFixedBuilding(woodNum, "clay");
            this.drawFixedBuilding(woodNum, "wharf");
            if (!this.isNoWood) this.drawFixedBuilding(woodNum, "tree");
        },
        onChangeCivil(civil) {
            this.building = this.building.filter(function (v) {
                return v.isFixed;
            });
        },
        onMouseMove(event) {
            let li = Math.ceil((event.pageY - this.heightHeader - 32) / 30);
            let co = Math.ceil((event.pageX - 32 - 64) / 30);
            if (
                (event.path[0].className === "building-container" ||
                    event.path[0].className.indexOf("preview") !== -1 ||
                    event.path[1].className.indexOf("preview") !== -1) &&
                this.operation === "placing-building"
            ) {
                let offsetLi = Math.floor(
                    (this.previewBuilding.height - 1) / 2
                );
                let offsetCo = Math.floor((this.previewBuilding.width - 1) / 2);
                if (this.lastHoldingSession != this.holdingSession) {
                    let holding = this.holding;
                    offsetLi = Math.floor((holding.height - 1) / 2);
                    offsetCo = Math.floor((holding.width - 1) / 2);
                    holding.line = li - offsetLi;
                    holding.column = co - offsetCo;
                    this.previewBuilding = holding;
                }
                this.isPreviewing = true;
                this.previewBuilding.line = li - offsetLi;
                this.previewBuilding.column = co - offsetCo;
                const pb = this.previewBuilding;
                const cell = this.cell;
                for (let i = pb.line; i < pb.line + pb.height; i++) {
                    for (let j = pb.column; j < pb.column + pb.width; j++) {
                        if (!UtilChessboard.isInRange(this.$length, i, j)) {
                            this.isPreviewing = false;
                            return;
                        } else if (cell[i][j].occupied) {
                            this.isPreviewing = false;
                            return;
                        }
                    }
                }
            } else {
                this.isPreviewing = false;
            }
            if (this.isMouseDown) {
                this.onMouseClick();
            }
        },
        onMouseClick() {
            if (this.operation === "placing-building" && this.isPreviewing) {
                let config = Object.assign({}, this.previewBuilding);
                config.isPreview = false;
                if (config.isRoad) this.createBuilding("road", false, config);
                else this.createBuilding("building", false, config);
            }
        },
    },
    created() {
        for (let i = 0; i <= this.$length; i++) {
            let row = [];
            for (let j = 0; j <= this.$length; j++) {
                row.push({
                    inRange: UtilChessboard.isInRange(this.$length, i, j),
                });
            }
            this.cell.push(row);
        }
    },
    mounted() {},
};
</script>

<style lang="scss" scoped>
</style>