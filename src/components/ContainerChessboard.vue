<template>
    <div>
        <div v-for="i in 116" :key="i" class="line">
            <div
                v-for="j in 116"
                :key="j"
                :id="i + '-' + j"
                class="cell"
                :style="{
                    top: i * 30 + 'px',
                    left: j * 30 + 'px',
                }"
            ></div>
            <br />
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style  scoped>
.line {
    line-height: 0px;
    white-space: nowrap;
}

.cell {
    width: 30px;
    height: 30px;
    border: 1px solid black;
    background: #e9eef3;
    display: inline-block;
    position: inherit;
    box-sizing: border-box;
}

a {
    color: inherit;
}
</style>
