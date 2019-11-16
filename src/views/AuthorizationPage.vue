<template>
  <div class="auth">
      <div id="nav">
          <router-link to="/login">Login</router-link> |
          <router-link to="/register">Register</router-link>
      </div>
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
  }
}
</script>

<style>
  .auth{
    background-color: red;
  }
</style>