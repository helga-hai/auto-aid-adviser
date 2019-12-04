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
          <p><span>Вхід</span><span>|</span><span>Реєстрація</span></p>
          <register-page/>
          <login-page/>
      </div>
      <!-- <slot></slot> -->
  </div>
</template>

<script>

import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
// import NavigationLink from '../components/NavigationLink'

export default {
  name: 'Authorization',
  components: {
    LoginPage,
    RegisterPage,
    // NavigationLink,
  }
}
</script>

<style>
  .auth{
    background-color: red;
  }
</style>