<template>
  <div id="app">


    <div v-if="alert.message" 
      :class="`alert ${alert.type}`">
      {{alert.message}}
    </div>

      <!-- <span v-if="isLoggedIn"> | <a @click="logout">Logout</a></span>
      <span v-else> | 
        <router-link to="/login">Login</router-link>
        </span> -->
    <router-view/>
  </div>
</template>


<script>
export default {
  name: 'app',
  computed: {
    alert () {
        return this.$store.state.alert
    }
  },
  watch:{
      $route (to, from){
          // clear alert on location change
          this.$store.dispatch('alert/clear');
      }
  } 
  // methods: {
  //   logout: function() {
  //     this.$store.dispatch("logout").then(() => {
  //       this.$router.push("/login");
  //     });
  //   }
  // }
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
