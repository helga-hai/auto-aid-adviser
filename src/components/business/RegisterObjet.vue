<template>
    <div class="register-wrap">
        <div class="registrStep1">
            <h1>Реєстрація об’єкту <span>1/3</span></h1>
            <div>
                <div class="registrStep1__address">
                    <label for="name">Вкажіть місцезнаходження об’єкту на карті або введіть адресу</label>
                        <div class="auto-complete-input" slot="acompl" v-if="isDone">
                            <vue-google-autocomplete v-if="!encoding"
                                ref="vAutoComplete"
                                :country="['ua']"
                                id="autocompletePannel"
                                classname="search-input home-input"
                                placeholder="Адреса"
                                :enableGeolocation="enableGeolocation"
                                v-on:placechanged="getAddressData"
                                @change="setMarker"
                            ></vue-google-autocomplete>
                        </div>
                    <div class="auto-complete-input-wrap">
                        <button v-if="encoding">+</button>
                        <input v-if="encoding" type="text" :value="encoding" @click="deleteEncoding" ref="inputEncoding" class="input-encoding">
                    </div>
                </div>
                <label>Дані об’єкта</label>
                <input type="text" name="title" id="title" placeholder="Назва" @change="setName">
                <input type="text" name="phone" id="phone" placeholder="Телефон" @change="setPhone">
                <input type="text" name="site" id="site" placeholder="Сайт (опционально)" @change="setSite">
                <div class="registrStep1__buttons">
                    <input type="reset" value="Відмінити" @click="switchView('add-object')" class="registrStep1__secondaryButton">
                    <input  value="Продовжити 1/3" class="registrStep1__primaryButton" @click="switchView('services')">    
                </div><!--type="submit"-->
            </div>
        </div>
        <!-- <h1>{{ele}}</h1> your here: {{location.position}}-->
        <div class="Step1Image">
            <div class="Step1Image__labe" >
                <div v-if="gettingLocation">loading...</div>
                <div v-else>
                    <travel-map class="guide"
                        ref="mapr" 
                        :mapCenter="location.position" 
                        @isDoneFunc="isDoneFunc" 
                        :address="address" 
                        :curMarker="location"
                        :enterMarker="enterMarker"
                         @mapClick="mapClick"
                         @mapCenterChanged="mapCenterChanged"
                         @ourMap="ourMap"
                         :enterAddress="enterAddress"
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
    </div>
</template>

<script>
import TravelMap from '@/components/TravelMap.vue';
import GoogleMapLoader from "../../components/GoogleMapLoader";
import GoogleMapMarker from "../../components/GoogleMapMarker";
import { mapSettings } from "@/constants/mapSettings";
import VueGoogleAutocomplete from 'vue-google-autocomplete';

