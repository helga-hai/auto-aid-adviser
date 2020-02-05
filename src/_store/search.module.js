import { userService } from '../_services';
import { authHeader, router } from '../_helpers';

import axios from 'axios';


export const search = {
    namespaced: true,
    state: {
        latitude: '',
        longitude: '',
        serviceForBusiness: '',
        searchData: null
    },
    getters: {
        SEARCHDATA: state => {
            return state.searchData; //let name = this.$store.getters.NAME
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
        },
    },
    actions: {
        START_SEARCH: async(context, payload) => {
            console.dir(authHeader())

            let uri = userService.config.apiUrl + `/api/search?service=${context.state.serviceForBusiness}&latitude=${context.state.latitude}&longitude=${context.state.longitude}&radius=10.0`
                // let uri = userService.config.apiUrl + '/api/businesses/' + context.state.serviceForBusiness + '/' + context.state.longitude + '/' + context.state.latitude;
            console.log('START_SEARCH1', uri);
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