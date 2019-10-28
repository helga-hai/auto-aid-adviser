<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> | 
      <router-link to="/map">Map</router-link> |
      <router-link to="/login">Login</router-link>
    </div>

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
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
