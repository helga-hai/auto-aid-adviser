<template>
  <div class = 'wrap' :class="{'res__login': loginShow}" :style="{'background-image': 'url(' + require('../assets/backgroundimage.jpg') + ')'}">
    <nav-component :loginShow="loginShow" @loginShowFunc="loginShowFunc" />
    <main>
      <div class="res" >
        <div class="one">
          <label for="">Що шукаємо</label>
          <!-- <button type="button" name="button" >
            <div class="selected-option">Аргонна сварка</div>
            <div class="arrow-down"></div>
          </button> -->
          <websocket />
          <!-- <ul class="submenu">
            <li class="submenu-item"><a href="#">Аргонна сварка</a></li>
            <li class="submenu-item"><a href="#">item2_2</a></li>
            <li class="submenu-item"><a href="#">item2_3</a></li>
          </ul>-->
        </div>

        <div class="two">
          <label for="">Де шукати</label>
          <button type="button" name="button" @click = "submenuShow = !submenuShow">
            <div class="selected-option">{{plase}}</div>
            <img :src="require('../assets/ico-dropdown.png')" class="registrStep2__icon":class="{'transform': submenuShow}">
          </button>
          <ul class="two_submenu" :class="{'opened': submenuShow}">
            <li class="two_submenuItem1 flex" @click = "submenuShow = !submenuShow">
              <p>Moe місцезнаходження</p>
               <img :src="require('../assets/XMLID 1.png')">
            </li>
            <li class="two_submenuItem2" @keyup.enter = "addPlace">
              <input type = "text" placeholder = "Вказати адресу" v-model="selected" >
            </li>
          </ul>
        </div>
        <div class="btn">
          <a href="#" class="btn__button orange">Знайти</a>
        </div>
      </div>
    </main>
    <div class="modal-login-registration " :class="{'active-modal': loginShow}">
      <button class="close-x" @click="loginHideFunc"></button>
      <!-- <div class="entrance"> -->
        <Authorization></Authorization>
        <div class="social-providers">
          <p>Увійти за допомогою соцмереж</p>
          <div class="social-providers__icons">
            <router-link to="https://m.facebook.com/"><img src="../assets/fb.png"/></router-link>
            <router-link to="https://www.google.com.ua/"><img src="../assets/google.png"/></router-link>
          </div>
        </div>
        
        <!-- <div class="mode active">
          <span>Вхід</span>
        </div>
        <div class="divider">
          <span>&nbsp;|&nbsp;</span>
        </div>
        <div class="mode">
          <span>Реєстрація</span>
        </div>

      </div>

      
      <form class="login-form active-form" method="post">
        <div class="form-input">
          <input type="email" placeholder="E-mail">
          <div class="error-message">
            <span>Невірний формат e-mail</span>
          </div>
        </div>
        <div class="form-input">
          <input type="password" placeholder="Введіть пароль">
          <div class="error-message">
            <span>Невірний формат e-mail</span>
          </div>
        </div>
        <button class="form-input submit-button">
          Увійти
        </button>
      </form>
      <div class="lost-password">
          <a href="#">Забули пароль?</a>
      </div>
      <div class="media-login"> 



        <p>Увійти за допомогою соцмереж</p>
        <ul class="social-providers">
          <li>
            f
          </li>
          <li>
            G
          </li>
        </ul> -->
    </div>  
  </div>
</template>

<script>
import NavComponent from '../components/NavComponent';
import websocket from '../components/websocket';
import Authorization from '../views/AuthorizationPage';

import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'

export default {
    name: 'HomePublic',
    components: {
        NavComponent,
        websocket,
        Authorization,
    },
    data () {
      return {
        loginShow: false,
        registerShow: false,
        submenuShow: false,
        plase: "Вказати локацію",
        selected: ''
      }
    },
    methods: {
      addPlace() {
        this.plase =  this.selected,
        this.submenuShow = !this.submenuShow
      },
      loginShowFunc() {
        this.loginShow = true
      },
      loginHideFunc() {
        this.loginShow = false
      }
    }
}
</script>

<style scoped>
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
}
html,
body, 
#app {
  width: 100%;
  margin: 0;}
