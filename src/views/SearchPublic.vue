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
                        <button class="services-prev detail" v-for="cur in marketsSearch" :key="cur.id"  :isPreview="false" @click="onClick(cur.id)" @mouseover="onHover(cur.id)" @mouseleave="onLeave(cur.id)">
                            <button class="direct" @click="sendCommand=true">GET DIRECTION</button>
                            <div class="services-prev-img small"  v-if="cur.images && cur.images.length" :style="{backgroundImage: cur.images.length ? 'url('+cur.images[0].urlImage+')' : 'url('+require('../assets/serevice.svg')+')'}">
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
                                <!-- <p class="internet" v-if="cur.contact.url">{{cur.contact.url}}</p> -->
                            </div>
                        </button>  
                    </div> 
                </div>
            </div>
            <div class="search-map "  v-if="location.position && location.position.lat">
                <div class="Step1Image__labe" >
                    <div v-if="gettingLocation">loading...</div>
                    <div v-else>
                        
                        <search-map class="travel-map" :startDirection="sendCommand"/>
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
import SearchMap from '@/components/SearchMap.vue';
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
            dayList: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'] ,
            loading: false,
            markers: [],
            isDone: false,
            q_service: null,
            q_lat: null,
            q_lng: null,
            curLoc: null,
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
            },
            sendCommand: false
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
        location() { return this.$store.state.selfLocation.location },
        count() {
            return this.marketsSearch ? this.marketsSearch.length : ''  
        },
        queryLocation(){
            let tmp = {}
            // tmp.lat = this.$router.query.latitude;
            // tmp.lng = this.$router.query.lngitude;
            return tmp
        },
    },
    watch: {
        $route(newVal,oldVal) {
            console.log('$route', newVal, oldVal)
            this.q_service = newVal.query.service
            // const position = navigator.geolocation.getCurrentPosition(this.success, this.error);
            this.fetchData()
        }
    },
    methods: {
        onClick(id){
            this.$store.commit('search/SELECT_MARKER',id)
        },
        onHover(id){
            if(document.querySelector(`.marker-${id}`)) {
                document.querySelector(`.marker-${id}`).style="background-color:#ffc700;padding: 15px 22px;"
            }
        },
        onLeave(id){
            if(document.querySelector(`.marker-${id}`)) {
                document.querySelector(`.marker-${id}`).style="background-color:#FFF;padding: 0px 0px;"
            }
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
            const options ={}
            options.service = this.q_service
            options.latitude = this.q_lat || this.location.position.lat
            options.longitude = this.q_lng || this.location.position.lng
            this.$store.dispatch('search/START_SEARCH', options)
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
        console.log('mounted',this.location)
        console.log(this.$route)
        this.$store.dispatch('selfLocation/getLocation')
        const params = this.$route.query
        this.q_service = params.service
        this.q_lat = params.latitude || this.location.position.lat
        this.q_lng = params.longitude || this.location.position.lng
        console.log(this.q_lat==="")
        if(this.q_lat==="") {console.log('Q_LAT');this.q_lat= this.location.position.lat}
        if(this.q_lng==="") {this.q_lng= this.location.position.lng}
        
        if(!this.$route.query.service) { 
             console.log('!this.$route.query.service')
             if(!this.SERVICEFORBUSINESS){
                console.log('!this.SERVICEFORBUSINESS')
                this.error.q_service.status = true 
             }
            this.q_service = this.SERVICEFORBUSINESS || ''; 
        }
        if(!this.$route.query.latitude) { 
            if(!this.LATITUDE) {
                console.log('!this.LATITUDE')
                // this.$store.dispatch('selfLocation/getLocation');
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
    height: calc(100vh - 80px);
    overflow: hidden;
    .Step1Image__labe {
        width: 100%;
        height: 100%;
    }
}
.search-dashboard {
    width: 50vw;
    // min-height: calc(100vh - 80px);
    background: #F6F7F8;
    
    div:first-child {
        flex-grow: 2;
        margin-right: 0px;
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
        height: calc(100vh - 162px - 80px);
        overflow-y: scroll;
        overflow-x: hidden;
        .detail {
            position:relative;
        }
        .direct {
            display:none;
            position: absolute;
            top: 0;
            right: 0;
            width: max-content;
            padding: 7px;
            color: darkgoldenrod;
        }
        .detail:hover .direct {
            display:block;
        }
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
        font-size: 22px;
        padding: 6px 6px 6px 0;
    }
    button {
        border:none;
        width: 100%;
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
    .services-prev {
        align-items: top;
    }
    .services-prev-info p {
        font-size: 15px!important;
        line-height: 21px!important;
        color: #6f7e95!important;
        text-align: left;
        padding: 0 0 3px 30px;
        font-weight: 400;
        span {
            font-size: 14px;
        }
    }
}
.search-map {
    width: 50vw;
    // min-height: calc(100vh - 80px)
}
.content {
    transition: all .3s ease;
}
</style>