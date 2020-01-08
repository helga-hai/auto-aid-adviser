<template>
    <div class="header" :class="{'header__privat':privat, 'header__grey':grey}" >
        <div class="header__logo">
            <router-link :to="'/'" exact><img src="../assets/aaa_logo.svg"/> </router-link>
        </div>   
        <div class="header__nav">
            <router-link to="/" exact><img src="../assets/ico-search.png"/></router-link>
            <router-link to="/about">Про нас</router-link>
            <router-link to="/business">business</router-link>
            <router-link to="/user">user</router-link>
            <span class="header__lang">Укр </span> 
            <!-- <router-link to="/authorization" @click="loginShowFunc">Вхід / Реєстрація</router-link> -->
            <div class="enterRegExit">
                <a v-if="ifToken()===true && isLog" @click="logout" id='logout'>Вихід</a>
                <a href="#" @click="loginShowFunc" v-if="ifToken()===false&&!isLog">Вхід</a>
            
                
            </div>
            <router-link v-if="isRole" :to="(isRole=='user') ? '/user' : (isRole=='business') ? '/business' : ''">Особистий кабінет</router-link>

            <!--<router-link to="/create">Особистий кабінет</router-link> -->
            <!-- <a href="#" @click="loginShowFunc">Вхід / Реєстрація</a>
            <router-link to="/create">Особистий кабінет</router-link> -->
        </div>
    </div>
</template>

<script>

import { userService } from '../_services';
import { router } from '../_helpers';

export default {


    props:['privat','grey','loginShow', 'isRole'],
    data() {
        return {
            isLog: false,
            // currentPage: this.
        }
    },
    methods: {
        loginShowFunc() {
            this.$emit('loginShowFunc')
        },
        ifToken(){
            let token = localStorage.getItem('token');
            if(token){
                this.isLog=true;
                return true;
            }
            return false;
        },
        logout(){
            console.log("work logout");
            userService.logout();
            this.ifToken();
            this.isLog=false;
            router.push('/');
        },
        // checkRole() {
        //     let rol = 
        //     return '/user'
        //     return '/business'
        // }
    }
}
</script>

<style scoped lang="scss">
.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    padding: 0px 50px;
    &__privat {
        background: #0E1E2E;
        color: #fff;
        text-transform: uppercase;
        margin:0;
        .block__nav{
            background: #FFC700;
        }
    }
    &__privat {
        background: #F6F7F8;
        color: #0E1E2E;
        text-transform: uppercase;
        margin:0;
    }
    &.dark {
        box-shadow: 2px 1px 7px rgba(0, 0, 0, 0.3);
        position: relative;
        z-index: 5;
    }
}
.header__logo {
    width: 96px;
    height: 26px;
    display: inline-block;
}
.header__logo img {
    width: 100%;
    height: auto;
}
.header__nav {
    margin-left: auto;
    display: flex;
}

.header__nav a, span.header__lang,#logout {
    padding: 0 30px;
    display:inline-block;
    height: 56px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;  
    font-size: 16px;
    line-height: 19px;
}

.header__nav a, .header__lang {
    text-decoration: none;
    color: #fff;
}
.dark .header__nav a, .dark .header__lang {
    text-decoration: none;
    color: #818ea2;
}
.header__nav a.router-link-exact-active {
  color: #FFC700;
}
.enterRegExit{
    display: inline;
}
#logout{
    cursor: pointer;
}

</style>