<template>
    <div id="app">
        <container-main></container-main>
    </div>
</template>

<script>
import ContainerMain from "./components/ContainerMain.vue";

export default {
    name: "app",
    components: {
        "container-main": ContainerMain,
    },
};
</script>

<style>
#app {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}

html,
body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
</style>
