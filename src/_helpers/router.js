import Vue from 'vue';
import Router from 'vue-router';

import HomePublic from '../views/HomePublic';
import Cabinet from '../views/Cabinet';
import LoginPage from '../views/LoginPage';

import RegisterPage from '../views/RegisterPage';
import AuthorizationPage from '../views/AuthorizationPage';
import SuccessRegister from '../views/SuccessRegister';

import Activation from '../components/Activation';

import MapPage from '../views/Map';
import AboutPage from '../views/About';
import NotFound from '../views/NotFound'
import SearchPublic from '../views/SearchPublic';
// import CreatePage from '../views/CreatePage';
// import CreatePage2 from '../views/CreatePage2';
// import CreatePage3 from '../views/CreatePage3';
// import CreatePage4 from '../views/CreatePage4';
// import CreatePage5 from '../views/CreatePage5';
// import AddObject from '../components/business/AddObject';




import UserCabPage from '../views/UserCabPage';
// import BusinessCabPage from '../views/BusinessCabPage';
import UserProfileReadyPage from '../views/UserProfileReadyPage';


import { registration } from '../_store/registration.module';

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    //base: '/', // __dirname,
    routes: [
        { path: '/', component: HomePublic, name: "HomePublic", },
        { path: '/authorization', component: AuthorizationPage },
        { path: '/register', component: RegisterPage },
        { path: '/login', component: LoginPage },
        { path: '/map', component: MapPage },
        { path: '/about', component: AboutPage },
        { path: '/cabinet', component: Cabinet },
        { path: '/successRegister', component: SuccessRegister },
        { path: '/user/activation', component: Activation },
        { path: '/user/activation/*', redirect: '/user/activation' },
<<<<<<< HEAD
        { path: '/404', component: NotFound },  
=======
        // { path: '/404', component: NotFound },  
>>>>>>> 27ab89530bd7f5a67ae6c2343f618569e77216dd
        { path: '*', redirect: '/404' }, 
        // { path: '/create', component: CreatePage },
        // { path: '/create2', component: CreatePage2 },
        // { path: '/create3', component: CreatePage3 },
        // { path: '/create4', component: CreatePage4 },
        // { path: '/create5', component: CreatePage5 },
        { path: '/search', component: SearchPublic, name: "Search", },


        //test path
        // { path: '/business', component: BusinessCabPage },
        { path: '/user', component: UserCabPage },
        { path: '/userprof', component: UserProfileReadyPage },
        /////////////////////////////////////////////



        // otherwise redirect to home
        // { path: '*', redirect: '/' }
    ],
    // scrollBehavior: function() {
    //     return { x: 0, y: 0 }
    // }
});

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    console.log("beforeEach:", to, from);
<<<<<<< HEAD
    const publicPages = ['/authorization', '/search', '/cabinet', '/register', '/', '/user', '/user/activation/*', '/user/activation/', '/userprof', '/map', '/about', '/user/activation' , '/404', '*'];
=======
    const publicPages = ['/authorization', '/cabinet', '/register', '/', '/user', '/user/activation/*', '/user/activation/', '/userprof', '/map', '/about', '/user/activation', '/404', '*' ];


    // const publicPages = ['/authorization', '/search', '/cabinet', '/register', '/', '/user', '/user/activation/*', '/user/activation/', '/userprof', '/map', '/about', '/user/activation'];
>>>>>>> 27ab89530bd7f5a67ae6c2343f618569e77216dd

    const authRequired = !publicPages.includes(to.path);

    // const loggedIn = localStorage.getItem('user');
    const loggedIn = localStorage.getItem('token');

    if (registration.state.status === "success") {
        console.log("hi :" + registration.state.status);
        console.log(router);
        if (to.path == '/successRegister') {
            console.log("to.path == '/successRegister'")
        } else {
            return next();
        }
    } else if (authRequired && !loggedIn && to.path != '/successRegister') {
        console.log(`authRequired && !loggedIn && to.path!='/successRegister'`, router);
        return next('/');
    } else {
        console.log(`else`, router);
        return next();
    }
});