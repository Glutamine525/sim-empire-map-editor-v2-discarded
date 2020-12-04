<template>
    <div id="app">
        <ContainerMain></ContainerMain>
    </div>
</template>

<script>
import ContainerMain from "./components/ContainerMain.vue";

export default {
    name: "app",
    components: {
        ContainerMain,
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
