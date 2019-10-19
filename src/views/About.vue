<template>
  <div class="about">
    <h1>This is an about page</h1>

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
     <travel-map/>
  </div>
</template>

<script>

import TravelMap from '@/components/TravelMap.vue'
export default {
  components: {
    TravelMap
  },
  data() {
    return {
      location:null,
      gettingLocation: false,
      errorStr:null
    }
  },
  // mounted() {
  //   var x = document.getElementById("demo");
  //   function getLocation() {
  //       if (navigator.geolocation) {
  //           navigator.geolocation.getCurrentPosition(showPosition);
  //       } else {
  //           x.innerHTML = "Geolocation is not supported by this browser.";
  //       }
  //   }
  //   function showPosition(position) {
  //       x.innerHTML = "Latitude: " + position.coords.latitude + 
  //       "<br>Longitude: " + position.coords.longitude; 
  //   }
  //   getLocation()

  // },
  created() {
    //do we support geolocation
    if(!("geolocation" in navigator)) {
      this.errorStr = 'Geolocation is not available.';
      return;
    }

    this.gettingLocation = true;
    // get position
    navigator.geolocation.getCurrentPosition(pos => {
      this.gettingLocation = false;
      this.location = pos;
    }, err => {
      this.gettingLocation = false;
      this.errorStr = err.message;
    })
  }
}
</script>

<style>

</style>