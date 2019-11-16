import Vue from 'vue'
import App from './App.vue'
//import router from './router.js'
//import store from './store'

import { store } from './_store';
import { router } from './_helpers';
// setup fake backend
//import { configureFakeBackend } from './_helpers';
//configureFakeBackend();

import Axios from 'axios';
import * as VueGoogleMaps from 'vue2-google-maps';

// Vue.component('GmapMap', VueGoogleMaps.gmapApi);
// Vue.component('GmapMarker', VueGoogleMaps.Marker);

// import { ElementFactory } from 'vue2-google-maps';
// Vue.component('ground-overlay', MapElementFactory({
//         mappedProps: {
//             'opacity': {}
//         },
//         props: {
//             'source': { type: String },
//             'bounds': { type: Object },
//         },
//         events: ['click', 'dblclick'],
//         name: 'groundOverlay',
//         ctr: () => google.maps.GroundOverlay,
//         ctrArgs: (options, { source, bounds }) => [source, bounds, options],
//     }))

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
        libraries: 'places, directions, drawing',
        load: false //To use a pre-loaded Google Maps API https://github.com/xkjyeah/vue-google-maps/wiki/vue-google-maps-FAQ
    }
    //// If you intend to programmatically custom event listener code
    //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
    //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
    //// you might need to turn this on.
    // autobindAllEvents: false,

    //// If you want to manually install components, e.g.
    //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
    //// Vue.component('GmapMarker', GmapMarker)
    //// then disable the following:
    // installComponents: true,
});
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')