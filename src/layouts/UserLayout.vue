<template>
    <div :email = email() class="user-page">
        <!-- <header>
            <a href="#" class ="logo">
                <img :src="require('../assets/aaa_logo.svg')">
            </a>
            <nav>
                <ul class="topMenu">
                    <li><a href="#">Пошук</a></li>
                    <li><a href="#">Про нас</a></li>
                    <li class="topMenu__language">
                        <div class="topMenu__selected">
                            <span class="topMenu__langLabel selLabel">Укр</span>
                            <img :src="require('../assets/arrow drop down.png')" class="topMenu__icon">
                        </div>
                        <div class="topMenu__langSwitch">
                            <a>
                                <span class="topMenu__langLabel">Укр</span>
                            </a>
                            <a>
                                <span class="topMenu__langLabel">Рус</span>
                            </a>
                        </div>
                    </li>
                    <li><a href="#" >{{email()}}</a></li>
                    <li><a href="#"><router-link to="/">Вийти</router-link></a></li>
                </ul>
            </nav>
        </header> -->
        <keep-alive>
            <nav-component class="dark" :isRole="'user'"/>
        </keep-alive>
        <main>
            <section class="sideBar">
                <p>Особистий кабінет</p>
                <ul>
                    <li class="sideBar__list "><a href="#" class="sideBar__button" @click="switchView('user-create-page1')" :class="{'active': currentView == 'user-create-page1' || currentView == 'user-profile-ready-page'}">Особисті данні</a></li>
                    <li class="sideBar__list "><a href="#" class="sideBar__button" @click="switchView(getCurrentView( 'cars' , [ 'user-auto-create-page' , 'user-auto-complite-car-cards-page' ]))" :class="{'active': currentView == 'user-auto-create-page' || currentView == 'user-auto-create-page2' || currentView == 'user-auto-complite-car-cards-page' }">Мої автомобілі</a></li>
                    <li class="sideBar__list "><a href="#" class="sideBar__button" @click="switchView('user-station-recording')" :class="{'active': currentView == 'user-station-recording' }">Записи до станції</a></li>
                    <li class="sideBar__list "><a href="#" class="sideBar__button" @click="switchView('user-settings')" :class="{'active': currentView == 'user-settings' }">Налаштування</a></li>
                    <!-- <li>text: {{mIt}}</li> -->
                </ul>
            </section>
            <section class="objectsWrapp">
                <!-- <slot></slot> -->
                <keep-alive><!-- Неактивные компоненты будут закэшированы -->
                    <component :is="currentView" @switchView='switchView'></component>
                </keep-alive>
                <!-- <user-create-page1 :email='email()'/>    
                <user-auto-create-page/> -->
                <!-- <user-auto-create-page2 v-if='step2'/> -->

        
            </section>
        </main>
        <footer>
            <!-- <a href="#" class ="logoFooter">
                <img :src="require('../assets/Group 195.png')">
            </a> -->
            <div class="Evo">
                <img :src="require('../assets/Group 194.png')">
                <p class="footerTitle">2019 Hillel EVO project. Auto Aid Adviser</p>
            </div>
        </footer>
        <!-- <footer>
            <p class="footerTitle">2019 Hillel EVO project. Auto Aid Adviser</p>
        </footer> -->
    </div>
</template>






<script>

import UserCreatePage1 from '../views/UserCreatePage1';
import UserAutoCreatePage from '../views/UserAutoCreatePage';
import UserAutoCreatePage2 from '../views/UserAutoCreatePage2';
import UserSettings from '../views/UserSettings';
import UserStationRecording from '../views/UserStationRecording'
import UserProfileReadyPage from '../views/UserProfileReadyPage';
import NavComponent from '../components/NavComponent';
import UserAutoCompliteCarCardsPage from '../views/UserAutoCompliteCarCardsPage';

import userdataservice from '../_store/userdataservice.module';
import { userService } from '../_services';