body,
#app {
  font-family: 'Roboto', sans-serif;
}
button{
  border: 1px solid #000;
  border-radius: 4px;

}
.wrap {
  height: 100vh;
  background-size: cover;
}
main {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 80px);
}
.res {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 1052px;
  height: 132px;
  padding: 0px 20px;
  margin-bottom: 80px;
  background: rgba(10, 5, 23, 0.6);
  border-radius: 8px;
}
 .one{
  width: 555px;
  position: relative;
}
.two{
  width: 305px;
  position: relative;
}
.one label, .two label {
  display: block;
  text-align: left;
  margin-bottom: 8px;
  padding-left: 16px;
  font-size: 16px;
  line-height: 22px;
  color: #fff; 
}
.one button {
  width: 100%;
  height: 56px;
  position: relative;
  padding-left: 16px;
  background-color: #fff;
  border-color: rgba(10, 5, 23, 0.6);
}
.one .selected-option {
  text-align: left;
  line-height: 50px;
  max-width: 200px;
}
.one .arrow-down {
  position: absolute;
  padding: 15px;
  top: -1px;
  right: 0;

}
.one .arrow-down::after {
content: '';
display: block;
margin-top: 10px;
border: 6px solid transparent;
border-top: 8px solid #000;

}
.one.open .arrow-down::after {
 border-bottom: 8px solid #000;
 border-top: none;
}
/*.submenu{
 display: none;
  background-color: #fff;
  margin: 0;
  width: 250px;
  padding: 0;
  list-style: none;
  margin: auto;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
}
   .one.open .submenu{
     display: block;
   }
.submenu li {
  height: 48px;
    line-height: 48px;
    padding-left: 16px;
    box-sizing: border-box;
}

.submenu li.selected, .submenu li:hover{
  background: #FFF5C0;
  cursor: pointer;
}*/

.two button {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 56px;
  position: relative;
  padding: 0px 16px;
  background-color: #fff;
  border-color: rgba(10, 5, 23, 0.6);
}
.two .selected-option {
  font-size: 16px;
  line-height: 22px;
  text-align: left;
  max-width: 200px;
  color: #A5AEBC;
}
.two .arrow-down {
  position: absolute;
  padding: 15px;
  top: -1px;
  right: 0;

}
.two .arrow-down::after {
content: '';
display: block;
margin-top: 10px;
border: 6px solid transparent;
border-top: 8px solid #00BCD4;

}
.two.open .arrow-down::after {
 border-bottom: 8px solid #00BCD4;
 border-top: none;
}
/*.sub{
 display: none;
 background-color: #fff;
 margin: 0;
 width: 250px;
 padding: 0;
 list-style: none;
 margin: auto;
 box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
}
.two.open .sub{
 display: block;
}
.sub li {
height: 48px;
line-height: 48px;
padding-left: 16px;
box-sizing: border-box;
}

.sub li.selected, .sub li:hover{
background: #FFF5C0;
cursor: pointer;
}*/
.two_submenu {
  visibility: hidden;
  opacity: 0;
  position:absolute;
  left: 2px;
  top: 100%;
  transition: 0.5s;
}
.two_submenuItem1, .two_submenuItem2 input {
  width:300px;
  height:48px;
  background-color: #fff;
  text-align: left;
  padding:12px 16px;
  font-size: 16px;
  line-height: 24px;
}
.two_submenuItem1:hover, .two_submenuItem2 input:hover {
  background-color: #FFF5C0;
  color: #0E1E2E;
}
.two_submenuItem1.flex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.opened {
  visibility: visible;
  opacity: 1;
}
.transform {
  transform: scale(1, -1); 
}
.btn{
  margin-top: 29.6px;
}
.btn__button {
  display:block;
  width: 146px;
  height: 56px;
  padding: 19px 0px;
  font-size: 16px;
  line-height: 18px;
  text-transform: uppercase;
  color: #0E1E2E;
  text-align: center;
  border-radius: 4px;
}
.btn__button.orange {
  background-color: #FFC700;
}
/*body{
  width: 800px;
  border: 1px solid;
  height: 100%;
}*/
.modal-login-registration {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  padding: 32px 50px;
  width: 400px;
  height: 100vh;
  overflow: scroll;
  position: absolute;
  /* left: auto; */
  right: -400px;
  top: 0;
  bottom: 0px;
  background-color: #FFFFFF;
  transition: right 1s;

}
.modal-login-registration.active-modal {
  right: 0;
}
.close-x  {
  position: absolute;
  right: 45px;
  top: 27px;
  width: 14px;
  height: 14px;
  border: none;
  cursor: pointer;
}
.close-x:before, .close-x:after {
  position: absolute;
  top: 0px;
  right: 6px;
  content: ' ';
  height: 16px;
  width: 2px;
  background-color: #6F7E95;
}
.close-x:before {
  transform: rotate(45deg);
}
.close-x:after {
  transform: rotate(-45deg);
}
.social-providers p{
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 22px;
}
.social-providers .social-providers__icons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
}
.social-providers__icons a{
  margin-right: 20px;
}
.social-providers__icons a:last-child{
  margin-right: 0px;
}
</style>