export default {
    name: 'RegisterObjet',
    components: {
        TravelMap,
        // GoogleMapLoader,
        // GoogleMapMarker,
        // GoogleMapLine,
        VueGoogleAutocomplete,
    },
    data() {
        var th = this
        return {
            enterAddress: false,
            acLatLng:{},//store
            isDone: false,
            enableGeolocation: true,
            ele: this.$store.state.create.sendObject,
            location: this.$store.state.selfLocation.location,
            groups: ['СТО','Шиномонтаж','Мойка'],
            curMarker: {
                id: "a",
                position: this.$store.getters['selfLocation/doneLocation'].position,// { lat: 3, lng: 101 }{ lat: 50.510854099999996, lng: 30.491225300000004 }
                content:'You are here'
            },
            enterMarker: {
                position: this.$store.getters['create/acLatLng'].position,// { lat: 3, lng: 101 }
                content:'address',
                id:"enterw"
            },
            address: '',//store
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
            },
            ourM:null,
            // encoding: this.$store.getters['create/encoding']
        }
    },
    watch: {
        // encoding (newVal, oldVal) {
        //     console.log(`We have ${newVal} fruits now, yaay!`)
        // },
        location(newVal, oldVal) {
            console.log('location',newVal, oldVal)
            //this.locationDone = true
        },
        mapCenter(newVal, oldVal){
            console.log(newVal, oldVal)
        },
        coords(newVal, oldVal) {
            console.log('coords',newVal, oldVal)
        },
    },
    computed: {
        encoding () {
            return this.$store.getters['create/encoding']
        },
        coords() {
            return this.$store.getters['selfLocation/doneLocation']
        },
        // mapCenter(){
        //     return this.curMarker.position
        // },
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
        // this.$store.dispatch('selfLocation/changeLocation');
        // this.$store.dispatch('selfLocation/getLocation');
    },
    methods: {
        deleteEncoding(e){
            console.log("deleteEncoding",e)
            this.encoding=false
        },
        ourMap(val){
            this.ourM = val
        },
        mapClick({event, m}){
            console.log("mapClick")
            console.log({event, m})
        },
        mapCenterChanged(val){
            console.log("mapCenterChanged")
            console.log(val)
        },
        setMarker(e){
            this.enterAddress = true
        },
        // setMarker: async function () {   
        //     this.curMarker.position = this.$store.getters['selfLocation/doneLocation'].position 
        //     console.log(this.curMarker)   
        //    await $this.$nextTick()
            // console.log(this.curMarker.position)
            // this.curMarker.position = this.$store.getters['selfLocation/doneLocation'].position
            // console.log(this.curMarker.position)
        // },
        setName(e){
            this.$store.commit('create/fillName', e.target.value)
        },
        setPhone(e){
            this.$store.commit('create/fillPhone', e.target.value)
        },
        setSite(e){
            this.$store.commit('create/fillSite', e.target.value)
        },
        isDoneFunc(e){
            console.log('isDoneFunc') // google map is load 
            this.isDone=true; // - start autocomplete
            //this.$refs.vAutoComplete.geolocate(); // - start autocomplete geolocale -not workinfg here
        },
        getAddressData(addressData, placeResultData, id){
            this.$store.commit('create/getAddressData', {addressData, placeResultData, id})
            this.$store.dispatch('selfLocation/changeLocation', {addressData, placeResultData, id});
            console.log(addressData, placeResultData, id)
            console.log(addressData.latitude)
            this.enterPosition( placeResultData )
        },
        enterPosition( placeResultData ){
            console.log('enterPosition')
            let lat = placeResultData.geometry.location.lat()
            let lng = placeResultData.geometry.location.lng()
            console.log(lat, lng)
            this.enterMarker.position = { lat: lat, lng: lng }
            // state.sendObject.location = { latitude: lat, longitude: lng }
            // state.sendObject.location = {
            //     address: placeResultData.formatted_address,
            //     latitude: placeResultData.geometry.location.lat(),
            //     longitude: placeResultData.geometry.location.lng()
            // }
            // state.address = addressData;
        },
        geolocate() {
        },
        switchView(val){
            this.$emit('switchView', val);
        },
        beforeUpdate() {
            // this.curMarker.position = this.$store.getters['selfLocation/doneLocation'].position
        //     console.dir(this.curMarker)
        // console.dir(this.location) 
        },
    }
}
</script>

<style lang="scss">
.register-wrap {
    display: flex;
}
.Step1Image {
    height: 100%;
    min-height: 720px;
}
.Step1Image__labe {
    width: 673px;
}
.registrStep1+h1 {
    font-size: 12px;
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
    padding: 19px 16px;
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
  cursor:pointer;
}
.registrStep1__buttons .registrStep1__secondaryButton:hover {
  background-color: rgb(241, 241, 241);
}
.registrStep1__buttons .registrStep1__primaryButton {
    width: 238px;
    background-color: #FFC700;
    color: #000000;
    border: none;
    border-radius: 4px;
    cursor:pointer;
}
.registrStep1__buttons .registrStep1__primaryButton:hover {
  background-color: rgb(219, 173, 6);
}
.auto-complete-input-wrap {
    position: relative;
    button {
        position: absolute;
        right: 13px;
        top: 15px;
        font-size: 24px;
        transform: rotate(45deg);
        display: block;
        background: #FFFFFF;
        padding: 0 7px;
        z-index:10;
        border: none;
    }
}
.input-encoding {
    padding-right:40px !important;
}
</style>