export default {
    // props:['email'],

    components: {
        UserCreatePage1,
        UserAutoCreatePage,
        UserAutoCreatePage2,
        UserSettings,
        UserStationRecording,
        UserProfileReadyPage,
        NavComponent,
        UserAutoCompliteCarCardsPage,
    },
    data(){
        return{
            currentView:"user-create-page1",
            // mIt:"Особисті данні",
            email: function(){return this.$store.state.authentication.email||localStorage.getItem('email')},
            cars: this.$store.state.userdataservice.cars,

        }
    },
    methods:{
        // menuItem(){
        //     console.log(document.activeElement.innerText)
        //     this.mIt=document.activeElement.innerText;

        //     this.$store.dispatch('userdataservice/menuVal',document.activeElement.innerText);

        //     // return document.activeElement.innerText;
        // },
        switchView: function(view) {
            this.currentView = view;
        },

        getCars(){
            console.log('GET_CARS')

            userService.getAllUserData( 'api/user/profile/cars' )

                .then(function(result){

                    console.log("CARS "+result);

                    return result })

                .then(result=>this.$store.dispatch('userdataservice/fieldsVal',[ 'cars' , result ]))

                // .then( ()=>{
                //     let _cars = this.$store.state.userdataservice.cars;

                //     console.log("CARS _CARS!!!!!!!!!!!!!!!!! from UserLayout"+_cars );

                //     this.cars = _cars;
                //     })
        },

        getCurrentView( param , viewArr){

            console.log("getCurrentView "+param);

            if( param == null || param == undefined || param.length == 0){

                return viewArr[ 0 ];
            }else{

                return viewArr[ 1 ];
            }

        },

    },

    created(){

        // {{this.getCars()}}
        console.log('GET_CARS from USER_LAYOUT')

        userService.getAllUserData( 'api/user/profile/cars' )

            .then(function(result){

                console.log("CARS "+result);

                return result })

            .then(result=>this.$store.dispatch('userdataservice/fieldsVal',[ 'cars' , result ]))

    },



}

</script>

<style lang="scss">
/*  TOP MENU  */
* {
    box-sizing: border-box;
}
ul {
    list-style-type: none; 
    margin: 0;
    padding: 0;
} 
a {
    text-decoration: none;
    cursor: pointer; 
    color: #4B5E7A; }
html,
body, 
#app {
  width: 100%;
  margin: 0;}
body,
#app {
    font-family: 'Roboto', sans-serif; 
    background-color:  rgb(255, 255, 255);
    color: #4B5E7A;}
input {
    font-family: 'Roboto', sans-serif; 
    color: #4B5E7A;
}
.user-page {
    header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 24px 50px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.16);
        background-color:  rgb(255, 255, 255);
        z-index: 3;
    }
    .logo {
        width: 113.23px;
        height: 32px;
    }
    .topMenu {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;  
        font-size: 16px;
        line-height: 19px;
    }
    .topMenu a, .topMenu .topMenu__selected {
        color: #6F7E95;
    }
    .topMenu li {
        margin-left: 40px;
    }
    .topMenu li :hover {
        color: black;
    }
    .topMenu__language {
        position: relative;
    }
    .topMenu__selected {
        cursor: pointer;
    }
    .topMenu__icon {
        width: 20px;
        height: 15px;
    }
    .topMenu__langSwitch {
        position: absolute;
        visibility: hidden;
        opacity: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;  
    }
}
/*  sideBar.css  */
.user-page {
    main {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: stretch;
        width: 100%;
        z-index: 2;
    }
    .sideBar {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: 216px;
        text-align: left;
            background-color: #F6F7F8;
            padding-top: 56px;
    }
    .sideBar p {
        color: #0E1E2E;
        font-weight: 500;
        font-size: 18px;
        line-height: 24px;
        margin: 0;
        padding-left: 48px;
        padding-right: 10px;
    }
    .sideBar ul {
        padding: 36px 0px 0px 16px;
    }
    .sideBar__list ::before {
        content: '';
        display: inline-block;
        width: 16px;
        height: 8px;
        background-color: #E4E7EB;
        margin-right: 16px ;
    }
    .sideBar__button {
        display: inline-block;
        font-size: 16px;
        line-height: 22px;
        padding-bottom: 26px;
    }
    .sideBar__button:hover {
        color: black;
    }
    .sideBar__list a.router-link-exact-active {
    color: #0E1E2E;
    }
    .sideBar__list a:focus::before {
        background-color: #FFC700;
    }

    /*content*/
    .objectsWrapp {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        width: calc(100% - 216px);
        min-height: calc(100vh - 80px - 79.6px);
        text-align: left;
    }
    /*  footer  */
    footer {
        width: 100%;
        padding: 29px 50px;
        text-align: right;
        background-color: #0E1E2E;
    }
    .footerTitle {
        font-size: 16px;
        line-height: 22px;
        color: #FFFFFF;
    }

}
.user-page {
    
    /*  footer  */
    footer {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;//space-between;
        align-items: center;
        width: 100%;
        height: 80px;
        padding: 0px 50px;
        background-color: #0E1E2E;
    }
    .Evo {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
    }
    .footerTitle {
        padding-left:16px;
        font-size: 12px;
        line-height: 12px;
        color: #FFFFFF;
        padding-top: 2px;
    }
    .active::before{
        background-color: #FFC700;
    }
}
</style>