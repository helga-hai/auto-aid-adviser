<template>
  <div>
      <!-- <nav-component/> -->
      <h1>
          Hello, my role is: {{role()}}
      </h1>
      <create-page2 v-if="step1" @stepOneFunction="stepOneFunction"/>
      <create-page v-if="step2"/>
  </div>
</template>

<script>

import Activation from '../components/Activation';
import NavComponent from '../components/NavComponent';
import CreatePage2 from '../views/CreatePage2';
import CreatePage from '../views/CreatePage';

export default {
    name: 'BusinessCabPage',
    components: {
        NavComponent,
        CreatePage2,
        CreatePage
    },
    data(){
        return {
            role: function(){return "Business"},
            step1: true,
            step2: false,
        }
    },
    methods: {
        stepOneFunction() {
            this.step1 = false;
            this.step2 = true
        }
    }
}
</script>

<style>

</style>