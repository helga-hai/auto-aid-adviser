<template>
  <a
    v-bind:href=url
    class="nav-link"
>
  <slot></slot>
</a>
</template>

<script>


export default {
    name: 'NavigationLink',
    data(){
      return {
        url: ''
      }
    },
  

}
</script>

<style>
.nav-link{
    color: black;
    font: 900;
    cursor: pointer;
}
</style>