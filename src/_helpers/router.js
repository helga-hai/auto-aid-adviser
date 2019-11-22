import Vue from 'vue';
import Router from 'vue-router';

import HomePublic from '../views/HomePublic';
import CabinetPage from '../views/CabinetPage';
import LoginPage from '../views/LoginPage';

import RegisterPage from '../views/RegisterPage';
import AuthorizationPage from '../views/AuthorizationPage';
import SuccessRegister from '../views/SuccessRegister';

import MapPage from '../views/Map';
import AboutPage from '../views/About';

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

        // otherwise redirect to home
        { path: '*', redirect: '/' }
    ]
});

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/authorization', '/login', '/register', '/', '/map', '/about','/successRegister'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    if (authRequired && !loggedIn) {
        return next('/login');
    }

    next();
});