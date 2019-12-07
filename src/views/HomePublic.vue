<template>
  <div>
      <nav-component/>
      <websocket/>
  </div>
</template>

<script>
import NavComponent from '../components/NavComponent';
import websocket from '../components/websocket';
export default {
    name: 'HomePublic',
    components: {
        NavComponent,
        websocket
    },
    methods: {
        
    }
}
</script>

<style scoped>
</style>