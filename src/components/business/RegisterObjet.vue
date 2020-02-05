<template>
    <div class="register-wrap">
        <div class="registrStep1">
            <h1>Реєстрація об’єкту <span>1/3</span></h1>
            <div>
                <div class="registrStep1__address">
                    <label for="name">Вкажіть місцезнаходження об’єкту на карті або введіть адресу</label>
                        <div class="auto-complete-input" slot="acompl" v-if="isDone">
                            <vue-google-autocomplete v-if="!encoding || isEncoding"
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
                        <button v-if="encoding && !isEncoding" @click="changeInput">+</button>
                        <input v-if="encoding && !isEncoding" type="text" :value="encoding" ref="inputEncoding" class="input-encoding">
                    </div>
                </div>
                <label>Дані об’єкта</label>
                <input type="text" name="title" id="title" placeholder="Назва" @change="setName" ref="nameInput">
                <input type="text" name="phone" id="phone" placeholder="Телефон" @change="setPhone" ref="phoneInput">
                <input type="text" name="site" id="site" placeholder="Сайт (опционально)" @change="setSite" ref="urlInput">
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
                        
                        :curMarker="markers.position"
                        :enterMarker="enterMarker"
                         @mapClick="mapClick"
                         @mapCenterChanged="mapCenterChanged"
                         @ourMap="ourMap"
                         :enterAddress="enterAddress"
                         :toggleAddres="toggleAddres"
                         :ac_center="ac_center"
                        />
                </div>
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
import {mapGetters} from 'vuex';

export default {
    name: 'RegisterObjet',
    components: {
        TravelMap,
        // GoogleMapLoader,
        // GoogleMapMarker,
        // GoogleMapLine,
        VueGoogleAutocomplete,
    },
    activated(){
        // if(!this.ADDRESS) { this.$refs.addressInputvalue='' }
        if(!this.URL && this.next) { this.$refs.urlInput.value='' }
        if(!this.NAME && this.next) { this.$refs.nameInput.value='' }
        if(!this.PHONE && this.next) { this.$refs.phoneInput.value='' }
    },
    props:['next'],
    data() {
        var th = this
        return {
            enterAddress: false,
            acLatLng:{},//store
            isDone: false,
            enableGeolocation: true,
            ele: this.$store.state.create.sendObject,
            location: this.$store.state.selfLocation.location,
            curMarker: {
                id: "a",
                position: this.$store.getters['selfLocation/doneLocation'].position,// { lat: 3, lng: 101 }
                content:'You are here'
            },
            enterMarker: [],
            position: this.$store.getters['create/acLatLng'].position,// { lat: 3, lng: 101 }
            ac_position: null,
            ac_center: null,
            
            markers: [],
            sendObject: {
            },
            ourM: null,
            count: 0,
            isEncoding: false
        }
    },
    watch: {
        mapCenter(newVal, oldVal){
            console.log(newVal, oldVal)
        },
        toggleAddres(newVal, oldVal) {
            this.ac_position = this.$store.getters['selfLocation/ac_location']
            this.ac_center = this.ac_position
        },
        ac_position(val) {
           var object = {}
           object.position=val
           object.id='t'+this.count
           object.content='here'
           this.enterMarker.push(object)
           this.count++
        },
        encoding(){
            this.isEncoding=false
        }
    },
    computed: {
        ...mapGetters({
            markers: 'search/SEARCHDATA',
            gettingLocation: 'selfLocation/gettingLocation',
            SERVICEFORBUSINESS: 'search/SERVICEFORBUSINESS',
            LATITUDE: 'search/LATITUDE',
            LONGITUDE: 'search/LONGITUDE',
            ADDRESS: 'search/ADDRESS',
            PHONE: 'search/PHONE',
            NAME: 'search/NAME',
            URL: 'search/URL',
         }),
        encoding () {
            return this.$store.getters['create/encoding']
        },
        toggleAddres() {
            return this.$store.getters['selfLocation/toggleAddres']
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
    },
    methods: {
        changeInput(){
            console.log('sJHKDSKJFDKJ',this.isEncoding)
            console.log(!this.encoding, this.isEncoding)
            this.isEncoding = !this.isEncoding
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
            this.isDone=true; 
        },
        getAddressData(addressData, placeResultData, id){
            this.$store.commit('create/getAddressData', {addressData, placeResultData, id})
            this.$store.dispatch('selfLocation/changeLocation', {addressData, placeResultData, id});
            // console.log(addressData, placeResultData, id)
            // console.log(addressData.latitude)
            this.enterPosition( placeResultData )
        },
        enterPosition( placeResultData ){
            console.log('enterPosition')
            let lat = placeResultData.geometry.location.lat()
            let lng = placeResultData.geometry.location.lng()
            console.log(lat, lng)
            this.enterMarker.position = { lat: lat, lng: lng }
            // this.curMarker.posi
        },
        geolocate() {
        },
        switchView(val){
            this.$emit('switchView', val);
            val=='add-object'? this.$emit('nextChange',false) : this.$emit('nextChange',true)
        },
        beforeUpdate() {
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