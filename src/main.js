import Vue from 'vue'
import App from './App.vue'

import { store } from './_store';
import { router } from './_helpers';

import Axios from 'axios';
import * as VueGoogleMaps from 'vue2-google-maps';


Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')