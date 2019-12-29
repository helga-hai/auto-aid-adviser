<template>
  <div class="profileReady">
      <h1>hello</h1>
      <h1>{{surname}}</h1>
      <h1>{{name}}</h1>
      <h1>{{phone}}</h1>
  </div>
</template>

<script>
export default {

name:"UserProfileReadyPage",
data(){
    return{
        surname:this.$store.state.userdataservice.personalPageData.data.surname,
        name:this.$store.state.userdataservice.personalPageData.data.name,
        phone:this.$store.state.userdataservice.personalPageData.data.phone,
        }
    
    },

}
</script>

<style>

</style>