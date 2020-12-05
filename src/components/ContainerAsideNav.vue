<template>
    <div style="overflow-y: auto; height: 100%; width: 84px">
        <div style="">
            <el-menu :collapse="true">
                <!-- <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">导航一</span>
                    </template>
                    <el-menu-item-group>
                        <span slot="title">分组一</span>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                        <span slot="title">选项4</span>
                        <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航二</span>
                </el-menu-item>
                <el-menu-item index="3" disabled>
                    <i class="el-icon-document"></i>
                    <span slot="title">导航三</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title">导航四</span>
                </el-menu-item> -->
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">导航一</span>
                    </template>
                    <el-menu-item-group>
                        <span slot="title">分组一</span>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                        <span slot="title">选项4</span>
                        <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu>
                </el-submenu>

                <el-submenu
                    v-for="(item, index) in buildingCatagory"
                    :key="item"
                    :index="index"
                >
                    <template slot="title">
                        <img :src="'./img/' + item + '.png'" />
                        <span slot="title">{{ item }}</span>
                    </template>
                    <el-menu-item-group :title="item">
                        <el-menu-item :index="index + '-1'">{{
                            item
                        }}</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </div>
    </div>
</template>

<script>
import { LabelText } from "./../constants/label-text.js";

export default {
    name: "container-aside-nav",
    data() {
        return {
            buildingCatagory: LabelText.building_catagory,
        };
    },
    methods: {},
};
</script>

<style lang="scss">
// .el-menu-item div {
//     padding: 0 14px !important;
// }

// .el-menu-item img {
//     width: 36px;
//     height: 36px;
//     margin: auto;
// }
</style>