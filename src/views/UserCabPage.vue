<template>
  <div>
      <h1>
          <nav-component/>
          Hello, my role is: {{role()}}
      </h1>
  </div>
</template>

<script>

import Activation from '../components/Activation';
import NavComponent from '../components/NavComponent';

export default {
    name: 'UserCabPage',
    components: {
        NavComponent,
        },
    data(){
        return {
            role: function(){return "User"}
        }
    }
}
</script>

<style>

</style>