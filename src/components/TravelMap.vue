<template>
<div>
    
    
    <GoogleMapLoader @isDoneFuncInTravel="isDoneFuncInTravel"
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
                    :draggable="true"
                   
                />
            </div>
            <!-- <GoogleMapMarker
                :google="google"
                :map="map"
                :marker= "marker"
            /> -->
            <!-- <GoogleMapMarker
                v-for="marker in markers"
                :key="marker.id"
                
                :enableGeolocation="true"
                @focus="onFocus()"
                @blur="onBlur()"
                
                :marker="marker"
                :google="google"
                :map="map"
            /> -->
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
    props: ['location','address','curMarker',],
    data() {
        return {
            
            //address: '',
            // curMarker: {
            //     id: "a",
            //     position: { lat: 50.456376, lng: 30.380989 },// { lat: 3, lng: 101 }
            //     content:'Place de la Bastille'
            // },
            markers: [
                {
                    id: "a",
                    position: { lat: 50.456376, lng: 30.380989 }// { lat: 3, lng: 101 }
                },
                {
                    id: "b",
                    position: { lat: 50.455939, lng: 30.372777 }// { lat: 5, lng: 99 }
                },
                {
                    id: "c",
                    position: { lat: 50.452482, lng: 30.372232 }// { lat: 6, lng: 97 }
                }
            ],
            isLocationDone: this.$store.getters['selfLocation/doneLocation'].position
        };
    },
    watch:{
        isLocationDone() {
            console.log('isLocationDone',isLocationDone)
            this.isLocationDone=true
        },
        curMarker(newVal,oldVal){
            //this.address=newVal
            console.log('WATCH curMarker')
        },
        address(newVal,oldVal){
            //this.address=newVal
            console.log('WATCH address')
        },
        location(newVal,oldVal) {
            console.log('WATCH location')
        }
    },
    created() {
        console.dir(this.$store.getters['selfLocation/doneLocation'].position);
        // this.$store.watch(
        //     (state)=>{
        //         return this.$store.state.selfLocation.gettingLocation // could also put a Getter here
        //     },
        //     (newValue, oldValue)=>{
        //         //something changed do something
        //         console.log(oldValue)
        //         console.log(newValue)
        //         //this.getConsumption();
        //     },
        //     //Optional Deep if you need it
        //         {
        //         deep:true
        //         }
        // )
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
                //...mapSettings, // індивідуальні налаштування для вигляду карти
                //center: { lat: 0, lng: 0 }
                center: this.center,
                zoom: 15,
            }
        },
        mapCenter() {
           // console.log(this.markers[1].position)
            //console.dir(this.myPosition.position)
            //map.setCenter({lat:lat, lng:lng});
            //return this.markers[1].position || this.myPosition.position  
            return this.markers[1].position || {lat: this.marker.address.latitude, lng: this.marker.address.longitude}
        },
        // marker () {
        //     console.dir('this.$refs.customMarker')
        //     console.dir(this.$refs.customMarker)
        //     return {
        //         id: "a",
        //         position: { lat: this.address.latitude, lng: this.address.longitude }// { lat: address.latitude, lng: address.longitude }
        //     }
        // }
    },
    // update() {
    //     navigator.geolocate()
    //      console.log('navigator')
    //      console.log(navigator)
    //      console.log(this.$refs.vAutoComplete)
    //     // navigator.geolocate()
    //     // this.$refs.vAutoComplete.update()
    //     //console.log(this.$refs.vAutoComplete.geolocate())
    // },
    methods: {
        onMarkerClick(){
            console.log("dawdawd")
        },
        isDoneFuncInTravel() {
            console.log('isDoneFuncInTravel')
            this.$emit('isDoneFunc')
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