<template>
    <div class="bus">
        <!-- <header>
            <router-link to="/" class ="logo">
                <img :src="require('../assets/aaa_logo.svg')">
            </router-link>
            <nav>
                <ul class="topMenu">
                    <li><router-link to="/"><img src="../assets/ico-search.png"/></router-link></li>
                    <li><router-link to="/about">Про нас</router-link></li>
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
                    <li> {{email()}} </li>
                    <li><router-link to="/">Вхід</router-link></li>
                </ul>
            </nav>
        </header> -->
        <nav-component class="dark" :isRole="'business'"/>
        <main>
            <section class="sideBar">
                <p>Особистий кабінет</p>
                <ul>
                    <li class="sideBar__list "><router-link to="/#" class="sideBar__button" >Особисті данні</router-link></li>
                    <li class="sideBar__list "><router-link to="/cabinet" class="sideBar__button" >Мої об‘єкти</router-link></li>
                    <li class="sideBar__list "><router-link to="/#" class="sideBar__button">Заявки клієнтів</router-link></li>
                    <li class="sideBar__list "><router-link to="/#" class="sideBar__button">Налаштування</router-link></li>
                </ul>
            </section>
            <section class="objectsWrapp">
                <slot></slot>
            </section>
        </main>
        <footer>
            <a href="#" class ="logoFooter">
                <img :src="require('../assets/Group 195.png')">
            </a>
            <div class="Evo">
                <img :src="require('../assets/Group 194.png')">
                <p class="footerTitle">2019 Hillel EVO project. Auto Aid Adviser</p>
            </div>
        </footer>
    </div>
</template>

<script>
import NavComponent from '../components/NavComponent';

export default {
        name: 'CreatePage',
    components: {
        NavComponent,
    },
    data(){
        return{
            email: function(){return this.$store.state.authentication.email||localStorage.getItem('email')},
        }
    }
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
    color: #fff; }
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
.bus {
    header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 80px;
        padding: 0px 50px;
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
.bus {
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
        padding-top: 56px;
        background-color: #F6F7F8;
        text-align: left;
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
    .sideBar__list a{
        color: #4B5E7A;
    }
    .sideBar__list a::before {
        content: '';
        display: inline-block;
        width: 16px;
        height: 8px;
        background-color: #E4E7EB;
        margin-right: 16px ;
        border-radius: 3px;
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
    .sideBar__list a.router-link-exact-active::before {
        background-color: #FFC700;
    }
}
/*content*/
.bus {
    .objectsWrapp {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        width: calc(100% - 216px);
        min-height: calc(100vh - 80px - 79.6px);
        text-align: left;
        height:fit-content;
    }
    /*  footer  */
    footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
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
    }
}
</style>