<template>
  <div>
      <h1>
          <!-- <nav-component/> -->
          Hello, I am: {{role}}{{info()}}
      </h1>
      <h1>
          e-mail:{{email()}}
      </h1>
      <user-create-page1/>
        <!-- <user-create-page2 v-if="step1" @stepOneFunction="stepOneFunction"/>
      <user-create-page1 v-if="step2"/> -->
  </div>
</template>

<script>

import Activation from '../components/Activation';
import NavComponent from '../components/NavComponent';

import UserCreatePage1 from '../views/UserCreatePage1';
import UserCreatePage2 from '../views/UserCreatePage2';

export default {
    name: 'UserCabPage',
    components: {
        NavComponent,
        UserCreatePage1,
        UserCreatePage2
    },
    data(){
        return {
            role: this.$store.state.authentication.role,
            email: function(){return this.$store.state.authentication.email||localStorage.getItem('email')},
            info: function(){
                
                console.log(this.$store.state.authentication.email)         /////test
                console.log(this.$store.state.authentication.role)         /////test
                let role = this.$store.state.authentication.role;
                let email = this.$store.state.authentication.email||localStorage.getItem('email');
                return {role, email};

                // return this.$store.state.authentication.role, this.$store.state.authentication.email;
            },

            step1: true,
            step2: false,
        }
    },
    methods: {
        stepOneFunction() {
            this.step1 = false;
            this.step2 = true;
        }
    }
}
</script>

<style>

</style>