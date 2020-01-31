<template>
  <div class="activation">
    <p>ACTIVATION...</p>
    <!-- <h3>ACTIVATION</h3>
    <p>{{key()}}</p>
    <p>{{targetURL()}}{{req()}}</p>
    <p>{{role}}</p> -->
  </div>
  </template>

<script>
import {userService} from '../_services/user.service';
import { router } from '../_helpers';
export default {
name:'Activation',
data(){
  return{
    key: function() {return this.getKey()},
    targetURL: function() {return this.redirect()},
    req: function(){this.requestKey()},
    role: '',
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
    console.log('getKey')
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


        // console.log(respToken.role)
        // data.role = respToken.role;
        // console.log(role)


        return respToken})
      .then(function(respToken){
        localStorage.setItem('token',respToken.token)
        localStorage.setItem('email',respToken.email)////////email////////////////////////////////
        localStorage.setItem('role',respToken.role) ////////role////////////////////////////////
        console.log(respToken.role)
        // this.role = respToken.role;
        // console.log(this.role)
        if(respToken.role==="ROLE_USER"){
          console.log('ROLE_USER *')
          router.push('/user');
        }else if(respToken.role==="ROLE_BUSINESS"){
          console.log('ROLE_BUSINESS *')
          router.push('/cabinet')
        }else{
          console.log('router *')
          router.push('*')
        };})
      // return role
  });
  }
  
},
    mounted(){

      {{this.requestKey()}}
      {{this.redirect()}}
      

    }
}
</script>

<style>

  div.activation{
    display: block;
    width: 100%;
    height: 100vh;
    background-color: #a3a3a3;
    text-align: center;
    font-size: 36px;
    font-weight: 700;
    line-height: 100vh;
  }
  div.activation p{
    line-height: 1.5;
    display: inline-block;
    vertical-align: middle;
  }
</style>