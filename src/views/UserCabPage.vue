<template>
  <div>
      <!-- <span class="role">
          {{role}}
          {{info()}}
          e-mail: {{email()}}
      </span> -->

      <user-layout/>

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