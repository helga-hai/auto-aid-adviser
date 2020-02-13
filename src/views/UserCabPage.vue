<template>
  <div>

      <!-- <h1>
          e-mail:{{email()}}
      </h1> -->
      <!-- <user-create-page1 v-if="p1" @menuToggler="menuToggler"/>
      <user-auto-create-page />
      <user-auto-create-page2 /> -->
      <span class="role">
          {{role}}
          {{info()}}
          e-mail: {{email()}}
      </span>

      <user-layout/>
      <!-- <user-create-page1  @menuToggler="menuToggler"/>
      <user-auto-create-page  @menuToggler="menuToggler"/>
      <user-auto-create-page2  @menuToggler="menuToggler"/>  -->

        <!-- <user-create-page2 v-if="step1" @stepOneFunction="stepOneFunction"/>
      <user-create-page1 v-if="step2"/> -->
  </div>
</template>

<script>

import Activation from '../components/Activation';

import UserLayout from '../layouts/UserLayout'
import userdataservice from '../_store/userdataservice.module'

export default {
    name: 'UserCabPage',

    components: {
        // UserCreatePage1,
        // UserAutoCreatePage,
        // UserAutoCreatePage2,
        UserLayout,////////////////////////////////////////
        userdataservice,//////////////////////////////////////////////////////////////////////////

    },
    data(){
        return {
            role: this.$store.state.authentication.role||localStorage.getItem('role'),
            email: function(){return this.$store.state.authentication.email||localStorage.getItem('email')},
            info: function(){
                
                let role = this.$store.state.authentication.role||localStorage.getItem('role');
                let email = this.$store.state.authentication.email||localStorage.getItem('email');
                return {role, email};
            },
        }
    },
    methods: {
        stepOneFunction() {
            console.log('foo UserCab');
        },

    },

}
</script>

<style>
span.role {
    left: 170px;
    position: absolute;
    top: 33px;
    background: aliceblue;
    padding: 3px 11px;
    border-radius: 11px;
    font-size: 13px;
    color: #6f9ac6;
}
</style>