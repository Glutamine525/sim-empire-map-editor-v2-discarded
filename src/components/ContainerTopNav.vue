<template>
    <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="15" class="resize-element">
            <div class="splitter"></div>
            <label>地图类型: </label>
            <select v-model="woodNum" @change="onChangeWoodNum">
                <option
                    v-for="v in woodNumOptions"
                    :key="v"
                    :label="v"
                    :value="v"
                ></option>
            </select>
            <div class="splitter"></div>
            <label>文明: </label>
            <select v-model="civil" @change="onChangeCivil">
                <option
                    v-for="v in civilOptions"
                    :key="v.value"
                    :label="v.label"
                    :value="v.value"
                ></option>
            </select>
            <div class="splitter"></div>
            <label>无木之地: </label>
            <el-switch v-model="isNoWood" @change="onClickNoWood" />
            <div class="splitter"></div>
            <label>暗色模式: </label>
            <el-switch v-model="isDarkMode" @change="onClickDarkMode" />
            <div class="splitter"></div>
            <label>小地图: </label>
            <el-switch v-model="showMiniMap" @change="onClickMiniMap" />
            <div class="splitter"></div>
            <label>旋转地图: </label>
            <el-switch v-model="isRotated" @change="onClickRotateMap" />
        </el-col>
        <el-col :span="4">
            <label class="left"
                >选中坐标:
                <strong class="highlight">{{ selected }}</strong>
            </label>
            <div class="splitter"></div>
            <label class="left"
                >选中操作:
                <strong class="highlight">{{ holding }}</strong>
            </label>
        </el-col>
        <el-col :span="3">
            <div class="right">
                模拟帝国地图编辑器
                <span class="highlight">{{ version }}</span>
            </div>
            <div style="border: 2px solid transparent"></div>
            <div class="right">
                作者:
                <span class="highlight"> 咕噜他命, </span>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import Vue from "vue";
import { LightMode } from "./../constants/light-mode.js";
import { DarkMode } from "./../constants/dark-mode.js";

export default {
    name: "container-top-nav",
    data() {
        return {
            version: "V2.0",
            woodNum: 5,
            civil: "China",
            isNoWood: false,
            isDarkMode: false,
            showMiniMap: true,
            isRotated: false,
            holding: "无",
            woodNumOptions: [5, 4, 3],
            civilOptions: [
                { label: "中国", value: "China" },
                { label: "波斯", value: "Persian" },
                { label: "埃及", value: "Egypt" },
                { label: "希腊", value: "Greece" },
                { label: "阿兹特克", value: "Aztaka" },
            ],
        };
    },
    computed: {
        selected() {
            return "无";
        },
    },
    methods: {
        onChangeWoodNum() {
            Vue.prototype.woodNum = this.woodNum;
            this.$emit("update:wood-num", this.woodNum);
        },
        onChangeCivil() {
            Vue.prototype.civil = this.civil;
            this.$emit("update:civil", this.civil);
        },
        onClickNoWood() {
            Vue.prototype.isNoWood = this.isNoWood;
            this.$emit("update:no-wood", this.isNoWood);
        },
        onClickDarkMode() {
            if (this.isDarkMode) {
                Object.keys(DarkMode).map(function (v) {
                    document.body.style.setProperty(`--${v}`, DarkMode[v]);
                });
            } else {
                Object.keys(LightMode).map(function (v) {
                    document.body.style.setProperty(`--${v}`, LightMode[v]);
                });
            }
            this.$emit("update:dark-mode", this.isDarkMode);
        },
        onClickMiniMap() {
            // if (this.showMiniMap) {
            //     console.log(this.showMiniMap);
            // } else {
            //     console.log(this.showMiniMap);
            // }
        },
        onClickRotateMap() {
            // if (this.isRotated) {
            //     console.log(this.isRotated);
            // } else {
            //     console.log(this.isRotated);
            // }
        },
    },
    mounted() {
        const resizeObserver = new ResizeObserver((entries) => {
            let height = 0;
            for (let entry of entries) {
                height = entry.contentRect.height;
            }
            height += 20;
            if (height < 40) height = 40;
            this.$emit("update:top-height", `${height}px`);
        });
        resizeObserver.observe(document.querySelector(".resize-element"));
    },
};
</script>

<style lang="scss" scoped>
.el-row {
    transition: width, 1s;
}

.el-col > * {
    height: 100%;
    margin: auto 0;
    line-height: 1;
    font-size: 14px;
    color: $color-primary-text;
    transition: color, background 0.3s;
}

.splitter {
    border: 8px solid transparent;
    display: inline;
    height: 100%;
}

select {
    height: 20px !important;
    border-radius: 15px;
    background: $color-background-base;
}

.left {
    font-size: 14px;
    color: $color-secondary-text;
    white-space: nowrap;
}

.highlight {
    color: $color-primary-text;
}

.right {
    font-size: 10px;
    color: $color-secondary-text;
    text-align: right;
    margin-right: 20px;
}
</style>