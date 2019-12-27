<template>
  <div>
<<<<<<< HEAD

      <!-- <h1>
          e-mail:{{email()}}
      </h1> -->
      <user-create-page1 v-if="p1" @menuToggler="menuToggler"/>
      <user-auto-create-page />
      <user-auto-create-page2 />
=======
      <h1>
          <!-- <nav-component/> -->
          Hello, I am: {{role}}{{info()}}
      </h1>
      <h1>
          e-mail:{{email()}}{{menuPos}}{{mePos()}}
      </h1>
      <user-create-page1/>
>>>>>>> 721ec059698c9fbc0dbc6054982cedbb6bb880f4
        <!-- <user-create-page2 v-if="step1" @stepOneFunction="stepOneFunction"/>
      <user-create-page1 v-if="step2"/> -->
  </div>
</template>

<script>

import Activation from '../components/Activation';
import NavComponent from '../components/NavComponent';

import UserCreatePage1 from '../views/UserCreatePage1';
<<<<<<< HEAD
import UserAutoCreatePage from '../views/UserAutoCreatePage';
import UserAutoCreatePage2 from '../views/UserAutoCreatePage2';
=======
import UserCreatePage2 from '../views/UserCreatePage2';
import UserLayout from '../layouts/UserLayout'
import userdataservice from '../_store/userdataservice.module'
>>>>>>> 721ec059698c9fbc0dbc6054982cedbb6bb880f4

export default {
    name: 'UserCabPage',

    components: {
        UserCreatePage1,
<<<<<<< HEAD
        UserAutoCreatePage,
        UserAutoCreatePage2,
=======
        UserCreatePage2,
        UserLayout,////////////////////////////////////////
        userdataservice,//////////////////////////////////////////////////////////////////////////

>>>>>>> 721ec059698c9fbc0dbc6054982cedbb6bb880f4
    },
    data(){
        return {
            role: this.$store.state.authentication.role,
            email: function(){return this.$store.state.authentication.email||localStorage.getItem('email')},
<<<<<<< HEAD
           
=======
            info: function(){
                
                console.log(this.$store.state.authentication.email)         /////test
                console.log(this.$store.state.authentication.role)         /////test
                let role = this.$store.state.authentication.role;
                let email = this.$store.state.authentication.email||localStorage.getItem('email');
                return {role, email};

                // return this.$store.state.authentication.role, this.$store.state.authentication.email;
            },
            mePos() { console.log(this.$store.state.userdataservice)
            return this.$store.state.userdataservice},     ///////////////////////////
>>>>>>> 721ec059698c9fbc0dbc6054982cedbb6bb880f4

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
<<<<<<< HEAD
        menuToggler(){
            console.log("bar");
            this.p1 = false;
            this.p2 = true;
        }
=======

    },

/////////////////////////////////////////////
    computed:{
        menuPos() {
            return UserLayout.data().mIt
        },
    },
    watch:{
        menuPos() {
            return UserLayout.data().mIt
        },
>>>>>>> 721ec059698c9fbc0dbc6054982cedbb6bb880f4
    }


    ////////////////////////////////////////
}
</script>

<style>

</style>