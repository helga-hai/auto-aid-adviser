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

<style lang="scss">
@import './styles/normalize.scss';
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500&display=swap&subset=cyrillic');
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
* {
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}
p,
h1,
h2,
h3,
h4,
h5 {
	margin: 0;
	padding: 0;
}

button {
	border: none;
	border-radius: 0;
	box-shadow: none;
	//-webkit-appearance: none;
	cursor: pointer;
	outline: none;
}

input {
	border: none;
	outline: none;
	border-radius: 0;
	box-shadow: none;
  padding-left:10px;
	//-webkit-appearance: none;
}


</style>
