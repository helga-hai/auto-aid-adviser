import { userService } from '../_services';
import { authHeader, router } from '../_helpers';

import axios from 'axios';


export const search = {
    namespaced: true,
    state: {
        latitude: '',
        longitude: '',
        serviceForBusiness: '',
        searchData: null,
        markersEntities: [],
        // 'marker-23': marker
        // },
        isMap: false,
        mapObj: null,
        google: null
    },
    getters: {
        ISMAP: state => {
            return state.isMap
        },
        MAPOBJ: state => {
            return state.mapObj
        },
        SEARCHDATA: state => {
            return state.searchData;
        },
        SERVICEFORBUSINESS: state => {
            return state.serviceForBusiness;
        },
        LATITUDE: state => {
            return state.latitude;
        },
        LONGITUDE: state => {
            return state.longitude;
        },
        MARKER_ENTITIES: state => {
            return state.markersEntities;
        },
        GOOGLE: state => {
            return state.google;
        },
    },
    mutations: {
        SET_POSITION: (state, { lat, lng }) => {
            state.latitude = lat;
            state.longitude = lng;
        },
        SET_SERVICE: (state, payload) => {
            state.serviceForBusiness = payload;
        },
        SET_SEARCH: (state, payload) => {
            state.searchData = payload
                // var th = this
            payload.forEach(item => {
                let markerBody = {}
                markerBody.position = { lat: item.location.latitude, lng: item.location.longitude };
                // map: state.mapObj,
                markerBody.icon = 'http://maps.google.com/mapfiles/kml/paddle/ylw-circle.png';
                markerBody.id = `marker-${item.id}`;
                // });
                // this.$store.commit('search/GET_MARKER_ENTITIES',[`marker-${item.id}`, markerBody])
                // state.markersEntities[`marker-${item.id}`] = markerBody
                markerBody.description = `<p>Baur-Sames-Bogart Hall</p>`;
                markerBody.title = `<p>${item.name}</p>`;

                // markerBody['infowindow'] = new google.maps.InfoWindow({ // replace to GoogleMaparker.vue
                //     // content: html
                //     maxWidth: 300,
                //     infoBoxClearance: new google.maps.Size(1, 1),
                //     disableAutoPan: false
                // });
                // google.maps.event.addListener(newmarker, 'mouseover', function() {
                //     this['infowindow'].open(map, this);
                // });

                state.markersEntities.push(markerBody)
            })
        },
        GET_MARKER_ENTITIES(state, [id, bodyMarker]) {
            console.log(id, bodyMarker)
            state.markersEntities[id] = bodyMarker
        },
        IS_MAP(state, payload) {
            state.isMap = true
            state.mapObj = payload
        },
        SET_GOOGLE(state, payload) {
            state.google = payload
        },
    },
    actions: {
        START_SEARCH: async(context, payload) => {

            let uri = payload ?
                userService.config.apiUrl + `/api/search?service=${payload.service}&latitude=${payload.latitude}&longitude=${payload.longitude}&radius=10.0` :
                userService.config.apiUrl + `/api/search?service=${context.state.serviceForBusiness}&latitude=${context.state.latitude}&longitude=${context.state.longitude}&radius=10.0`
                // let uri = userService.config.apiUrl + '/api/businesses/' + context.state.serviceForBusiness + '/' + context.state.longitude + '/' + context.state.latitude;
            console.log('START_SEARCH2', uri);
            let options = authHeader() ? { headers: authHeader() } : {};
            let response = await axios.get(uri, options);
            context.commit('SET_SEARCH', response.data);
            console.log('START_SEARCH response', response)
                // return response
        },
        GET_POSITION_AUTOCOMPLETE: async(context, { addressData, placeResultData, id }) => {
            let lat = addressData.latitude
            let lng = addressData.longitude
            context.commit('SET_POSITION', { lat, lng });
        },
        GET_POSITION_SELFLOCATION: async(context, payload) => {
            let lat = payload.lat
            let lng = payload.lng
            context.commit('SET_POSITION', { lat, lng });
        },
        GET_SERVICE: (context, payload) => {
            context.commit('SET_SERVICE', payload);
        }
    }
}