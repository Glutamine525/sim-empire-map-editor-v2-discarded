<template>
    <el-container>
        <el-header :height="heightHeader">
            <container-top-nav
                ref="top"
                @update:top-height="onChangeTopNavHeight"
                @update:wood-num="onChangeWoodNum"
                @update:civil="onChangeCivil"
                @update:no-wood="onClickNoWood"
                @update:dark-mode="onClickDarkMode"
                :style="{ '--content-height': heightHeader }"
            />
        </el-header>
        <el-container>
            <el-aside
                :width="widthAside"
                :style="{ 'margin-top': heightHeader }"
            >
                <container-aside-nav
                    ref="aside"
                    @update:select-building="onSelectBuilding"
                />
            </el-aside>
            <el-main
                :style="{
                    top: heightHeader,
                    left: widthAside,
                }"
            >
                <container-chessboard ref="chessboard" />
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import Vue from "vue";
import { BuildingFixed } from "./../constants/building-fixed.js";
import ContainerTopNav from "./ContainerTopNav.vue";
import ContainerAsideNav from "./ContainerAsideNav.vue";
import ContainerChessboard from "./ContainerChessboard.vue";

export default {
    name: "container-maian",
    props: {},
    components: {
        ContainerTopNav,
        ContainerAsideNav,
        ContainerChessboard,
    },
    data() {
        return {
            heightHeader: "40px",
            widthAside: "64px",
        };
    },
    watch: {},
    methods: {
        onChangeTopNavHeight(event) {
            this.heightHeader = event;
            let num = +event.substring(0, event.length - 2);
            this.$refs.chessboard.$refs[
                "building-container"
            ].heightHeader = num;
        },
        onChangeWoodNum(woodNum) {
            Vue.prototype.operation = "null";
            Vue.prototype.holding = {};
            this.onSelectBuilding(["无"]);
            this.$refs.chessboard.$refs["building-container"].onChangeWoodNum(
                woodNum
            );
        },
        onChangeCivil(civil) {
            Vue.prototype.operation = "null";
            Vue.prototype.holding = {};
            this.onSelectBuilding(["无"]);
            this.$refs.aside.onChangeCivil(civil);
            this.$refs.chessboard.$refs["building-container"].onChangeCivil(
                civil
            );
        },
        onClickNoWood(isNoWood) {
            let containerBuilding = this.$refs.chessboard.$refs[
                "building-container"
            ];
            if (isNoWood) {
                for (let i = containerBuilding.tree.length - 1; i >= 0; i--) {
                    containerBuilding.deleteBuilding(
                        containerBuilding.tree[i].line,
                        containerBuilding.tree[i].column,
                        true,
                        "tree"
                    );
                }
            } else {
                BuildingFixed.tree[this.woodNum - 3].map(function (v) {
                    let unit = v.split("-");
                    containerBuilding.createBuilding(
                        "tree",
                        true,
                        {
                            line: +unit[0],
                            column: +unit[1],
                            width: 1,
                            height: 1,
                            range: 0,
                            isFixed: true,
                            isBarrier: true,
                            barrierType: "tree",
                            text: "",
                            color: "var(--color-black)",
                            background: BuildingFixed.color_tree,
                            borderWidth: 1,
                            borderColor: "var(--color-border-base)",
                        },
                        true
                    );
                });
            }
        },
        onClickDarkMode(isDarkMode) {
            this.$refs.aside.onClickDarkMode(isDarkMode);
            this.$refs.chessboard.onClickDarkMode(isDarkMode);
        },
        onSelectBuilding(indexPath) {
            this.$refs.top.holding = indexPath.join("-");
            this.$refs.chessboard.$refs[
                "building-container"
            ].isPreviewing = false;
        },
    },
    mounted() {
        this.$refs.top.woodNum = 5;
        this.$refs.top.onChangeWoodNum();
        this.$refs.top.civil = "China";
        this.$refs.top.onChangeCivil();
        // this.$refs.top.isNoWood = true;
        // this.$refs.top.onClickNoWood();
        this.$refs.top.isDarkMode = false;
        this.$refs.top.onClickDarkMode();
        // this.$refs.top.showMiniMap = true;
        // this.$refs.top.onClickMiniMap();
        // this.$refs.top.isRotated = false;
        // this.$refs.top.onClickRotateMap();
        let that = this;
        document.onkeydown = function (e) {
            switch (e.code) {
                case "Space":
                    e.preventDefault();
                    that.$refs.aside.onSelect("取消操作", ["取消操作"]);
                    break;
                default:
                    // console.log(e);
                    break;
            }
        };
    },
};
</script>

<style lang="scss" scoped>
.el-header {
    background-color: $color-background-base;
    margin: 0;
    padding: 0;
    position: fixed;
    width: 100%;
    border-bottom: 1px solid $color-border-base;
    box-shadow: 3px 3px 5px $color-border-base;
    transition: color, background 0.3s;
}

.el-header * {
    height: var(--content-height);
}

.el-aside {
    background-color: $color-background-base;
    margin: 0;
    padding: 0;
    position: fixed;
    height: 100%;
    border-right: 1px solid $color-border-base;
    box-shadow: 3px 3px 5px $color-border-base;
    overflow: hidden;
    padding-bottom: 45px;
    transition: color, background 0.3s;
}

.el-main {
    background-color: $color-background-darker;
    margin: 0;
    padding: 32px;
    position: absolute;
    z-index: -1;
    transition: color, background 0.3s;
}
</style>
