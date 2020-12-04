<template>
    <el-container>
        <el-header :height="heightHeader">
            <ContainerTopNav
                @update:height="heightHeader = $event"
                :style="{ '--content-height': heightHeader }"
            />
        </el-header>
        <el-container>
            <el-aside
                :width="widthAside"
                :style="{ 'margin-top': heightHeader }"
            >
                <ContainerAsideNav />
            </el-aside>
            <el-main
                :style="{
                    top: heightHeader,
                    left: widthAside,
                }"
            >
                <ContainerChessboard />
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import ContainerTopNav from "./ContainerTopNav.vue";
import ContainerAsideNav from "./ContainerAsideNav.vue";
import ContainerChessboard from "./ContainerChessboard.vue";

export default {
    name: "MainContainer",
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
    methods: {},
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
}

.el-main {
    background-color: $color-background-lighter;
    color: #333;
    margin: 0;
    padding: 32px;
    position: absolute;
    z-index: -1;
}
</style>
