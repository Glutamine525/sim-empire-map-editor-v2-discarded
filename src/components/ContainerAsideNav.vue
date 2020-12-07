<template>
    <div class="aside-nav-container">
        <el-menu
            :collapse="true"
            :background-color="backgroundColor"
            :text-color="textColor"
            :active-text-color="activeTextColor"
            @select="onSelectBuilding"
        >
            <el-submenu
                v-for="item1 in buildingCatagory"
                :key="item1"
                :index="item1"
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
        </el-menu>
    </div>
</template>

<script>
import Vue from "vue";
import { LabelText } from "./../constants/label-text.js";
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
            buildingCatagory: LabelText.building_catagory,
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

.el-submenu__title {
    padding: 0 14px !important;
}

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