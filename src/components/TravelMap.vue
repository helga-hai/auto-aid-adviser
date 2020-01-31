<template>
<div>
    
    
    <GoogleMapLoader 
        @isDoneFuncInTravel="isDoneFuncInTravel"
        @mapClickInTravel="mapClickInTravel"
        @mapCenterChangedInTravel="mapCenterChangedInTravel"
        @ourMapInTravel="ourMapInTravel"
        :mapConfig="mapConfig"
        apiKey="AIzaSyB_nA80Ha1asyGCQtdcgAGZNtd6Vzr8p3A"
    ><slot name="acompl"/>

        <template v-slot:default="{ google, map }" @isDoneFuncInTravel="isDoneFuncInTravel"> 
 
            <div v-if="isLocationDone">
                <GoogleMapMarker
                    ref="customMarker"
                    :google="google"
                    :map="map"
                    :marker= "curMarker"
                    :clickable="true"
                    :draggable="true"                />
            </div>
            <!-- <div v-if="enterAddress"> 
                <GoogleMapMarker 
                    ref="customMarker"
                    :google="google"
                    :map="map"
                    :marker= "enterMarker"
                    :clickable="true"
                    :draggable="true"
                />
            </div> -->
            <!-- <GoogleMapMarker
                :google="google"
                :map="map"
                :marker= "marker"
            /> -->
            <GoogleMapMarker
                v-for="marker in markers"
                :key="marker.id"
                
                :enableGeolocation="true"
                @focus="onFocus()"
                @blur="onBlur()"
                
                :marker="marker"
                :google="google"
                :map="map"
            />
            <!-- <GoogleMapLine
                v-for="line in lines"
                :key="line.id"
                :path.sync="line.path"
                :google="google"
                :map="map"
            /> -->
        </template>

    </GoogleMapLoader>
</div>
</template>

<script>
// import GoogleMapLoader from './GoogleMapLoader'
// import { mapSettings } from '@/constants/mapSettings'
import GoogleMapLoader from "./GoogleMapLoader";
import GoogleMapMarker from "./GoogleMapMarker";
import { mapSettings } from "@/constants/mapSettings";
import VueGoogleAutocomplete from 'vue-google-autocomplete';
//console.log(VueGoogleAutocomplete)
export default {
    components: {
        GoogleMapLoader,
        GoogleMapMarker,
        VueGoogleAutocomplete,
    },
    props: ['location','address','curMarker', 'enterAddress','enterMarker'],
    data() {
        return {
            markers: [
                {id: "a", position: { lat: 50.456376, lng: 30.380989 }// { lat: 3, lng: 101 } 
                },
                {id: "b", position: { lat: 50.455939, lng: 30.372777 } },
                { id: "c", position: { lat: 50.452482, lng: 30.372232 } }
            ],
            isLocationDone: this.$store.getters['selfLocation/doneLocation'].position,
            ourMapIn: null
        };
    },
    watch:{
        enterAddress(val){
            console.log(this.$store.getters['create/acLatLng'])
            // this.markers.push(this.enterMarker)
            // console.log('enterAddress',this.enterMarker.position, this.ourMapIn)
            this.placeMarkerAndPanTo(this.enterMarker, this.ourMapIn)
            // this.enterMarker = this.$store.getters['create/acLatLng']
            // {
            //     id: "enter",
            //     position: this.$store.getters['create/acLatLng'].position,// { lat: 3, lng: 101 }
            //     content:'address'
            // }
        },
        isLocationDone() {
            // console.log('isLocationDone',isLocationDone)
            this.isLocationDone=true
        },
    },
    created() {
        console.dir(this.$store.getters['selfLocation/doneLocation']);
        
    },
    computed: {
        center(){ 
            if(this.$store.state.selfLocation.location.position){
                return this.$store.state.selfLocation.location.position
            }
            return this.curMarker.position
        },
        mapConfig () {
            return {
                center: this.center,
                zoom: 15,
            }
        },
        mapCenter() { 
            return this.markers[1].position || {lat: this.marker.address.latitude, lng: this.marker.address.longitude}
        },
    },
    methods: {
        onMarkerClick(){
            // console.log("dawdawd")
        },
        isDoneFuncInTravel() {
            console.log('isDoneFuncInTravel')
            this.$emit('isDoneFunc')
        },
        mapClickInTravel({event, m}){
            this.$emit('mapClick', {event, m}) 
            this.placeMarkerAndPanTo(event, m) 
        },
        mapCenterChangedInTravel(e){
            this.$emit('mapCenterChanged', e)  
        },
        placeMarkerAndPanTo(event, map) {
            console.log('placeMarkerAndPanTo')
            console.log(event, map)
            var marker = new google.maps.Marker({
                position: event.latLng || event.position,
                map: map,
                icon: 'http://maps.google.com/mapfiles/kml/paddle/ylw-circle.png'
            });
            console.log(event.latLng || event.position)
            map.panTo(event.latLng || event.position);
            this.$store.dispatch('create/GET_ENCODING', event.latLng)
        },
        ourMapInTravel(val){
            this.$emit('ourMap',val)
            this.ourMapIn = val
        },
        getAddressData: function (addressData, placeResultData, id) {
            this.address = addressData;
        },
        // geolocate() {
        //     console.log('geolocate')
        //     if (this.enableGeolocation) {
        //         if (navigator.geolocation) {
        //             navigator.geolocation.getCurrentPosition(position => {
        //             let geolocation = {
        //                 lat: position.coords.latitude,
        //                 lng: position.coords.longitude
        //             };
        //             let circle = new google.maps.Circle({
        //                 center: geolocation,
        //                 radius: position.coords.accuracy
        //             });
        //             this.autocomplete.setBounds(circle.getBounds());
        //             });
        //         }
        //     }
        // },
        // getDirection: function() {
        //     var directionsService = new google.maps.DirectionsService;
        //     var directionsDisplay = new google.maps.DirectionsRenderer({draggable:true});
        //     console.log( 'directionsDisplay')
        //     console.log( directionsDisplay)
        //     directionsDisplay.setMap(this.$refs.googleMap.$mapObject);
        //     // console.log('directionsService',directionsService)
        //     // console.log('directionsDisplay',directionsDisplay)
        //     // console.log('this.$refs.mapRef.$mapObject',this.$refs.mapRef.$mapObject)
        //     //google maps API's direction service
        //     function calculateAndDisplayRoute(directionsService, directionsDisplay, start, destination) {
        //     directionsService.route({
        //         origin: this.markers[0].position,
        //         destination: this.markers[1].position,
        //         travelMode: 'DRIVING'
        //     }, function(response, status) {
        //         if (status === 'OK') {
        //         directionsDisplay.setDirections(response);
        //         } else {
        //         window.alert('Directions request failed due to ' + status);
        //         }
        //     });
        //     }

        //     console.log(directionsService);
        //     console.log(this.destination);
        //     console.log('hmmm yha');
        //     calculateAndDisplayRoute(directionsService, directionsDisplay, this.coords, this.destination);
        // }
    }
}
</script>

<style>

</style>