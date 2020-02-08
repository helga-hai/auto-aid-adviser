<template>
<div>
    <!-- v-if="ISMAP" -->
    <SearchMapLoader 
    
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
import SearchMapLoader from "./SearchMapLoader";
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
            points: [
                {id:'a',position:{lat:50.4704839,lng:30.3854665}},
                {id:'b',position:{lat:50.4317703,lng:30.4551932}},
                {id:'c',position:{lat:50.50551429999999,lng:30.5101803}}
            ]
        }
    },
    computed: {
        mapConfig(){
            return {
                ...mapSettings,
                center:this.mapCenter
            }
        },
        mapCenter (){
            return this.points[1].position
        },
        ...mapGetters({
            searchData: 'search/SEARCHDATA',
            ISMAP: 'maploader/ISMAP',
            MAPOBJ: 'maploader/MAPOBJ',
        }),
    },
    watch:{
        
        searchData(){
            // let markerBody = new google.maps.Marker({
            //     position: event.latLng || event.position,
            //     map: map,
            //     icon: 'http://maps.google.com/mapfiles/kml/paddle/ylw-circle.png',
            //     id: `marker-${this.counter}`
            // });
            // console.log(this.MARKER_ENTITIES['marker-0'])
            // if(this.counter>0){ this.MARKER_ENTITIES[`marker-${this.counter - 1}`].setMap(null) }
            console.log(this.searchData,'this.searchData')
            var th = this
            this.searchData.forEach(item=>{
                let markerBody = new google.maps.Marker({
                    position: {lat:item.location.latitude,lng:item.location.longitude},
                    map: th.MAPOBJ,
                    icon: 'http://maps.google.com/mapfiles/kml/paddle/ylw-circle.png',
                    id: `marker-${item.id}`
                });
                this.$store.commit('search/GET_MARKER_ENTITIES',[`marker-${item.id}`, markerBody])
            })
            // return list
        }
    },
}
</script>

<style>

</style>