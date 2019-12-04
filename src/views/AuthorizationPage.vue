<template>
  <div class="auth">
      <div id="nav">
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
          <p><span id="login" @click="toggler=true">Вхід</span><span>|</span><span id="registrtion" @click="toggler=false">Реєстрація</span></p>
          <div id='logRegContainer'>
            <login-page v-if="toggler"/>
            <register-page v-else/>
          </div>
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

<style>
  .auth{
    background-color: red;
  }
  span#login, span#registrtion{
    cursor: pointer;
  }
</style>