import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

console.log(Vuex);
Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Vuex)

new Vue({
    render: h => h(App),
}).$mount('#app')