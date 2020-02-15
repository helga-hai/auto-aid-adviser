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
        google: null,
        location: {
            id: 'marker-self',
            position: null,
            icon: 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_yellowA.png',
            // content: '',
            description: `<div class="content"><h3>Ваше місцезнаходження</h3></div>`
        },
        selected: null,
        from: null,
        isLocation: false
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
        SELECTED: state => {
            return state.selected
        },
        FROM: state => {
            return state.from;
        },
        ISLOCATION: state => {
            return state.isLocation;
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
                // markerBody.icon = 'http://maps.google.com/mapfiles/kml/paddle/ylw-circle.png';
                markerBody.icon = 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_yellowA.png';
                markerBody.id = `marker-${item.id}`;
                // });
                // this.$store.commit('search/GET_MARKER_ENTITIES',[`marker-${item.id}`, markerBody])
                // state.markersEntities[`marker-${item.id}`] = markerBody
                markerBody.description = `<div class="content marker-${item.id}"><h3>${item.name}</h3><hr class="grey" />${item.contact.phone}</div>`;
                // item.contact.phone `<h3>${item.name}</h3>`;item.images[0]?item.images[0].urlImage:''
                // `<div class="content" id="content-${item.id}" style="max-height:300px; font-size:12px;"><h3>${item.title}</h3><hr class="grey" />${item.images[0]?item.images[0].urlImage:'' + item.description}</div>`
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
        success(state, message) {
            console.log('success')
            state.gettingLocation = true;
            navigator.geolocation.getCurrentPosition(pos => {
                state.gettingLocation = false;
                state.location.position = {};
                state.location.position.lat = pos.coords.latitude;
                state.location.position.lng = pos.coords.longitude;
                state.markersEntities.push(state.location)
                state.isLocation = true
            }, err => {
                state.gettingLocation = false;
                state.errorStr = err.message;
            })

        },
        SELECT_MARKER(state, payload) {
            console.log(`SELECT_MARKER marker-${payload}`)
            let tmp = state.markersEntities.filter(item => item.id == `marker-${payload}`)
            state.selected = tmp
        },
        SET_ENCODING_MY_LOCATION(state, { data }) {
            console.log('SET_ENCODING_MY_LOCATION', data)
            var longest = data.results.reduce(function(a, b) { return a.formatted_address.length > b.formatted_address.length ? a : b; });
            state.from = longest.formatted_address
        },
    },
    actions: {
        START_SEARCH: async(context, payload) => {

            let uri = payload ?
                userService.config.apiUrl + `/api/search?service=${payload.service}&latitude=${payload.latitude}&longitude=${payload.longitude}&radius=10.0` :
                userService.config.apiUrl + `/api/search?service=${context.state.serviceForBusiness}&latitude=${context.state.latitude}&longitude=${context.state.longitude}&radius=10.0`
                // let uri = userService.config.apiUrl + '/api/businesses/' + context.state.serviceForBusiness + '/' + context.state.longitude + '/' + context.state.latitude;
            console.log('START_SEARCH2', uri);
            // let options = authHeader() ? { headers: authHeader() } : {};
            let response = await axios.get(uri);
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
        },
        getLocation({ commit }, payload) {
            console.log('search/getLocation')
            if (!("geolocation" in navigator)) {
                // no
                commit('error', 'Geolocation is not available.');
            } else {
                // yes
                commit('success')
            }
        },
        // getLocation: async(context, payload) => {
        //     console.log('getLocation')
        //     if (!("geolocation" in navigator)) {
        //         console.log('111', !("geolocation" in navigator))
        //             // commit('error', 'Geolocation is not available.');
        //     } else {
        //         context.state.gettingLocation = true;
        //         var tmp = {};
        //         navigator.geolocation.getCurrentPosition(pos => {
        //             context.state.gettingLocation = false;
        //             tmp.lat = pos.coords.latitude;
        //             tmp.lng = pos.coords.longitude;
        //             context.state.location.position = tmp
        //             context.state.markersEntities.push(context.state.location);
        //             console.log('TMP )) ', tmp, context.state.location)
        //         }, err => {
        //             context.state.gettingLocation = false;
        //             context.state.errorStr = err.message;
        //             console.log('TMP ))2 ', context.state.errorStr)
        //         })
        //         await context.commit('success')
        //         await context.dispatch('GET_ENCODING_MY_LOCATION', tmp)
        //     }
        // },
        // GET_LOCATION: async(context, payload) => { 
        //     const options = authHeader() ? { headers: authHeader() } : {};
        //     const uri = userService.config.apiUrl + '/api/businesses/' + payload
        //     let { data } = await axios.get(uri, options);
        //     context.commit('SET_BUSINESS_DATA_PRPEND', data);
        // },
        GET_ENCODING_MY_LOCATION: async(context, payload) => {
            console.log('GET_ENCODING_MY_LOCATION ', context.state.location, payload)
                // var lat = tmp.lat;
                // var lng = tmp.lng;
            console.log('payload11 ', typeof payload, payload.toString())
            let uri = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + payload.lat + ',' + payload.lng + '&key=' + 'AIzaSyBasISENNNlp6Immcd1Rr5pGhkQ5Um1ZVA'
            var config = {
                method: "GET",
                url: uri,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
            }
            let { data } = await axios(uri, config);
            console.log(data)
            context.commit('SET_ENCODING_MY_LOCATION', { data });
        },
    }
}