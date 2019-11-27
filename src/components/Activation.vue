<template>
  <div>
    <h1>ACTIVATION</h1>
    <h1>{{key()}}</h1>
  </div>
  </template>

<script>

export default {
name:'Activation',
data(){
  return{
    key() {return this.getKey()},
    }
  },
methods:{
  getKey(){
    let val = this.$route.redirectedFrom;
    if(val){
      let urlWithKey = val.split('/');
      let key = urlWithKey[urlWithKey.length-1];
      return key;
    }
    return this.$router.push('*');
  }
}
}
</script>

<style>

</style>