<template>
    <div class="block" :ref="refProp">
    </div>
</template>

<script>
export default {
    name: 'DirectionsRenderer',
   // events: ['directions_changed'],
    beforeCreate(options) {},
    afterCreate(directionsRendererInstance) {
        //this.directionsDisplay.setMap(this.$attrs.ref.$mapObject)
        // // var directionsService = new google.maps.DirectionsService;
        // // directionsService.route({
        // //     origin: this.$attrs.from ? this.$attrs.from : this.$attrs.to,
        // //     destination: this.$attrs.to ? this.$attrs.to : this.$attrs.from,
        // //     travelMode: 'DRIVING'
        // // }, function(response, status) {
        // //     if (status === 'OK') {
        // //         directionsRendererInstance.setDirections(response);
        // //     } else {
        // //         //window.alert('Directions request failed due to ' + status);
        // //     }
        // // });
        console.log(directionsRendererInstance)
    },
    props: ['propRef','propFrom','propTo'],
    data() {
        return {
            directOpt:{
                //directions: DirectionsResult,
                draggable: true,
                hideRouteList: true,
                //infoWindow: InfoWindow,
                map: ()=>this.$refs.refProp.$mapObject,
                //panel: Node (<div> to display directions steps),
                //routeIndex: int (index of route within DirectionsResult),
            },
            hasDirectionsResult: true,
        }
    },
    methods: {
        
      getDirection: function() {
          var directionsService = new google.maps.DirectionsService;
          var directionsDisplay = new google.maps.DirectionsRenderer({draggable:true});
          console.log( 'directionsDisplay')
          console.log( directionsDisplay)
          directionsDisplay.setMap(this.$refs[mapRef].$mapObject);
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

<style>

</style>