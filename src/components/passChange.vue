<template>
  <div class = "change" :class="{'on': toggler}">
    <div class = "changeWrapp">
    <button class="close-x" @click="toggler=!toggler"></button>
    </div>
  </div>
</template>

<script>
  import UserProfileReadyPage from '@/views/UserProfileReadyPage.vue'
  export default {

    name:"passChange",
    components: {
        UserProfileReadyPage,
    },
    data(){
        return{
            toggler: false,

            }
        },
  }

</script>

<style>
  .change {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width:100%;
    height:100%;
    background-color:rgba(0, 0, 0, 0.6);
    z-index:5;
  }
  .changeWrapp {
    position: relative;
    width:400px;
    height:490px;
    padding: 87px 50px 64px 50px;
    background-color:rgb(255, 255, 255);
    border-radius: 8px;
  }
  .close-x  {
    position: absolute;
    right: 45px;
    top: 27px;
    width: 14px;
    height: 14px;
    border: none;
    cursor: pointer;
  }
  .close-x:before, .close-x:after {
    position: absolute;
    top: 0px;
    right: 6px;
    content: ' ';
    height: 16px;
    width: 2px;
    background-color: #6F7E95;
  }
  .close-x:before {
    transform: rotate(45deg);
  }
  .close-x:after {
    transform: rotate(-45deg);
  }
</style>