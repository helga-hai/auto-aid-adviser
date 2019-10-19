<template>
    <div class="block">
        <google-map :center="center" :zoom="17" style="width: 100%; height: 500px">
            <google-marker v-for="(m, index) in markers" :key="index" :position="m.position" :clickable="true" :draggable="true" @click="center=m.position"></google-marker>
        </google-map>
    </div>
</template>

<script>
export default {
    components:{
    },
    data() {
        return {
          center: {
            lat: 50.453831977720775,
            lng: 30.324912719726626
          },
          markers: [{
            position: {
              lat: 50.436960,
              lng: 30.532720
            }
          }, {
            position: {
              lat: 50.453831977720775,
              lng: 30.324912719726626
            }
          }]
        }
    }
}
</script>

<style>

</style>