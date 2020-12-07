import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.js";
import config from "./util/config.js";

Vue.config.productionTip = false;

Vue.use(config);

Vue.prototype.civil = "China";
Vue.prototype.woodNum = 5;

new Vue({
    render: (h) => h(App),
}).$mount("#app");
