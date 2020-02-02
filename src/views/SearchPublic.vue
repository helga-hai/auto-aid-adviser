<template>
    <div>
        <nav-component class="dark" />
        <div class="search-wrap">
            <div class="search-dashboard">
                <div class="top-line">
                    <div class="controls">
                        <!-- <input type='text' placeholder="Оберіть послугу"> -->
                        <websocket />
                        <div class="btn">
                            <a href="#" class="btn__button orange "  @click="startRoute" >застосувати</a>
                        </div>
                    </div>
                    <div class="filter">
                        <div class="filter-label">
                            <img :src="require('../assets/filter-img.png')" >
                            <span>Додати фільтри</span>
                        </div>
                    </div>
                </div>
                <div class="content-line">
                    <div class="chips">
                        <span>Знайдено {{count}} варіанта</span>
                        <span class="chips-sort">Відсортовано за </span> <span>Рейтингом</span>
                    </div>
                    
                    <div v-if="markers">
                        <button class="services-prev detail" v-for="cur in markers" :key="cur.id"  :isPreview="false">
                            <div class="services-prev-img small" :style="{backgroundImage: 'url('+require('../assets/serevice.svg')+')'}"><!--:style="{backgroundImage: 'url('+require('')+')'}"-->
                            </div>
                            <div class="services-prev-info">
                                <div class='name-prev'>{{cur.name}}</div>
                                <p class="loc" v-if="cur.location.address">{{cur.location.address}}</p>
                                <p class="time" v-if="cur.workTimes.length">
                                    <span v-for="d in cur.workTimes" :key="d.id">
                                        {{dayList[d.day - 1]}} <br> 
                                        {{d.fromTime.slice(0,-3)}} <br>
                                        {{d.toTime.slice(0,-3)}} <br>
                                    </span>
                                </p>
                                <p class="phone" v-if="cur.contact.phone">{{cur.contact.phone}}</p>
                                <p class="internet" v-if="cur.contact.url">{{cur.contact.url}}</p>
                            </div>
                        </button>  
                    </div> 
                </div>
            </div>
            <div class="search-map">
                <div class="Step1Image__labe" >
                    <div v-if="gettingLocation">loading...</div>
                    <div v-else>
                        <!-- <travel-map class="guide"
                        :mapCenter="queryLocation" 
                        :mapConfig="mapConfig"
                        :curMarker="markers.position"
                        @mapClick="mapClick"
                        @mapCenterChanged="mapCenterChanged"
                        @ourMap="ourMap"
                        :ac_center="ac_center"
                            /> -->
                        <!-- :enterMarker="enterMarker"
                         @mapClick="mapClick"
                         @mapCenterChanged="mapCenterChanged"
                         @ourMap="ourMap"
                         :enterAddress="enterAddress"
                         :toggleAddres="toggleAddres"
                         :ac_center="ac_center" -->
                            <!-- @isDoneFuncInTravel="isDoneFuncInTravel"
                            @mapClickInTravel="mapClickInTravel"
                            @mapCenterChangedInTravel="mapCenterChangedInTravel"
                            @ourMapInTravel="ourMapInTravel" 
                            :center="inner_ac_center"-->
                         <GoogleMapLoader 
                            
                            @isDoneFuncInTravel="isDoneFunc"
                            :mapConfig="mapConfig"
                            :center="queryLocation"
                            apiKey="AIzaSyB_nA80Ha1asyGCQtdcgAGZNtd6Vzr8p3A"
                        >
                            <template v-slot:default="{ google, map }" @isDoneFuncInTravel="isDoneFunc"> 
                                <!-- <GoogleMapMarker
                                /> -->
                                    <!-- v-for="marker in newMarkers"
                                    :key="marker.id"
                                    
                                    :enableGeolocation="true"
                                    @focus="onFocus()"
                                    @blur="onBlur()"
                                    
                                    :marker="marker"
                                    :google="google"
                                    :map="map"
                                    @setmap="setmapInTraver" -->
                            </template>
                         </GoogleMapLoader>
                    </div>
                </div> 
            </div>
        </div>
    </div>
</template>

<script>
import TravelMap from '@/components/TravelMap.vue';
// import VueGoogleAutocomplete from 'vue-google-autocomplete';
import websocket from '@/components/websocket';

import GoogleMapLoader from "@/components/GoogleMapLoader";
import GoogleMapMarker from "@/components/GoogleMapMarker";
import { mapSettings } from "@/constants/mapSettings";

