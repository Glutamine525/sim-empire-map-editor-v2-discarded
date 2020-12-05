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
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
}

html,
body {
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
}
</style>
