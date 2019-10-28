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
    }
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