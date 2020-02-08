<template>
  <div>
    <div
      class="google-map"
      ref="googleMap"
    ></div>
    <template v-if="Boolean(this.google) && Boolean(this.map)">
      <slot
        :google="google"
        :map="map"
      />
    </template>
  </div>
</template>

<script>
import GoogleMapsApiLoader from "google-maps-api-loader";

export default {
  props: {
    mapConfig: Object,
    apiKey: String
  },

  data() {
    return {
      google: null,
      map: null
    };
  },

  async mounted() {
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: this.apiKey,
      libraries: ['places, directions, drawing'],
    });
    this.google = googleMapApi;
    this.initializeMap();
  },

  methods: {
    initializeMap() {
        const mapContainer = this.$refs.googleMap;
      this.map = new this.google.maps.Map(mapContainer, this.mapConfig);
    }
  },
  watch:{
      map(newValue,oldValue) {
        if (newValue) {
            // this.$emit('ourMapInTravel',newValue)
            console.log('GoogleMapLoader WATCH map $emit',newValue)
            this.$store.commit('maploader/IS_MAP',newValue)
            // this.$emit('isDoneFuncInTravel')
        }
      },
  }
};
</script>

<style scoped>
.google-map {
  width: 100%;
  min-height: 100vh;
}
</style>
