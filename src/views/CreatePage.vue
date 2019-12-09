<template>
    <business-layout>
        <div class="registrStep1">
            <h1>Реєстрація об’єкту</h1>
            <form>
                <div class="registrStep1__address">
                    <label for="name">Вкажіть місцезнаходження об’єкту на карті або введіть адресу</label>
                    
                    <div class="auto-complete-input" slot="acompl" v-if="isDone">
                        <vue-google-autocomplete 
                            ref="vAutoComplete"
                            :country="['ua']"
                            id="autocompletePannel"
                            classname="search-input home-input"
                            placeholder="enter the address"
                            :enableGeolocation="enableGeolocation"
                            v-on:placechanged="getAddressData"
                        ></vue-google-autocomplete>
                        {{sendObject}}<br><br>
                    </div>
                    <!-- <h3 class="title is-4">Start typing an address and below you will see found result,
                        <a v-on:click="$refs.vAutoComplete.geolocate()">or force current location</a>
                    </h3> -->

                </div>
                <label>Данные обьекта</label>
                <input type="text" name="title" id="title" placeholder="title">
                <input type="text" name="phone" id="phone" placeholder="phone">
                <input type="text" name="site" id="site" placeholder="site">
                <div class="registrStep1__buttons">
                    <input type="reset" value="Отмена" class="registrStep1__secondaryButton">
                    <input type="submit" value="Продолжить 1/3" class="registrStep1__primaryButton">    
                </div>
            </form>
        </div>
        <div class="Step1Image">your here: {{location.position}}
            <div class="Step1Image__labe" >
                <div v-if="gettingLocation">loading...</div>
                <div v-else>
                    <travel-map class="guide"
                        ref="mapr" 
                        :mapCenter="curMarker.position" 
                        @isDoneFunc="isDoneFunc" 
                        :address="address" 
                        :curMarker="curMarker"
                        />
                </div>
                <!-- <GoogleMapLoader:location="location" 
                    :mapConfig="mapConfig" //v-if="location.position"
                    apiKey="AIzaSyB_nA80Ha1asyGCQtdcgAGZNtd6Vzr8p3A"
                >

                    <template v-slot:default="{ google, map }"> 
                        <h3 class="title is-4" >
                            <button @click="$refs.vAutoComplete.geolocate()">force current location</button>
                        </h3>

                        <GoogleMapMarker v-if="address"
                            :google="google"
                            :map="map"
                            :marker= "marker"
                        />
                    </template>
                </GoogleMapLoader> -->
            </div>
        </div>    
    </business-layout>
</template>

<script>
import BusinessLayout from "@/layouts/BusinessLayout";
import TravelMap from '@/components/TravelMap.vue';
import GoogleMapLoader from "../components/GoogleMapLoader";
import GoogleMapMarker from "../components/GoogleMapMarker";
import { mapSettings } from "@/constants/mapSettings";
import VueGoogleAutocomplete from 'vue-google-autocomplete';