import NavComponent from '@/components/NavComponent';
import {mapGetters} from 'vuex';
export default {
    name:'Search',
    components: {
        NavComponent, 
        TravelMap,
        websocket,
        GoogleMapLoader,
        GoogleMapMarker,
    },
    data() {
        return {
            loading: false,
            //markers: [],
            // enterMarker: [],
            // position: this.$store.getters['create/acLatLng'].position,// { lat: 3, lng: 101 }
            // ac_position: null,
            // ac_center: null,
            isDone: false,
            // location: this.$store.state.selfLocation.location,
            // curMarker: {
            //     id: "a",
            //     position: this.$store.getters['selfLocation/doneLocation'].position,// { lat: 3, lng: 101 }
            //     content:'You are here'
            // },
        }
    },
    computed: {
        ...mapGetters({
            markers: 'search/SEARCHDATA',
            gettingLocation: 'selfLocation/gettingLocation',
            SERVICEFORBUSINESS: 'search/SERVICEFORBUSINESS',
            LATITUDE: 'search/LATITUDE',
            LONGITUDE: 'search/LONGITUDE'
         }),
        mapConfig () {
            return {
                ...mapSettings,
                center: { lat: 0, lng: 0 }
            }
        },
        count() {
            return this.markers ? this.markers.length : ''  
        },
        queryLocation(){
            let tmp = {}
            // tmp.lat = this.$router.query.latitude;
            // tmp.lng = this.$router.query.lngitude;
            return tmp
        },
        // mapConfig () {
        //     return {
        //         center: { lat: this.LATITUDE, lng: this.LONGITUDE },
        //         zoom: 15,
        //     }
        // },
    },
    watch: {
        $route(newVal,oldVal) {
            console.log('$route', newVal, oldVal)
            this.fetchData()
        }
        // toggleAddres(newVal, oldVal) {
        //     this.ac_position = this.$store.getters['selfLocation/ac_location']
        //     this.ac_center = this.ac_position
        // },
        // ac_position(val) {
        //    var object = {}
        //    object.position=val
        //    object.id='t'+this.count
        //    object.content='here'
        //    this.enterMarker.push(object)
        //    this.count++
        // },
    },
    methods: {
        isDoneFunc() {
            // console.log('isDoneFuncInTravel')
            // this.$emit('isDoneFunc')
            this.isDone=true; 
        },
        // isDoneFunc(e){
        //     this.isDone=true; 
        // },
        // ourMap(val){
        //     this.ourM = val
        // },
        async fetchData(){
            console.log('fetchData')
            //  /search?service=balancing&latitude=50.0&longitude=50.0&radius=10.0
            this.loading = true;
            const response = await this.$store.dispatch('search/START_SEARCH')
        },
        // fetch(){
        //     const options = {}
        //     options.service = this.SERVICEFORBUSINESS
        //     options.lat = this.LATITUDE
        //     options.lng = this.LONGITUDE
        //     if(){}
        //     this.fetchData(options)
        // },
        async startRoute(){
            console.log('startRoute')
            const newQuery = {}
            newQuery.service = this.SERVICEFORBUSINESS
            newQuery.latitude = this.LATITUDE
            newQuery.longitude = this.LONGITUDE
            newQuery.radius = '10.0'
            await this.$router.push( { query: newQuery }).catch(err => {console.log(err)})
        }
    },
    mounted(){
        console.log('mounted')
        this.fetchData()
        // var th = this
        // this.$router.push({ name:'Search', params: { markets: th.markets } })
    }
}
</script>

<style lang="scss">
.search-wrap{
    display: flex;
    height:100vh;
}
.search-dashboard {
    width: 50vw;
    // min-height: calc(100vh - 80px);
    background: #F6F7F8;
    div:first-child {
        flex-grow: 2;
        margin-right: 20px;
    }
    input {
        padding: 12px 16px 12px
    }
    .top-line {
        padding: 40px 50px 0px;
    }
    .content-line {
        background: #FFFFFF;
        padding: 0px 50px 20px;
    }
    .controls {
        display: flex;
        width: 100%;
    }
    .filter {
        padding-top: 20px;
        padding-bottom:22px;
        img {
            vertical-align: middle;
        }
    }
    .filter-label {
        font-size: 16px;
        text-transform: uppercase;
        color: #00BCD4;
        text-align:left;
        vertical-align:middle;
        span {
            padding-left: 11px;
            padding-top: 6px;
        }
    }
    .chips {
        font-size: 16px;
        line-height: 16px;
        color: #A5AEBC;
        padding-top:25px;
        margin-bottom:25px;
        text-align:left;
        &-sort {
            margin-left: 40px;
        }
    }
    .name-prev {
        font-size: 24px;
    }
    button {
        border:none;
    }
    .servise__autocomplete {
        max-height: 37vh;
        overflow-y: scroll;
        width: 400px;
        button {
            text-align:left;
        }
    }
}
.search-map {
    width: 50vw;
    // min-height: calc(100vh - 80px)
}
</style>