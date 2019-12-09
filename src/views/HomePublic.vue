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
          <ul class="submenu">
            <li class="submenu-item"><a href="#">Аргонна сварка</a></li>
            <li class="submenu-item"><a href="#">item2_2</a></li>
            <li class="submenu-item"><a href="#">item2_3</a></li>
          </ul>
        </div>

        <div class="two">
          <label for="">Де шукати</label>
          <button type="button" name="button">
            <div class="selected-option">Вказати локацію</div>
            <div class="arrow-down"></div>
          </button>
          <ul class="sub">
            <li class="submenu"><a href="#">Аргонна сварка</a></li>
            <li class="submenu"><a href="#">item2_2</a></li>
            <li class="submenu"><a href="#">item2_3</a></li>
          </ul>
        </div>
        <div class="btn">
          <a href="#" class="btn__button orange">Знайти</a>
        </div>
      </div>
    </main>

    <div class="modal-login-registration " :class="{'active-modal': loginShow}">
      <button class="close-x" @click="loginHideFunc">
        <span class="close">x</span>
      </button>

      <!-- <div class="entrance"> -->


      <div>
        <Authorization></Authorization>
        
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
        Authorization
    },
    data () {
      return {
        loginShow: false,
        registerShow: false
      }
    },
    methods: {
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
}
.two{
  width: 305px;
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
.submenu{
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
}

.two button {
  width: 100%;
  height: 56px;
  position: relative;
  padding-left: 16px;
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
.sub{
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
body{
  width: 800px;
  border: 1px solid;
  height: 100%;
}
div,input {
  box-sizing: border-box;
}
.modal-login-registration {
  padding: 32px 50px;
  width: 400px;
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
.close-x {
  display: flex;
  justify-content: flex-end;
}
.close-x .close {
  display: block;
  width: 15px;
  height: 15px;
}
.close:hover {
  cursor: pointer;
}
.entrance {
  margin-top: 43px;
  display: flex;
  justify-content: flex-start;
  align-content: center;
}
.entrance .mode, .entrance .divider {
  display: flex;
  align-content: center;
}
.entrance .mode span {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  color: #0E1E2E;
  opacity: 0.5;
}
.entrance .mode.active {
  opacity: 1;
}
.login-form {
  margin-top: 26px;
}
.login-form .form-input {
  margin-bottom: 36px;
}
.login-form .form-input input {
  width: 300px;
  height: 56px;
  padding-left: 16px;
  border: 1px solid #6F7E95;
  border-radius: 4px;
}
.login-form .submit-button {
  background: #FFC700;
  border-radius: 4px;
  padding-left: 0px;
  text-align: center;
  width: 300px;
  height: 56px;
  border: 0;
}
.lost-password {
  margin-bottom: 36px;
  text-align: center;
}
.media-login {
  margin-bottom: 36px;
  text-align: center;
}
.social-providers {
  margin: 0px;
  padding: 0px;
}
</style>