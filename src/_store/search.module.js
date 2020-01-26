import { userService } from '../_services';
import { authHeader, router } from '../_helpers';

import axios from 'axios';


export const search = {
    namespaced: true,
    state: {
        latitude: '',
        longitude: '',
        serviceForBusiness: ''
    },
    getters: {},
    mutations: {
        SET_POSITION: (state, { lat, lng }) => {
            state.latitude = lat;
            state.longitude = lng;
        },
        SET_SERVICE: (state, payload) => {
            state.serviceForBusiness = payload;
        },
        SET_SEARCH: (state, payload) => {
            console.log(payload)
        },
    },
    actions: {
        START_SEARCH: async(context, payload) => {
            console.dir(authHeader())
            let uri = userService.config.apiUrl + '/api/businesses/' + context.state.serviceForBusiness + '/' + context.state.longitude + '/' + context.state.latitude;
            console.log('START_SEARCH', uri);
            let options = authHeader() ? { headers: authHeader() } : {};
            let { data } = await axios.get(uri, options); ///{serviceForBusiness}/{longtitude}/{latitude}
            context.commit('SET_SEARCH', data);
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