<template>
  <div>

      <!-- <h1>
          e-mail:{{email()}}
      </h1> -->
      <user-create-page1 v-if="p1" @menuToggler="menuToggler"/>
      <user-auto-create-page />
      <user-auto-create-page2 />
        <!-- <user-create-page2 v-if="step1" @stepOneFunction="stepOneFunction"/>
      <user-create-page1 v-if="step2"/> -->
  </div>
</template>

<script>

import Activation from '../components/Activation';
import NavComponent from '../components/NavComponent';

import UserCreatePage1 from '../views/UserCreatePage1';
import UserAutoCreatePage from '../views/UserAutoCreatePage';
import UserAutoCreatePage2 from '../views/UserAutoCreatePage2';

export default {
    name: 'UserCabPage',
    components: {
        UserCreatePage1,
        UserAutoCreatePage,
        UserAutoCreatePage2,
    },
    data(){
        return {
            role: this.$store.state.authentication.role,
            email: function(){return this.$store.state.authentication.email||localStorage.getItem('email')},
           

            step1: true,
            step2: false,


            p1: true,
            p2: false,
        }
    },
    methods: {
        stepOneFunction() {
            this.step1 = false;
            this.step2 = true;
        },
        menuToggler(){
            console.log("bar");
            this.p1 = false;
            this.p2 = true;
        }
    }
}
</script>

<style>

</style>