<template>
    <el-container>
        <el-header :height="heightHeader">
            <container-top-nav
                @update:top-height="heightHeader = $event"
                @update:no-wood="onClickNoWood($event)"
                :style="{ '--content-height': heightHeader }"
            />
        </el-header>
        <el-container>
            <el-aside
                :width="widthAside"
                :style="{ 'margin-top': heightHeader }"
            >
                <container-aside-nav ref="aside" />
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
        onClickNoWood(isNoWood) {
            let containerBuilding = this.$refs.chessboard.$refs.building;
            if (isNoWood) {
                containerBuilding.tree = [];
            } else {
                coord_barrier_tree[2].map(function (v) {
                    let unit = v.split("-");
                    containerBuilding.createBuilding("tree", true, {
                        line: +unit[0],
                        column: +unit[1],
                        width: 1,
                        height: 1,
                        range: 0,
                        isBarrier: true,
                        text: "",
                        color: "red",
                        background: color_tree,
                        borderWidth: 1,
                        borderColor: "var(--color-border-base)",
                    });
                });
            }
        },
    },
    mounted() {},
};
</script>

<style lang="scss" scoped>
.el-header {
    background-color: $color-background-base;
    color: #333;
    margin: 0;
    padding: 0;
    position: fixed;
    width: 100%;
    border-bottom: 1px solid $color-border-base;
    box-shadow: 3px 3px 5px $color-border-base;
}

.el-header * {
    height: var(--content-height);
}

.el-aside {
    background-color: $color-background-base;
    color: #333;
    margin: 0;
    padding: 0;
    position: fixed;
    height: 100%;
    border-right: 1px solid $color-border-base;
    box-shadow: 3px 3px 5px $color-border-base;
    overflow: hidden;
    padding-bottom: 45px;
}

.el-main {
    background-color: $color-background-darker;
    color: #333;
    margin: 0;
    padding: 32px;
    position: absolute;
    z-index: -1;
}
</style>
