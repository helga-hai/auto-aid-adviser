import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store'
import Axios from 'axios'
import * as VueGoogleMaps from 'vue2-google-maps'
//import GoogleMaps from 'VueGoogleMaps.Map'
Vue.component('google-map', VueGoogleMaps.Map);
Vue.component('google-marker', VueGoogleMaps.Marker);
console.log(VueGoogleMaps.Map)
Vue.prototype.$http = Axios;

const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  key: 'AIzaSyB_nA80Ha1asyGCQtdcgAGZNtd6Vzr8p3A',
  libraries: 'places, drawing',
  installComponents: true
});
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')