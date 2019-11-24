<template>
<div>
    
   
    <GoogleMapLoader
        :mapConfig="mapConfig"
        apiKey="AIzaSyB_nA80Ha1asyGCQtdcgAGZNtd6Vzr8p3A"
    >

        <template v-slot:default="{ google, map }"> <h3 class="title is-4" >
        <!-- <button @click="$refs.vAutoComplete.geolocate()">force current location</button> -->
    </h3>
            <vue-google-autocomplete 
                ref="vAutoComplete"
                :country="['ua']"
                id="autocompletePannel"
                classname="search-input home-input"
                placeholder="Введіть адресу"
                v-on:placechanged="getAddressData" 
            >
            </vue-google-autocomplete>
            <GoogleMapMarker v-if="address"
                :google="google"
                :map="map"
                :marker= "marker"
            />
            <!-- <GoogleMapMarker
                v-for="marker in markers"
                :key="marker.id"
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
        <template v-slot:other="otherSlotProps">
        </template>

    </GoogleMapLoader>
</div>
</template>

<script>
// import GoogleMapLoader from './GoogleMapLoader'
// import { mapSettings } from '@/constants/mapSettings'
import GoogleMapLoader from "./GoogleMapLoader";
import GoogleMapMarker from "./GoogleMapMarker";
import GoogleMapLine from "./GoogleMapLine";
import { mapSettings } from "@/constants/mapSettings";
import VueGoogleAutocomplete from 'vue-google-autocomplete';

export default {
    components: {
        GoogleMapLoader,
        GoogleMapMarker,
        GoogleMapLine,
        VueGoogleAutocomplete,
    },
    props: ['myPosition'],
    data() {
        return {
            address: '',
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
            lines: [
                {
                    id: "1",
                    path: [{ lat: 50.456376, lng: 30.380989 }, { lat: 50.455939, lng: 30.372777 }]
                },
                {
                    id: "2",
                    path: [{ lat: 50.455939, lng: 30.372777 }, { lat: 50.452482, lng: 30.372232 }]
                }
            ]
        };
    },
    computed: {
        mapConfig () {
            return {
                //...mapSettings, // індивідуальні налаштування для вигляду карти
                //center: { lat: 0, lng: 0 }
                center: this.mapCenter,
                zoom: 15,
            }
        },
        mapCenter() {
            console.log(this.markers[1].position)
            console.dir(this.myPosition.position)
            //map.setCenter({lat:lat, lng:lng});
            //return this.markers[1].position || this.myPosition.position  
            return this.markers[1].position || {lat: this.marker.address.latitude, lng: this.marker.address.longitude}
        },
        marker () {
            return {
                id: "a",
                position: { lat: this.address.latitude, lng: this.address.longitude }// { lat: address.latitude, lng: address.longitude }
            }
        }
    },
    mounted() {
        //navigator.geolocate()
        // console.log('navigator')
        // console.log(navigator)
        // navigator.geolocate()
        // this.$refs.vAutoComplete.update()
        //console.log(this.$refs.vAutoComplete.geolocate())
    },
    methods: {
        getAddressData: function (addressData, placeResultData, id) {
            this.address = addressData;
        }
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