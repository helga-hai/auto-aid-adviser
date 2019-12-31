import Vue from 'vue';
import Router from 'vue-router';

import HomePublic from '../views/HomePublic';
import CabinetPage from '../views/CabinetPage';
import LoginPage from '../views/LoginPage';

import RegisterPage from '../views/RegisterPage';
import AuthorizationPage from '../views/AuthorizationPage';
import SuccessRegister from '../views/SuccessRegister';

import Activation from '../components/Activation';

import MapPage from '../views/Map';
import AboutPage from '../views/About';
import CreatePage from '../views/CreatePage';
import CreatePage2 from '../views/CreatePage2';
import CreatePage3 from '../views/CreatePage3';
import CreatePage4 from '../views/CreatePage4';
import CreatePage5 from '../views/CreatePage5';




import UserCabPage from '../views/UserCabPage';
import BusinessCabPage from '../views/BusinessCabPage';


import { registration } from '../_store/registration.module';

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        { path: '/', component: HomePublic },
        { path: '/authorization', component: AuthorizationPage },
        { path: '/register', component: RegisterPage },
        { path: '/login', component: LoginPage },
        { path: '/map', component: MapPage },
        { path: '/about', component: AboutPage },
        { path: '/cabinet', component: CabinetPage },
        { path: '/successRegister', component: SuccessRegister },
        { path: '/user/activation', component: Activation },
        { path: '/user/activation/*', redirect: '/user/activation' },
        { path: '/create', component: CreatePage },
        { path: '/create2', component: CreatePage2 },
        { path: '/create3', component: CreatePage3 },
        { path: '/create4', component: CreatePage4 },
        { path: '/create5', component: CreatePage5 },


        //test path
        { path: '/business', component: BusinessCabPage },
        { path: '/user', component: UserCabPage },
        /////////////////////////////////////////////



        // otherwise redirect to home
        { path: '*', redirect: '/' }
    ]
});

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page

    const publicPages = ['/authorization', '/register', '/', '/map', '/about', '/create', '/create2', '/create3', '/create4', '/create5', '/user/activation'];

    const authRequired = !publicPages.includes(to.path);

    // const loggedIn = localStorage.getItem('user');
    const loggedIn = localStorage.getItem('token');

    if (registration.state.status === "success") {
        console.log("hi :" + registration.state.status);
        //router.push({ path: 'home' })
        console.log(router);
        return next();
    } else if (authRequired && !loggedIn && to.path != '/successRegister') {
        // if (to.path == '/successRegister') {
        //     console.log('authRequired && !loggedIn')
        //     return next()
        // } else {
        return next('/');
        //}
    } else

        next();
});