<template>
    <div class="block">
        <google-map :center="center" :zoom="7" style="width: 100%; height: 500px">
            <google-marker v-for="(m, index) in markers" :key="index" :position="m.position" :clickable="true" :draggable="true" @click="center=m.position"></google-marker>
        </google-map>
    </div>
</template>

<script>
//import GoogleMap from 'VueGoogleMaps.Map';
//import GoogleMarker from 'VueGoogleMaps.Marker';
//console.log(GoogleMap)
export default {
    //name: 'Map',
    components:{
        //GoogleMap,
        //GoogleMarker
    },
    data() {
        return {
          center: {
            lat: 10.0,
            lng: 10.0
          },
          markers: [{
            position: {
              lat: 10.0,
              lng: 10.0
            }
          }, {
            position: {
              lat: 11.0,
              lng: 11.0
            }
          }]
        }
    }
}
</script>

<style>

</style>