<template>
    <GoogleMapLoader
        :mapConfig="mapConfig"
        apiKey="AIzaSyB_nA80Ha1asyGCQtdcgAGZNtd6Vzr8p3A"
    >
        <template slot-scope="{ google, map }">
            <!-- {{ map }}
            {{ google }} -->
            <GoogleMapMarker
                v-for="marker in markers"
                :key="marker.id"
                :marker="marker"
                :google="google"
                :map="map"
            />
            <GoogleMapLine
                v-for="line in lines"
                :key="line.id"
                :path.sync="line.path"
                :google="google"
                :map="map"
            />
        </template>
    </GoogleMapLoader>
</template>

<script>
// import GoogleMapLoader from './GoogleMapLoader'
// import { mapSettings } from '@/constants/mapSettings'
import GoogleMapLoader from "./GoogleMapLoader";
import GoogleMapMarker from "./GoogleMapMarker";
import GoogleMapLine from "./GoogleMapLine";

import { mapSettings } from "@/constants/mapSettings";

export default {
    components: {
        GoogleMapLoader,
        GoogleMapMarker,
        GoogleMapLine
    },
    props: ['markers'],
    data() {
        return {
            // markers: [
            //     {
            //         id: "a",
            //         position: { lat: 50.456376, lng: 30.380989 }// { lat: 3, lng: 101 }
            //     },
            //     {
            //         id: "b",
            //         position: { lat: 50.455939, lng: 30.372777 }// { lat: 5, lng: 99 }
            //     },
            //     {
            //         id: "c",
            //         position: { lat: 50.452482, lng: 30.372232 }// { lat: 6, lng: 97 }
            //     }
            // ],
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
                ...mapSettings,
                //center: { lat: 0, lng: 0 }
                center: this.mapCenter
            }
        },
        mapCenter() {
            return this.markers[1].position;
        }
    }
}
</script>

<style>

</style>