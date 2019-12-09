<template>
  <!-- <div class="auth"> -->
      <div id="nav">
        <div class="entrance">
        <!-- <div class="mode active">
          <span>Вхід</span>
        </div>
        <div class="divider">
          <span>&nbsp;|&nbsp;</span>
        </div>
        <div class="mode">
          <span>Реєстрація</span>
        </div> -->
          <!-- <router-link to="/login">Login</router-link> |
          <router-link to="/register">Register</router-link> -->
          <!-- <p><navigation-link url="login">Вхід</navigation-link><span>|</span><span>Реєстрація</span></p> -->

            <div class="mode active"><span id="login" @click="toggler=true">Вхід</span></div>
            <div class="divider"><span>&nbsp;|&nbsp;</span></div>
            <div class="mode"><span id="registrtion" @click="toggler=false">Реєстрація</span></div>
        </div>
          <div id='logRegContainer'>
            <login-page v-if="toggler"/>
            <register-page v-else/>
          </div>
 
              <p>Увійти за допомогою соцмереж</p>
        <ul class="social-providers">
          <li>
            f
          </li>
          <li>
            G
          </li>
        </ul>
       <!-- </div> -->
      <!-- </div> -->
  </div>
</template>

<script>

import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'


export default {
  name: 'Authorization',
  components: {
    LoginPage,
    RegisterPage,
  },
  data(){
    return{
      toggler: false,
    }
  }

}
</script>


  /* .auth{
    background-color: red;
  } */

<style scoped>

button{
  border: 1px solid #000;
  border-radius: 4px;

}

.btn{
  width: 180px;
  height: 55px;
  position: relative;
  top: 26px;
}
a.button.orange {
  font-size: 11px;
  text-decoration: none;
  text-transform: uppercase;
  width: 180px;
  height: 55px;
  display: block;
  text-align: center;
  line-height: 60px;
  font-family: Roboto;
  border-radius: 4px;
  background-color: #FFC700;
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
  flex-direction: row !important;

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
.direction{
  display: flex;
  flex-direction: row !important;
}

span#registrtion, span#login{
  cursor: pointer;
}
</style>
