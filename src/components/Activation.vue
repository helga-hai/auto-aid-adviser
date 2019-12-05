<template>
  <div>
    <h1>ACTIVATION</h1>
    <h1>{{key()}}</h1>
    <p>{{targetURL()}}{{req()}}</p>
  </div>
  </template>

<script>
import {userService} from '../_services/user.service';
export default {
name:'Activation',
data(){
  return{
    key: function() {return this.getKey()},
    targetURL: function() {return this.redirect()},
    req: function(){this.requestKey()}
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
  },
  redirect(){
        return userService.config.apiUrl+'/api/user/activate/'+this.getKey();
    },
  requestKey(){
     fetch(this.targetURL(),{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'}
                  // 'Authorization': 'Bearer'},
        // body: JSON.stringify()
    }).then(function(response) {
      // console.log(response.headers.Authorization);
      response.text().then(function(text) {
      console.log(text);
      return text;})
      .then(function(text){
        let respToken = JSON.parse(text);
        console.log(typeof text)
        console.log(respToken.token)
        return respToken})
      .then(function(respToken){localStorage.setItem('token',respToken.token)});
  });
  }
}
}
</script>

<style>

</style>