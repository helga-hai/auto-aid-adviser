<template>
  <div>
    <div class="google-map" ref="googleMap"></div>
    <template v-if="Boolean(this.google) && Boolean(this.map)">
      <slot
        :google="google"
        :map="map"
      />
    </template>
    <button @click="calcRoute">get directions</button>
  </div>
</template>

<script>
import GoogleMapsApiLoader from 'google-maps-api-loader'
export default {
    props: {
        mapConfig: Object,
        apiKey: String
    },
    data() {
        return {
            google: null,
            map: null
        }
    },
    async mounted() {
        const googleMapApi = await GoogleMapsApiLoader({
            apiKey: this.apiKey,
            libraries: ['places, directions, drawing'],
        })
        this.google = googleMapApi
        this.initializeMap()
        
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
            
            this.map = new this.google.maps.Map(mapContainer, this.mapConfig);
            const directionsDisplay = new google.maps.DirectionsRenderer({
              map: this.map
            });
            console.dir(directionsDisplay)
        },
        calcRoute() {
          const directionsService = new google.maps.DirectionsService;
          var start = {lat:50.450100,lng:30.523399};//"cambridge, ma";
          var end = {lat:50.254280,lng:28.659010};//"boston, ma";
          var request = {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.DRIVING
          };
          directionsService.route(request, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(result);
            }
          });
        },////////

        // methods: {
        //   getDirection: function() {

        //     var directionsService = new google.maps.DirectionsService;
        //     var directionsDisplay = new google.maps.DirectionsRenderer;
        //     directionsDisplay.setMap(this.$refs.googleMap.$mapObject);
        //     console.log('directionsService',directionsService)
        //     console.log('directionsDisplay',directionsDisplay)
        //     console.log('this.$refs.googleMap.$mapObject',this.$refs.googleMap.$mapObject)
        //     //google maps API's direction service
        //     function calculateAndDisplayRoute(directionsService, directionsDisplay, start, destination) {
        //       directionsService.route({
        //         origin: start,
        //         destination: destination,
        //         travelMode: 'DRIVING'
        //       }, function(response, status) {
        //         if (status === 'OK') {
        //           directionsDisplay.setDirections(response);
        //         } else {
        //           window.alert('Directions request failed due to ' + status);
        //         }
        //       });
        //     }

        //     console.log(this.markersOut[1]['position']);
        //     console.log(this.markersOut[2]['position']);
        //     console.log('hmmm yha');
        //     calculateAndDisplayRoute(directionsService, directionsDisplay, this.coords, this.destination);
        //   }
        // }
    }
// var directionsDisplay;
//     var directionsService;
//     var map;

//     function initMap() {
//       directionsService = new google.maps.DirectionsService;
//       var chicago = new google.maps.LatLng(41.850033, -87.6500523);
//       var map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 8,
//         center: chicago
//       });
//       directionsDisplay = new google.maps.DirectionsRenderer({
//         map: map
//       });
//       calcRoute();
//     }

//     function calcRoute() {
//       var start = "cambridge, ma";
//       var end = "boston, ma";
//       var request = {
//         origin: start,
//         destination: end,
//         travelMode: google.maps.TravelMode.DRIVING
//       };
//       directionsService.route(request, function(result, status) {
//         if (status == google.maps.DirectionsStatus.OK) {
//           directionsDisplay.setDirections(result);
//         }
//       });
//     };////////
}
</script>

<style scoped>
.google-map {
  width: 100%;
  min-height: calc(100vh - 56px);
}
</style>