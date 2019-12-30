<template>
  <div>
    <!-- <slot name="acompl"/> -->
    <div class="google-map" ref="googleMap"></div>
    <template v-if="Boolean(this.google) && Boolean(this.map)">
      <slot
        :google="google"
        :map="map"
      />
    </template>
    <button id="dir" @click="calculateAndDisplayRoute( {from:paramOrigin,to:paramDest} )">get directions</button>
  </div>
</template>

<script>
import GoogleMapsApiLoader from 'google-maps-api-loader';
export default {
    props: {
        mapConfig: Object,
        apiKey: String,
        //paramOrigin: new google.maps.LatLng(50.450100,30.523399),
        //paramDest: new google.maps.LatLng(50.450100,30.523399),
    },
    data() {
        return {
            google: null,
            map: null,
            directionsDisplay: null,
            directionsService: null,
            //navigator_location: null
        }
    },
    watch: {
      map(newValue,oldValue) {
        if (newValue) {
            console.log('GoogleMapLoader WATCH map $emit')
          this.$emit('isDoneFuncInTravel')
        }
      },
      google(newValue,oldValue) {
        if (newValue ) {
        }
      }
    },
    async mounted() {
        //console.log('navigator')
        //console.log(this.$store.state.selfLocation.gettingLocation)
        const googleMapApi = await GoogleMapsApiLoader({
            apiKey: this.apiKey,
            libraries: ['places, directions, drawing'],
        })
        this.google = googleMapApi
        this.initializeMap()
        //this.getDirection()
        // .then(function(googleApi) {
        //     var autocomplete = new googleApi.maps.places.AutocompleteService();
        // }, function(err) {
        //     console.error(err);
        // });
        // // GoogleMapsApiLoader().then(function(googleApi) {
        // //     var autocomplete = new googleApi.maps.places.AutocompleteService();
        // //     console.log('autocomplete',autocomplete)
        // // }, function(err) {
        // //     console.error(err);
        // // });

        //this.calcRoute()
    },
    methods: {
        initializeMap() {

            const mapContainer = this.$refs.googleMap;
            this.directionsService = new google.maps.DirectionsService();
            //var directionsRenderer = new google.maps.DirectionsRenderer();
            this.map = new this.google.maps.Map(mapContainer, this.mapConfig);
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

            
            // // var buttonD = document.getElementById('dir');
            // // buttonD.style.display = 'block';
            // // map.controls[google.maps.ControlPosition.TOP_LEFT].push(buttonD);
            //map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(button);
            //var onChangeHandler = function() {
            //  this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay);
              
            //};
            //document.getElementById('start').addEventListener('change', onChangeHandler);
            //document.getElementById('end').addEventListener('change', onChangeHandler);
        },
        calcRoute() {
          // const directionsService = new google.maps.DirectionsService;
          // var start = {lat:50.450100,lng:30.523399};//"cambridge, ma";
          // var end = {lat:50.254280,lng:28.659010};//"boston, ma";
          // var request = {
          //   origin: start,
          //   destination: end,
          //   travelMode: google.maps.TravelMode.DRIVING
          // };
          // directionsService.route(request, function(result, status) {
          //   if (status == google.maps.DirectionsStatus.OK) {
          //     directionsDisplay.setDirections(result);
          //   }
          // });
        },
        
        calculateAndDisplayRoute({
          directionsService, 
          directionsDisplay,
          from='chicago, il', 
          to='oklahoma city, ok'
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
        // onChangeHandler() {
        //   this.calculateAndDisplayRoute(directionsService, directionsRenderer);
        // },
        // calculateAndDisplayRoute(directionsService, directionsDisplay) {
        // this.directionsService.route(
        //     {
        //       origin: {query: 'Gagarina Street'},
        //       destination: {query: 'Derybasivska Street'},
        //       travelMode: 'DRIVING'
        //     },
        //     function(response, status) {
        //       if (status === 'OK') {
        //         this.directionsDisplay.setDirections(response);
        //       } else {
        //         window.alert('Directions request failed due to ' + status);
        //       }
        //     });
        // },
        // calculateAndDisplayRoute(directionsService, directionsDisplay, start={ lat: 50.455939, lng: 30.372777 }, destination={ lat: 50.452482, lng: 30.372232 }) {
        //   directionsService = this.directionsService;
        //   directionsDisplay = this.directionsDisplay;
        //   console.dir(directionsDisplay)
        //   directionsService.route({
        //       origin: start,
        //       destination: destination,
        //       travelMode: 'DRIVING'
        //   }, function(response, status) {
        //       if (status === 'OK') {
        //       directionsDisplay.setDirections(response);
        //       } else {
        //       window.alert('Directions request failed due to ' + status);
        //       }
        //   });
        // },
        getDirection() {
              // var directionsService = this.google.maps.DirectionsService;
              // var directionsDisplay = this.google.maps.DirectionsRenderer({draggable:true});
              // // console.log( 'directionsDisplay')
              // // console.log( directionsDisplay)
              // this.google.maps.DirectionsDisplay.setMap(this.$refs.googleMap.$mapObject);
              // // console.log('directionsService',directionsService)
              // // console.log('directionsDisplay',directionsDisplay)
              // // console.log('this.$refs.mapRef.$mapObject',this.$refs.mapRef.$mapObject)
              // //google maps API's direction service
              // function calculateAndDisplayRoute(directionsService, directionsDisplay, start={ lat: 50.455939, lng: 30.372777 }, destination={ lat: 50.452482, lng: 30.372232 }) {
              //   directionsService.route({
              //       origin: start,
              //       destination: destination,
              //       travelMode: 'DRIVING'
              //   }, function(response, status) {
              //       if (status === 'OK') {
              //       directionsDisplay.setDirections(response);
              //       } else {
              //       window.alert('Directions request failed due to ' + status);
              //       }
              //   });
              // }

              // console.log(directionsService);
              // console.log(this.destination);
              // console.log('hmmm yha');
              // calculateAndDisplayRoute(directionsService, directionsDisplay);
          }
        }
}
</script>

<style>
.google-map {
  width: 100%;
  /* min-height: calc(100vh - 56px); */
  min-height: calc(100vh - 86px);
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
  bottom:0;
  text-transform: uppercase;
  background: yellow;
}
</style>