export default {
    name: 'CreatePage',
    components: {
        BusinessLayout,
        TravelMap,
        // GoogleMapLoader,
        // GoogleMapMarker,
        // GoogleMapLine,
        VueGoogleAutocomplete,
    },
    data() {
        return {
            acLatLng:{},
            isDone: false,
            enableGeolocation: true,
            location: this.$store.state.selfLocation.location,
            groups: ['СТО','Шиномонтаж','Мойка'],
            curMarker: {
                id: "a",
                position: this.$store.getters['selfLocation/doneLocation'].position,// { lat: 3, lng: 101 }
                content:'Place de la Bastille'
            },
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
            sendObject: {
                "contact": {
                    "phone": "string"
                },
                "id": 0,
                "location": {
                    "address": "string",
                    "latitude": 0,
                    "longitude": 0
                },
                "name": "string",
                "serviceForBusinesses": [
                    {"id": 0}
                ],
                "workTimes": [
                    {
                    "day": 0,
                    "fromTime": {
                        "hour": 0,
                        "minute": 0,
                        "nano": 0,
                        "second": 0
                        },
                    "id": 0,
                    "toTime": {
                        "hour": 0,
                        "minute": 0,
                        "nano": 0,
                        "second": 0
                        }
                    }
                ]
            },

        }
    },
    watch: {
        location(newVal, oldVal) {
            console.log('location',newVal, oldVal)
            //this.locationDone = true
        }
    },
    computed: {
        errorStr() {
            return this.$store.state.selfLocation.errorStr;
        },
        gettingLocation() {
            return this.$store.state.selfLocation.gettingLocation;
        },
        // location() {
        //     //console.log(this.$store.state.selfLocation.location)
        //     this.locationPos = this.$store.state.selfLocation.location;
        // },///////
        // mapConfig () {
        //     return {
        //         //...mapSettings, // індивідуальні налаштування для вигляду карти
        //         //center: { lat: 0, lng: 0 }
        //         center: this.mapCenter,
        //         zoom: 15,
        //     }
        // },
        // mapCenter() {
        //     //console.log(this.markers[1].position)
        //     //console.dir(this.myPosition.position)
        //     //map.setCenter({lat:lat, lng:lng});
        //     //return this.markers[1].position || this.myPosition.position  
        //     console.log('mapCenter')
        //     console.log(this.markers[1].position || {lat: this.marker.address.latitude, lng: this.marker.address.longitude})
        //     //return this.markers[1].position || {lat: this.marker.address.latitude, lng: this.marker.address.longitude}
        //     return this.markers[1].position || {lat: this.marker.address.latitude, lng: this.marker.address.longitude}
        // },
        // marker () {
        //     return {
        //         id: "a",
        //         position: { lat: this.address.latitude, lng: this.address.longitude }// { lat: address.latitude, lng: address.longitude }
        //     }
        // },
    },
    update() {
        navigator.geolocate()
         console.log('navigator')
         console.log(navigator)
         console.log(this.$refs.vAutoComplete)
    },
    created() {
        //do we support geolocation
        this.$store.dispatch('selfLocation/getLocation');
    },
    methods: {
        isDoneFunc(e){
            console.log('isDoneFunc') // google map is load 
            this.isDone=true; // - start autocomplete
            //this.$refs.vAutoComplete.geolocate(); // - start autocomplete geolocale -not workinfg here
        },
        getAddressData: function (addressData, placeResultData, id) {
            console.log('getAddressData')
            console.log('addressData=')
            console.dir(addressData)
            console.log('placeResultData=')
            console.dir(placeResultData)
            let lat=placeResultData.geometry.location.lat()
            let lng=placeResultData.geometry.location.lng()
            console.log(lat,lng)
            this.acLatLng={lat:lat,lng:lng}
            this.sendObject.location={latitude:lat,longitude:lng}
            this.sendObject.location={
                address: placeResultData.formatted_address,
                latitude: placeResultData.geometry.location.lat(),
                longitude: placeResultData.geometry.location.lng()
            }
            this.address = addressData;
        },
        geolocate() {
            // if (this.enableGeolocation) {
            //     if (navigator.geolocation) {
            //         console.log(navigator.geolocation)
            //         navigator.geolocation.getCurrentPosition(position => {
            //         let geolocation = {
            //             lat: position.coords.latitude,
            //             lng: position.coords.longitude
            //         };
            //         console.log('geolocation',geolocation)
            //         let circle = new google.maps.Circle({
            //             center: geolocation,
            //             radius: position.coords.accuracy
            //         });
            //         console.log('circle',circle)
            //         this.autocomplete.setBounds(circle.getBounds());
            //         });
            //     }
            // }
        },
    }
}
</script>

<style>
/* step01.css */
.Step1Image {
    height: 100%;
}
.Step1Image__labe {
    width: 673px;
    height: 100%;
}
.registrStep1 {
    padding: 56px 48px 56px 48px;
}
.registrStep1 form {
    width: 379px;
}
.registrStep1 h1 {
    margin-top: 0px;
    margin-bottom: 40px;
    font-weight: 500;
    font-size: 24px;
    line-height: 36px;
}
.registrStep1 label {
    display: inline-block;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 24px;
}
.registrStep1 input {
    width: 100%;
    height: 56px;
    margin-bottom: 16px;
    border: 1px solid #6F7E95;
    border-radius: 4px;
    padding: 5px;
}
.registrStep1__buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    margin-top: 32px;
}
.registrStep1__buttons input {
    display: inline-block;
    text-align: center;
    padding: 19px 0 19px 0;
    font-size: 16px;
    line-height: 18px;
    text-transform: uppercase;
}
.registrStep1__buttons .registrStep1__secondaryButton {
    width: 125px;
    background-color: white;
    color: #6F7E95;
    border: 1px solid #6F7E95;
    border-radius: 4px;
}
.registrStep1__buttons .registrStep1__primaryButton {
    width: 238px;
    background-color: #FFC700;
    color: #000000;
    border: none;
    border-radius: 4px;
}
</style>