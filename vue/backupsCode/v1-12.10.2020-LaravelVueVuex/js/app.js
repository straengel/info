import vue from "vue";

require('./bootstrap');

import VueRouter from "vue-router";
import router from "./routes";
import {store} from "./store";
//console.log(vuex);
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Index from "./Index";

window.Vue = require('vue');


// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

// Vue.component('example-component', require('./components/ExampleComponent.vue').default);
// Vue.component('form', require('./components/Form.vue').default);

Vue.use(VueRouter);

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

const app = new Vue({
    el: '#app',
    //router: router,
    router,
    store,
    components: {
        "index": Index,
    }

});



