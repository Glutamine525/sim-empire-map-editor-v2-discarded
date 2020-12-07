<template>
    <div class="aside-nav-container">
        <el-menu
            :collapse="true"
            :background-color="backgroundColor"
            :text-color="textColor"
            :active-text-color="activeTextColor"
            @select="onSelect"
        >
            <el-menu-item index="道路">
                <img :src="'./img/道路.png'" />
                <span slot="title">道路</span>
            </el-menu-item>
            <el-submenu
                v-for="item1 in buildingCatagory"
                :key="item1"
                :index="item1"
                :show-timeout="100"
                :hide-timeout="100"
                popper-class="popper"
            >
                <template slot="title">
                    <img :src="'./img/' + item1 + '.png'" />
                    <span slot="title">{{ item1 }}</span>
                </template>
                <el-menu-item-group :title="item1">
                    <el-menu-item
                        v-for="item2 in buildingInfo[item1]"
                        :key="item2.name"
                        :index="item2.name"
                    >
                        {{ item2.name }}
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item
                v-for="item1 in operationCatagory2"
                :key="item1"
                :index="item1"
            >
                <img :src="'./img/' + item1 + '.png'" />
                <span slot="title">{{ item1 }}</span>
            </el-menu-item>
            <el-submenu
                v-for="item1 in operationCatagory1"
                :key="item1"
                :index="item1"
                :show-timeout="100"
                :hide-timeout="100"
                popper-class="popper"
            >
                <template slot="title">
                    <img :src="'./img/' + item1 + '.png'" />
                    <span slot="title">{{ item1 }}</span>
                </template>
                <el-menu-item-group :title="item1">
                    <el-menu-item
                        v-for="item2 in labelText[item1]"
                        :key="item2"
                        :index="item2"
                    >
                        {{ item2 }}
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
import Vue from "vue";
import { LabelText } from "./../constants/label-text.js";
import { BuildingFixed } from "./../constants/building-fixed.js";
import { BuildingChina } from "./../constants/building-china.js";
import { BuildingPersian } from "./../constants/building-persian.js";
import { BuildingEgypt } from "./../constants/building-egypt.js";
import { BuildingGreece } from "./../constants/building-greece.js";
import { BuildingAztaka } from "./../constants/building-aztaka.js";
import { LightMode } from "./../constants/light-mode.js";
import { DarkMode } from "./../constants/dark-mode.js";

export default {
    name: "container-aside-nav",
    data() {
        return {
            labelText: LabelText,
            buildingCatagory: LabelText.building_catagory,
            operationCatagory: LabelText.operation_catagory,
            backgroundColor: "",
            textColor: "",
            activeTextColor: "",
            civilBuildingMap: {
                China: BuildingChina,
                Persian: BuildingPersian,
                Egypt: BuildingEgypt,
                Greece: BuildingGreece,
                Aztaka: BuildingAztaka,
            },
            buildingInfo: {
                住宅: [],
                农业: [],
                工业: [],
                商业: [],
                市政: [],
                文化: [],
                宗教: [],
                军事: [],
                美化: [],
                奇迹: [],
                通用: [],
            },
        };
    },
    computed: {
        operationCatagory1() {
            let that = this;
            return this.operationCatagory.filter(function (v) {
                return v in that.labelText;
            });
        },
        operationCatagory2() {
            let that = this;
            return this.operationCatagory.filter(function (v) {
                return !(v in that.labelText);
            });
        },
    },
    methods: {
        onClickDarkMode(isDarkMode) {
            if (isDarkMode) {
                this.backgroundColor = DarkMode["color-background-base"];
                this.textColor = DarkMode["color-primary-text"];
                this.activeTextColor = DarkMode["color-primary"];
            } else {
                this.backgroundColor = LightMode["color-background-base"];
                this.textColor = LightMode["color-primary-text"];
                this.activeTextColor = LightMode["color-primary"];
            }
        },
        onChangeCivil(civil) {
            let that = this;
            Object.keys(this.buildingInfo).map(function (v) {
                that.buildingInfo[v] = that.civilBuildingMap[civil][v];
            });
        },
        onSelect(index, indexPath) {
            if (indexPath[0] in this.buildingInfo) {
                this.onSelectBuilding(index, indexPath);
            } else {
                this.onSelectOperation(index, indexPath);
            }
        },
        onSelectOperation(index, indexPath) {
            console.log(index, indexPath);
            switch (index) {
                case "道路":
                    let newHolding = {};
                    newHolding.text = "";
                    newHolding.width = 1;
                    newHolding.height = 1;
                    newHolding.range = 0;
                    newHolding.color = "var(--color-black)";
                    newHolding.background = BuildingFixed.color_road;
                    newHolding.borderColor = "var(--color-border-base)";
                    newHolding.borderWidth = 1;
                    newHolding.isProtection = false;
                    newHolding.isRoad = true;
                    newHolding.isPreview = true;
                    Vue.prototype.operation = "placing-building";
                    Vue.prototype.holding = newHolding;
                    Vue.prototype.holdingSession = new Date().getTime();
                    this.$emit("update:select-building", ["道路"]);
                    break;
                case "取消操作":
                    Vue.prototype.operation = "null";
                    Vue.prototype.holding = {};
                    this.$emit("update:select-building", ["无"]);
                    break;
            }
        },
        onSelectBuilding(index, indexPath) {
            let newHolding = {};
            let selectedBuilding = this.getBuildingInfo(
                this.civil,
                indexPath[0],
                index
            );
            newHolding.text = selectedBuilding.text;
            newHolding.width = selectedBuilding.size;
            newHolding.height = selectedBuilding.size;
            newHolding.range = selectedBuilding.range_size;
            newHolding.color = selectedBuilding.color;
            newHolding.background = selectedBuilding.background_color;
            newHolding.borderColor = selectedBuilding.border_color;
            newHolding.borderWidth = 1;
            newHolding.isPreview = true;
            newHolding.isProtection =
                LabelText.protection_building[this.civil].indexOf(
                    selectedBuilding.text
                ) > -1;
            Vue.prototype.operation = "placing-building";
            Vue.prototype.holding = newHolding;
            Vue.prototype.holdingSession = new Date().getTime();
            this.$emit("update:select-building", indexPath);
        },
        getBuildingInfo(civil, catagory, name) {
            return this.civilBuildingMap[civil][catagory].filter(function (v) {
                return v.name === name;
            })[0];
        },
    },
    mounted() {},
};
</script>

<style lang="scss">
.aside-nav-container {
    overflow-y: auto;
    height: 100%;
    width: 84px;
    transition: color, background 0.3s;
}

.el-tooltip,
.el-submenu__title {
    padding: 0 14px !important;
}

.el-menu-item,
.el-submenu__title {
    height: 51px !important;
    line-height: 51px !important;
}

.el-menu-item img,
.el-submenu__title img {
    width: 36px;
    height: 36px;
    margin: auto;
}

.el-menu--popup {
    box-shadow: 0 2px 12px 0 $color-border-base !important;
    user-select: none;
}
</style>