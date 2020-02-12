<template>
<div>
    <!-- v-if="ISMAP" -->
    <SearchMapLoader v-if="points"
    
    :mapConfig="mapConfig"
    apiKey="AIzaSyB_nA80Ha1asyGCQtdcgAGZNtd6Vzr8p3A"
    >
        <template v-slot:default="{ google, map }"> 
            <GoogleMapMarker
            v-for="point in points"
            :key="point.id"
            :marker="point"
            :google="google"
            :map="map"/>
        </template>
    </SearchMapLoader>
</div>
</template>

<script>
import SearchMapLoader from "./GoogleMapLoader";
import GoogleMapMarker from "./GoogleMapMarker";
import {mapSettings} from '../constants/silverMap';
import {mapGetters} from 'vuex';
export default {
    components: {
        SearchMapLoader,
        GoogleMapMarker,
    },
    data(){
        return {
            // points: [
            //     {id:'a',position:{lat:50.4704839,lng:30.3854665}},
            //     {id:'b',position:{lat:50.4317703,lng:30.4551932}},
            //     {id:'c',position:{lat:50.50551429999999,lng:30.5101803}}
            // ]
            // lat:Number(this.$route.query.latitude),
            // lng:Number(this.$route.query.longitude),
        }
    },
    computed: {
        mapConfig(){
            return {
                ...mapSettings,
                center:this.mapCenter
            }
        },
        ...mapGetters({
            searchData: 'search/SEARCHDATA',
            ISMAP: 'search/ISMAP',
            MAPOBJ: 'search/MAPOBJ',
            points: 'search/MARKER_ENTITIES',
            GOOGLE: 'search/GOOGLE',
        }),
        mapCenter (){
            return this.points[1].position
            // return {lat:this.lat, lng:this.lng}
            // return {lat:50.50551429999999,lng:30.5101803}
        },
    },
    watch: {
        searchData(){
            // console.log(this.searchData,'this.searchData')
            // var th = this
            // this.searchData.forEach(item=>{
            //     let markerBody = new google.maps.Marker({
            //         position: {lat:item.location.latitude,lng:item.location.longitude},
            //         map: th.MAPOBJ,
            //         icon: 'http://maps.google.com/mapfiles/kml/paddle/ylw-circle.png',
            //         id: `marker-${item.id}`
            //     });
            //     this.$store.commit('search/GET_MARKER_ENTITIES',[`marker-${item.id}`, markerBody])
            // })
        }
    }, 
    methods:{
        
        searchDataFunc() {
            // console.log(this.searchData,'searchDataFunc')
            // var th = this
            // this.searchData.forEach(item=>{
            //     let markerBody = new google.maps.Marker({
            //         position: {lat:item.location.latitude,lng:item.location.longitude},
            //         map: th.MAPOBJ,
            //         icon: 'http://maps.google.com/mapfiles/kml/paddle/ylw-circle.png',
            //         id: `marker-${item.id}`
            //     });
            //     this.$store.commit('search/GET_MARKER_ENTITIES',[`marker-${item.id}`, markerBody])
            // })
        }
    },
    mounted(){
        console.log('MOUNTEd SEARCH MAP',this.searchData)
        console.log('MOUNTEd SEARCH MAP',this.points)
        if(!this.points){
            this.searchDataFunc() 
        }
    },
    updated(){
        // this.MAPOBJ.panBy(0, 0)
    }
}
</script>

<style>

</style>