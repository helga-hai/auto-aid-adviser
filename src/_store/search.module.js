import { userService } from '../_services';


import { router } from '../_helpers';
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
    },
    actions: {
        GET_DOTS: async(context, payload) => {
            console.log('userService.config.apiUrl=', userService.config.apiUrl)
                // let {data} = await Axios.get('http://yourwebsite.com/api/disk');///{serviceForBusiness}/{longtitude}/{latitude}
                // context.commit('SET_TODO', data);
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