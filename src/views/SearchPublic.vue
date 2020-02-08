<template>
    <div>
        <nav-component class="dark" />
        <div class="search-wrap">
            <div class="search-dashboard">
                <div class="top-line">
                    <div class="controls-error" v-if="error.q_service.status">{{error.q_service.value}}</div>
                    <div class="controls">
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
                    
                    <div v-if="marketsSearch">
                        <button class="services-prev detail" v-for="cur in marketsSearch" :key="cur.id"  :isPreview="false">
                            <div class="services-prev-img small"  v-if="cur.images" :style="{backgroundImage: cur.images.length ? 'url('+cur.images[0].urlImage+')' : 'url('+require('../assets/serevice.svg')+')'}">
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
                        
                        <search-map class="travel-map"/>
                        <!-- <travel-map class="guide"-if="queryLocation"
                            ref="mapr" 
                            :mapCenter="location.position" 
                            @isDoneFunc="isDoneFunc" 
                            
                            @mapClick="mapClick"
                            @mapCenterChanged="mapCenterChanged"
                            @ourMap="ourMap" -->
                            <!-- /> -->
                            <!-- :curMarker="markers.position"
                            :enterMarker="enterMarker"
                            :enterAddress="enterAddress"
                            :toggleAddres="toggleAddres"
                            :ac_center="ac_center" -->

                    </div>
                </div> 
            </div>
        </div>
    </div>
</template>

<script>
// import TravelMap from '@/components/TravelMap.vue';
import SearchMap from '@/components/SearchMap.vue';
// import VueGoogleAutocomplete from 'vue-google-autocomplete';
import websocket from '@/components/websocket';
import { mapSettings } from "@/constants/mapSettings";

import NavComponent from '@/components/NavComponent';
import {mapGetters} from 'vuex';
export default {
    name:'Search',
    components: {
        NavComponent, 
        SearchMap,
        websocket,
    },
    data() {
        return {
            location: this.$store.state.selfLocation.location,
            loading: false,
            markers: [],
            isDone: false,
            q_service: null,
            error: {
                q_service: {
                    value: 'Оберіть сервіс',
                    status: false
                },
                q_service: {
                    value: 'Оберіть сервіс',
                    status: false
                },
                q_service: {
                    value: 'Оберіть сервіс',
                    status: false
                },

            }
        }
    },
    computed: {
        ...mapGetters({
            marketsSearch: 'search/SEARCHDATA',
            gettingLocation: 'selfLocation/gettingLocation',
            SERVICEFORBUSINESS: 'search/SERVICEFORBUSINESS',
            LATITUDE: 'search/LATITUDE',
            LONGITUDE: 'search/LONGITUDE',
         }),
         
        count() {
            return this.marketsSearch ? this.marketsSearch.length : ''  
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
        ourMap(val){
            this.ourM = val
        },
        isDoneFunc() {
            // console.log('isDoneFuncInTravel')
            // this.$emit('isDoneFunc')
            this.isDone=true; 
        },
        fetchData(){
            console.log('fetchData')
            //  /search?service=balancing&latitude=50.0&longitude=50.0&radius=10.0
            this.loading = true;
           this.$store.dispatch('search/START_SEARCH')
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
        },
        mapClick({event, m}){
            console.log("mapClick")
            console.log({event, m})
        },
        mapCenterChanged(val){
            console.log("mapCenterChanged")
            console.log(val)
        },
    },
    mounted(){
        console.log('mounted')
        console.log(this.$route)
        if(!this.$route.query.service) { 
             if(!this.SERVICEFORBUSINESS){
                this.error.q_service.status = true 
             }
            this.q_service = this.SERVICEFORBUSINESS || ''; 
        }
        if(!this.$route.query.latitude) { 
            if(!this.LATITUDE) {
                this.$store.dispatch('selfLocation/getLocation');
            }
        }
        // this.q_latitude = this.LATITUDE
        // this.q_longitude = this.LONGITUDE
        // this.q_radius = '10.0'
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
        position: relative;
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
    .controls-error {
        position: absolute;
        top: 14px;
        color: red;
        z-index: 2;
        font-size: 13px;
    }
}
.search-map {
    width: 50vw;
    // min-height: calc(100vh - 80px)
}
</style>