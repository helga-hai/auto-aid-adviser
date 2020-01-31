<template>
  <div></div>
</template>

<script>
import { POINT_MARKER_ICON_CONFIG } from '@/constants/mapSettings'
export default {
    props: {
        google: {
            type: Object,
            required: true
        },
        map: {
            type: Object,
            required: true
        },
        marker: {
            type: Object,
            required: true
        }
    },
    mounted() {
        // new this.google.maps.Marker({
        //     position: this.marker.position,
        //     marker: this.marker,
        //     map: this.map,
        //     icon: POINT_MARKER_ICON_CONFIG
        // })
        // var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
        var iconBase = 'http://maps.google.com/mapfiles/kml/paddle/ylw-circle.png';
        // var marker = new google.maps.Marker({
        //     position: myLatLng,
        //     map: map,
        //     icon: iconBase + 'parking_lot_maps.png'
        // });
        const { Marker } = this.google.maps;

        new Marker({
            position: this.marker.position,
            marker: this.marker,
            map: this.map,
            icon: iconBase,
            draggable:true,
            // icon: POINT_MARKER_ICON_CONFIG
        });
    },
}
</script>

<style>

</style>