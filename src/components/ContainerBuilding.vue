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
        <building v-bind="previewBuildingInfo" v-show="isPreviewing" />
        <container-building-range ref="range" v-bind="buildingRange" />
    </div>
</template>

<script>
import Vue from "vue";
import Building from "./Building.vue";
import ContainerBuildingRange from "./ContainerBuildingRange.vue";
import { BuildingFixed } from "./../constants/building-fixed.js";
import { UtilChessboard } from "./../util/chessboard.js";
import { LabelText } from "./../constants/label-text.js";

export default {
    name: "ContainerBuilding",
    components: {
        ContainerBuildingRange,
        Building
    },
    data() {
        return {
            protectionBuilding: LabelText.protection_building,
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
            previewBuildingInfo: {
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
                isPreview: true
            },
            buildingRange: {
                show: false,
                originLi: 0,
                originCo: 0,
                width: 0,
                height: 0,
                range: 0
            }
        };
    },
    methods: {
        getLi(pageY) {
            return Math.ceil((pageY - this.heightHeader - 32) / 30);
        },
        getCo(pageX) {
            return Math.ceil((pageX - 32 - 64) / 30);
        },
        initCell() {
            this.cell = [];
            for (let i = 0; i <= this.$length; i++) {
                let row = [];
                for (let j = 0; j <= this.$length; j++) {
                    row.push({
                        inRange: UtilChessboard.isInRange(this.$length, i, j)
                    });
                }
                this.cell.push(row);
            }
            window.cell = this.cell;
        },
        getID(line, column, width, height) {
            if (width === height) return `${line}-${column}-${width}`;
            else return `${line}-${column}-${width}-${height}`;
        },
        createBuilding(catagory, checkBorder, config) {
            let { line, column, width, height } = config;
            config.id = this.getID(line, column, width, height);
            config.marker = 0;
            if (checkBorder) {
            }
            this[catagory].push(config);
            let protectionRecord = [];
            for (let li = line; li < line + height; li++) {
                for (let co = column; co < column + width; co++) {
                    this.cell[li][co].occupied = config.id;
                    this.cell[li][co].isRoad = config.isRoad;
                    if (
                        config.isRoad ||
                        config.isBarrier ||
                        config.isProtection
                    )
                        continue;
                    for (let v of this.protectionBuilding[this.civil]) {
                        if (
                            v in this.cell[li][co] &&
                            protectionRecord.indexOf(v) === -1
                        ) {
                            protectionRecord.push(v);
                        }
                    }
                }
            }
            config.marker = protectionRecord.length;
            if (config.isProtection) {
                let range = config.range;
                let buildingRecord = [];
                for (let li = line - range; li < line + height + range; li++) {
                    for (
                        let co = column - range;
                        co < column + width + range;
                        co++
                    ) {
                        if (
                            UtilChessboard.isInBuildingRange(
                                li,
                                co,
                                line,
                                column,
                                width,
                                height,
                                range
                            )
                        ) {
                            let c = this.cell[li][co];
                            let text = config.text;
                            let id = config.id;
                            if (c[text]) {
                                c[text].push(id);
                            } else {
                                c[text] = [id];
                            }
                            if (!c.occupied) continue;
                            let b = this.building.find(function(v) {
                                return v.id === c.occupied;
                            });
                            if (!b || b.isProtection) continue;
                            if (buildingRecord.indexOf(b) === -1) {
                                buildingRecord.push(b);
                            }
                        }
                    }
                }
                this.updateBuildingMarker(buildingRecord);
            }
        },
        updateBuildingMarker(buildings) {
            for (let v of buildings) {
                let protectionRecord = [];
                for (let li = v.line; li < v.line + v.height; li++) {
                    for (let co = v.column; co < v.column + v.width; co++) {
                        for (let w of this.protectionBuilding[this.civil]) {
                            if (
                                w in this.cell[li][co] &&
                                protectionRecord.indexOf(w) === -1
                            ) {
                                protectionRecord.push(w);
                            }
                        }
                    }
                }
                v.marker = protectionRecord.length;
            }
        },
        deleteBuilding(li, co) {
            let id = this.cell[li][co].occupied;
            if (this.operation !== "deleting-building" || !id) return;
            let b;
            let index;
            let type;
            if (this.cell[li][co].isRoad) type = "road";
            else type = "building";
            index = this[type].findIndex(function(v) {
                return v.id === id;
            });
            b = this[type][index];
            if (!b || b.isFixed) return;
            for (let i = b.line; i < b.line + b.height; i++) {
                for (let j = b.column; j < b.column + b.width; j++) {
                    delete this.cell[i][j].occupied;
                }
            }
            this[type].splice(index, 1);
        },
        placeBuilding() {
            if (this.operation === "placing-building" && this.isPreviewing) {
                let config = Object.assign({}, this.previewBuildingInfo);
                config.isPreview = false;
                this.isPreviewing = false;
                if (config.isRoad) this.createBuilding("road", false, config);
                else this.createBuilding("building", false, config);
            }
        },
        drawFixedBuilding(woodNum, type) {
            woodNum -= 3;
            let that = this;
            BuildingFixed[type][woodNum].map(function(v) {
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
                    borderColor: "var(--color-border-base)"
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
        onMouseLeaveRange() {
            this.buildingRange.show = false;
        },
        onChangeWoodNum(woodNum) {
            this.initCell();
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
            window.building = this.building;
        },
        onChangeCivil() {
            Vue.prototype.operation = "deleting-building";
            for (let i = this.building.length - 1; i >= 0; i--) {
                this.deleteBuilding(
                    this.building[i].line,
                    this.building[i].column
                );
            }
            for (let i = this.road.length - 1; i >= 0; i--) {
                this.deleteBuilding(this.road[i].line, this.road[i].column);
            }
            Vue.prototype.operation = "null";
            window.building = this.building;
        },
        onMouseMove(event) {
            let li = this.getLi(event.pageY);
            let co = this.getCo(event.pageX);
            if (
                (event.path[0].className === "building-container" ||
                    event.path[0].className.indexOf("preview") !== -1 ||
                    event.path[1].className.indexOf("preview") !== -1) &&
                this.operation === "placing-building"
            ) {
                let offsetLi = Math.floor(
                    (this.previewBuildingInfo.height - 1) / 2
                );
                let offsetCo = Math.floor(
                    (this.previewBuildingInfo.width - 1) / 2
                );
                if (this.lastHoldingSession != this.holdingSession) {
                    let holding = this.holding;
                    offsetLi = Math.floor((holding.height - 1) / 2);
                    offsetCo = Math.floor((holding.width - 1) / 2);
                    holding.line = li - offsetLi;
                    holding.column = co - offsetCo;
                    this.previewBuildingInfo = holding;
                }
                this.isPreviewing = true;
                this.previewBuildingInfo.line = li - offsetLi;
                this.previewBuildingInfo.column = co - offsetCo;
                const pb = this.previewBuildingInfo;
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
            if (!this.isMouseDown) return;
            this.onMouseClick(event);
            this.deleteBuilding(li, co);
        },
        onMouseClick(event) {
            let li = this.getLi(event.pageY);
            let co = this.getCo(event.pageX);
            this.placeBuilding();
            this.deleteBuilding(li, co);
        }
    },
    created() {},
    mounted() {}
};
</script>

<style lang="scss" scoped>
</style>