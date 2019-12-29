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

            <div class="mode step" :class="{'active': toggler}"><span id="login" @click="toggler=true">Вхід</span></div>
            <div class="divider step"><span>&nbsp;|&nbsp;</span></div>
            <div class="mode" :class="{'active': !toggler}"><span id="registrtion" @click="toggler=false">Реєстрація</span></div>
        </div>
          <div id='logRegContainer'>
            <login-page v-if="toggler"/>
            <register-page v-else/>
          </div>

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
body,
#app {
  font-family: 'Roboto', sans-serif;
}
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
  border-radius: 4px;
  background-color: #FFC700;
}

.modal-login-registration {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
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
.entrance {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  margin-top: 57px;
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  color: rgba(14,30,46,0.5);
}
.entrance .step {
  padding-right: 26px;
}
.entrance .mode.active{
  color: rgba(14,30,46, 1);
}
.entrance .mode {
  cursor: pointer;
}
/*.login-form {
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
}*/
</style>
