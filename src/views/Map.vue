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
      
      <input ref="autocomplete" 
          placeholder="Search" 
          class="search-location"
          onfocus="value = ''" 
          type="text" />  
      <!-- <vue-google-autocomplete
        country="ua"
        type="(cities)"
        ref="address"
        id="start"
        classname="form-control"
        placeholder="Starting point"
        v-on:placechanged="getAddressDataOne"
      >enable-geolocation="true" @input="setAddress"
      </vue-google-autocomplete> -->
      <GmapMap :center="coords" :zoom="17" style="width: 100%; height: 500px" ref="mapRef">
            <!-- <GmapMarker v-for="(m, index) in markers" :key="index" 
              :position="m.position" 
              :clickable="true" 
              :draggable="true" 
              @click="center=myCoord"
              >
                <!--@click="infoWindowShown = true"  <GmapInfoWindow :opened="infoWindowShown" @closeclick="infoWindowShown = false"->
            </GmapMarker>  v-if="hasDirectionsResult"
              :directions="directionsResult" -->
            <DirectionsRenderer  v-if="hasDirectionsResult" :options='directOpt'
            :from="destination" :to="center"
            />
            <GmapMarker
              :position="this.coords" 
              :clickable="true" 
              :draggable="true"
              title='Home'
              label="label"
              >
                <!--@click="infoWindowShown = true"  <GmapInfoWindow :opened="infoWindowShown" @closeclick="infoWindowShown = false"-->
            </GmapMarker>
            <!-- <ground-overlay
              source="https://i.imgur.com/Jyech6X.png" 
              :bounds="{
                north: 42.30283061090956,
                south: 42.29889440158543,
                east: -83.69653444907374,
                west: -83.70049861111448
              }" 
            :opacity=".6"></ground-overlay> -->
      </GmapMap >
      <button @click="getDirection">get direction</button>
    </div>
</template>

<script>
import DirectionsRenderer from '../sources/DirectionsRenderer';
import VueGoogleAutocomplete from 'vue-google-autocomplete'
export default {
    name: 'Map',
    components:{
      DirectionsRenderer,
      VueGoogleAutocomplete
    },
    data() {
      return {
        directOpt:{
              //directions: DirectionsResult,
              draggable: true,
              hideRouteList: true,
              //infoWindow: InfoWindow,
              map: ()=>this.$refs.mapRef.$mapObject,
              //panel: Node (<div> to display directions steps),
              //routeIndex: int (index of route within DirectionsResult),
              },
        hasDirectionsResult: true,
        infoWindowShown: false,
        center: {
          lat: 42.30283061090956,//50.453831977720775,
          lng: -83.69653444907374//30.324912719726626
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
        }],
        coords: {
          lat: 50.436960,
          lng: 30.532720
        },
        destination: {
            lat: 50.453831977720775,
            lng: 30.324912719726626
        }
      }
    },
    mounted () {
      console.log('MOUNTED About ')
      //this.initMap()
      window.vueGoogleMapsInit(google)
      this.$gmapApiPromiseLazy().then(() => { var bounds = new google.maps.LatLngBounds() /* etc */ })//https://stackoverflow.com/questions/33641663/why-isnt-this-an-instance-of-map-of-google-maps-map-invalidvalueerror-setmap
      this.autocomplete = new google.maps.places.Autocomplete(
        (this.$refs.autocomplete),
        {types: ['geocode']}
      );
      // console.dir(DirectionsRenderer)
      // this.$refs.mapRef.$mapPromise.then((map) => {
      //   console.log('map',map)
      //   map.panTo({lat: this.mylatitude, lng: this.myLongitude})
      // })
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
        console.log(this.$store.state.selfLocation.location.coords.latitude)
        return {
          lat: this.$store.state.selfLocation.location.coords.latitude,
          lng: this.$store.state.selfLocation.location.coords.longitude
        }
      },
    	directionsResult () {
      	return this.hasDirectionsResult && this.$directionsResult
      }
      
    },
    created() {
      //do we support geolocation
      this.$store.dispatch('selfLocation/getLocation');
    },
    methods: {
      
      initMap() {
        console.log('THIS.INITMAP')
        this.map = new google.maps.Map(document.querySelector('.vue-map'), {
        //this.map = new google.maps.Map(this.$refs.mapRef, {
                   center: {
                     lat: this.center.lat,
                     lng: this.center.lng
                   },
                   zoom: 5
               });
      },
      getDirection: function() {

          var directionsService = new google.maps.DirectionsService;
          var directionsDisplay = new google.maps.DirectionsRenderer({draggable:true});
          console.log( 'directionsDisplay')
          console.log( directionsDisplay)
          directionsDisplay.setMap(this.$refs.mapRef.$mapObject);
          // console.log('directionsService',directionsService)
          // console.log('directionsDisplay',directionsDisplay)
          // console.log('this.$refs.mapRef.$mapObject',this.$refs.mapRef.$mapObject)
          //google maps API's direction service
          function calculateAndDisplayRoute(directionsService, directionsDisplay, start, destination) {
            directionsService.route({
              origin: start,
              destination: destination,
              travelMode: 'DRIVING'
            }, function(response, status) {
              if (status === 'OK') {
                directionsDisplay.setDirections(response);
              } else {
                window.alert('Directions request failed due to ' + status);
              }
            });
          }

          console.log(directionsService);
          console.log(this.destination);
          console.log('hmmm yha');
          calculateAndDisplayRoute(directionsService, directionsDisplay, this.coords, this.destination);
        }
      }

}
</script>

<style scoped>
*, *::after, *::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

body {
  background-color: #dcdde1;
  color: #2f3640;
  padding: 3rem;
}

.search-location {
  display: block;
  width: 60vw;
  margin: 0 auto;
  margin-top: 5vw;
  font-size: 20px;
  font-weight: 400;
  outline: none;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 10px;
}
</style>