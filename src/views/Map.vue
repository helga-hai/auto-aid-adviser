<template>
    <div class="block">
      <div v-if="errorStr">
        Sorry, but the following error
        occurred: {{errorStr}}
      </div>
      
      <div v-if="gettingLocation">
        <i>Getting your location...</i>
      </div>
      
      <div v-if="location">
        Your location data is {{ location.coords.latitude }}, {{ location.coords.longitude}}
      </div>
        <GmapMap  :center="myCoord" :zoom="17" style="width: 100%; height: 500px" ref="mapRef">
            <!-- <GmapMarker v-for="(m, index) in markers" :key="index" 
              :position="m.position" 
              :clickable="true" 
              :draggable="true" 
              @click="center=myCoord"
              >
                <!--@click="infoWindowShown = true"  <GmapInfoWindow :opened="infoWindowShown" @closeclick="infoWindowShown = false"->
            </GmapMarker> -->
            <GmapMarker
              :position="myCoord" 
              :clickable="true" 
              :draggable="true"
              title='Home'
              label="label"
              >
                <!--@click="infoWindowShown = true"  <GmapInfoWindow :opened="infoWindowShown" @closeclick="infoWindowShown = false"-->
            </GmapMarker>
        </GmapMap >
    </div>
</template>

<script>
export default {
    name: 'Map',
    components:{
    },
    data() {
        return {
          infoWindowShown: false,
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
    },
    mounted () {
      this.$refs.mapRef.$mapPromise.then((map) => {
        //map.panTo({lat: this.mylatitude, lng: this.myLongitude})
      })
    },
    computed: {
      errorStr() {
        return this.$store.state.selfLocation.errorStr;
      },
      gettingLocation() {
        return this.$store.state.selfLocation.gettingLocation;
      },
      location() {
        return this.$store.state.selfLocation.location;
      },
      myCoord() {
        return {
          lat: this.$store.state.selfLocation.location.coords.latitude,
          lng: this.$store.state.selfLocation.location.coords.longitude
        }
      }
      
    },
    created() {
      //do we support geolocation
      this.$store.dispatch('selfLocation/getLocation');
    }
}
</script>

<style>

</style>