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
        },
    },
    watch:{
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
        console.log('marker ')
        var m = new Marker({
            position: this.marker.position,
            marker: this.marker,
            map: this.map,
            icon: iconBase,
            draggable:true,
            animation: google.maps.Animation.DROP,
            title: null,
            description: null
            // icon: POINT_MARKER_ICON_CONFIG
        });
        // console.log('QQQQQ',this.$store.state.search.markersEntities)
        var markerEntities = this.$store.state.search.markersEntities
        // console.log('QQQQQ m',m)
        // console.log('QQQQQ m.title',m.marker.title)
        
        var th = this
        m['infowindow'] = new google.maps.InfoWindow({
            content: m.marker.description,
            maxWidth: 300,
            infoBoxClearance: new google.maps.Size(1, 1),
            disableAutoPan: false
        });

        google.maps.event.addListener(m, 'mouseover', function() {
            this['infowindow'].open(th.map, this);
        });
    },
}
</script>

<style>

</style>