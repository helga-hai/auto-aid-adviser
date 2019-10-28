import Vue from 'vue'
import App from './App.vue'
//import router from './router.js'
//import store from './store'

import { store } from './_store';
import { router } from './_helpers';
// setup fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();

import Axios from 'axios'
import * as VueGoogleMaps from 'vue2-google-maps'
//import GoogleMaps from 'VueGoogleMaps.Map'
//Vue.component('google-map', VueGoogleMaps.Map);
//Vue.component('google-marker', VueGoogleMaps.Marker);
Vue.component('GmapMap', VueGoogleMaps.gmapApi);
Vue.component('GmapMarker', VueGoogleMaps.Marker);
//Vue.component('google-marker', VueGoogleMaps.gmapApi);
console.dir(VueGoogleMaps)
    //Vue.prototype.$http = Axios;

// const token = localStorage.getItem('token');
// if (token) {
//   Vue.prototype.$http.defaults.headers.common['Authorization'] = token
// }

Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
    //key: 'AIzaSyB_nA80Ha1asyGCQtdcgAGZNtd6Vzr8p3A',
    //libraries: 'places, drawing',
    installComponents: true,
    load: {
        region: 'UK',
        language: 'ua',
        key: 'AIzaSyB_nA80Ha1asyGCQtdcgAGZNtd6Vzr8p3A',
        libraries: 'places,directions',
        //load: false //To use a pre-loaded Google Maps API https://github.com/xkjyeah/vue-google-maps/wiki/vue-google-maps-FAQ
    }
});
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')