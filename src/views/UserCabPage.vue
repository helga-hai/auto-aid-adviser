<template>
  <div>

      <!-- <h1>
          e-mail:{{email()}}
      </h1> -->
      <!-- <user-create-page1 v-if="p1" @menuToggler="menuToggler"/>
      <user-auto-create-page />
      <user-auto-create-page2 /> -->
      <h1>
          <!-- <nav-component/> -->
          Hello, I am: {{role}}
          {{info()}}
      </h1>
      <h1>
          e-mail:{{email()}}

      </h1>
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


// import UserCreatePage1 from '../views/UserCreatePage1';
// import UserAutoCreatePage from '../views/UserAutoCreatePage';
// import UserAutoCreatePage2 from '../views/UserAutoCreatePage2';
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
            role: this.$store.state.authentication.role,
            email: function(){return this.$store.state.authentication.email||localStorage.getItem('email')},
            info: function(){
                
                let role = this.$store.state.authentication.role;
                let email = this.$store.state.authentication.email||localStorage.getItem('email');
                return {role, email};

                // return this.$store.state.authentication.role, this.$store.state.authentication.email;
            },
            // mePos() { console.log(this.$store.state.userdataservice.menuItem)
            // return this.$store.state.userdataservice.menuItem},     ///////////////////////////


            // step1: true,
            // step2: false,


            // p1: false,
            // p2: true,
            // p3: false,
            // p4: false,

        }
    },
    methods: {
        stepOneFunction() {
            console.log('foo UserCab');
            // this.step1 = false;
            // this.step2 = true;
        },
        // menuToggler(){
        //     switch(this.$store.state.userdataservice.menuItem){
        //         case "Особисті данні":
        //             console.log("foo");
        //             p1=true;
        //             break;
        //         case "Мої автомобілі":
        //             console.log("bar");
        //             p1=false;
        //             p2=true;
        //             break;
        //         default:
        //             p1=true;
        //             break;
        //     }

        // }

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
    }


    ////////////////////////////////////////
}
</script>

<style>

</style>