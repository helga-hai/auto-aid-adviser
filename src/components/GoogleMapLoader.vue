<template>
  <div class="map-loader">
    <!-- <slot name="acompl"/> -->
    <div class="google-map" ref="googleMap"></div>
    <template v-if="Boolean(this.google) && Boolean(this.map)">
      <slot
        :google="google"
        :map="map"
      />
    </template>
    <button id="dir" @click="calculateAndDisplayRoute( {from:paramOrigin,to:paramDest} )">Побудувати маршрут</button>
  </div>
</template>

<script>
import GoogleMapsApiLoader from 'google-maps-api-loader';
import MyMixin from '../mixins/mymixin';
export default {
    mixins: [MyMixin],
    props: {
        mapConfig: Object,
        apiKey: String,
        center: Object
    },
    data() {
        return {
            google: null,
            map: null,
            directionsDisplay: null,
            directionsService: null,
            config: null,
        }
    },
    computed:{
      toggleAddres() {
          return this.$store.getters['selfLocation/toggleAddres']
      },
      location() { return this.$store.state.search.location },
      // location_address() {}
      selected() { return this.$store.getters['search/SELECTED'] },
      from() { return this.$store.getters['search/FROM'] },
      to() { return this.$store.getters['create/TO'] },
      isLocation()  { return this.$store.getters['search/ISLOCATION'] },
    },
    watch: {
      // location: {
      //   position(val){
      //     console.log('locationlocationlocationlocation')
      //   },
      //   deep: true
      // },
      // location(newVal){
      //   console.log('0000')
      //   if(newVal){
      //     console.log('LOC',newVal)
      //     const tmp = newVal.position;
      //     const isSelfLoc = true
      //     // this.$store.dispatch('create/GET_ENCODING_FOR_SEARCH', {tmp,isSelfLoc})
      //     this.$store.dispatch('search/GET_ENCODING_MY_LOCATION', tmp)
      //   }
      // },
      isLocation(){
        console.log('13164242',this.location.position)
        this.$store.dispatch('search/GET_ENCODING_MY_LOCATION', this.location.position)
      },
      selected(newVal){
        console.log('123dfsdfsdd,',newVal)
        const tmp = newVal[0].position
        console.log('123dfsdfsdd,',tmp)
        if(tmp) {
        console.log('123dfsdfsdd,',tmp)
          this.$store.dispatch('create/GET_ENCODING_FOR_SEARCH', tmp)
        }
      },
      toggleAddres(newVal, oldVal) {
          this.config.center = this.$store.getters['selfLocation/ac_location']
          this.map.setCenter(this.config.center)
      },
      map(newValue,oldValue) {
        if (newValue) {
            this.$emit('ourMapInTravel',newValue)
            console.log('GoogleMapLoader WATCH map $emit')
            this.$store.commit('search/IS_MAP',newValue)
            this.$emit('isDoneFuncInTravel')
            var th = this;

            this.map.addListener('click', function(e) {  /// CLICK ///
              var event = e;
              var m = th.map;
              th.$emit('mapClickInTravel', {event, m})
            });

            this.map.addListener('center_changed', function(e) { /// center_changed ///
              var event = e;
              var m = th.map;
              th.$emit('mapCenterChangedInTravel', e)
            });
        }
      },
      google(newValue,oldValue) {
        if (newValue ) {
        }
      }
    },
    async mounted() {
        this.config = this.mapConfig
        const googleMapApi = await GoogleMapsApiLoader({
            apiKey: this.apiKey,
            libraries: ['places, directions, drawing'],
        })
        this.google = googleMapApi
        this.initializeMap()
        this.$store.dispatch('search/getLocation')
    },
    methods: {
        initializeMap() {

            const mapContainer = this.$refs.googleMap;
            this.directionsService = new google.maps.DirectionsService();
            //var directionsRenderer = new google.maps.DirectionsRenderer();
            this.map = new this.google.maps.Map(mapContainer, this.config);
            this.directionsDisplay = new google.maps.DirectionsRenderer({
              map: this.map,
              draggable: true
            });
            
            this.directionsDisplay.setMap(this.map);
            this.directionsDisplay.setPanel(document.getElementById('directionsPanel'));

            var control = document.getElementById('autocompletePannel');
            if(control) { 
              control.style.display = 'block';
              map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
            }
        },
        calcRoute() {
        },
        
        calculateAndDisplayRoute({
          directionsService, 
          directionsDisplay,
          from=this.from, 
          to=this.to
          }) {
            console.log('directionsService',directionsService)
            console.log('directionsRenderer',directionsDisplay)
            directionsService = this.directionsService
            directionsDisplay = this.directionsDisplay
            directionsService.route(
              {
                origin: {query: from},//document.getElementById('start').value
                destination: {query: to},//document.getElementById('end').value
                travelMode: 'DRIVING'
              },
              function(response, status) {
                if (status === 'OK') {
                  directionsDisplay.setDirections(response);
                } else {
                  window.alert('Directions request failed due to ' + status);
                }
              });
          },
        getDirection() {
          }
        }
}
</script>

<style lang="scss">
.map-loader {
  .google-map {
    width: 100%;
    height: calc(100vh - 86px);
    position:relative
  }

  #directionsPanel {
    width: 100%;
    min-height: 40px;
    max-height: 250px;
    overflow-y:scroll;
    transition: height 1s;
    background: #dcdcdc
          /* position: absolute;
          top: 10px;
          left: 25%;
          z-index: 5;
          background-color: #fff;
          padding: 5px;
          border: 1px solid #999;
          text-align: center;
          font-family: 'Roboto','sans-serif';
          line-height: 30px;
          padding-left: 10px; */
  }
  #autocompletePannel {
    position: absolute;
    top: 10px;
    left: 211px;
    color: #000000;
    z-index: 5;
    background-color: #fff;
    padding: 5px;
    border-radius: 2px;
    box-shadow: 1px 1px 3px #c9c9c9;
    text-align: center;
    font-family: 'Roboto','sans-serif';
    line-height: 30px;
    padding-left: 10px;
    width: calc(100% - 266px);
  }
  #dir {
    position: absolute;
    bottom: 0;
    text-transform: uppercase;
    background: white;
    padding: 9px 17px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
}
</style>