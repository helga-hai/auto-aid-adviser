<template>
  <div>
      <nav-component/>
      <h1>
          Hello, my role is: {{role()}}
      </h1>
  </div>
</template>

<script>

import Activation from '../components/Activation';
import NavComponent from '../components/NavComponent';

export default {
    name: 'BusinessCabPage',
    components: {
        NavComponent,
        },
    data(){
        return {
            role: function(){return "Business"}
        }
    }
}
</script>

<style>

</style>