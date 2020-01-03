// import { userService } from '../_services';

export const create = {
    namespaced: true,
    state: {
        acLatLng:{},
        address: '',
        sendObject: {//для відправки на бек для створення бізнесу
            "contact": {
                "phone": "string",
                "site": "string"
            },
            "id": 0,
            "location": {
                "address": "string",
                "latitude": 0,
                "longitude": 0
            },
            "name": "string",
            "serviceForBusinesses": [
                {"id": 0}
            ],
            "workTimes": [
                {
                "day": 0,
                "fromTime": {
                    "hour": 0,
                    "minute": 0,
                    "nano": 0,
                    "second": 0
                    },
                "id": 0,
                "toTime": {
                    "hour": 0,
                    "minute": 0,
                    "nano": 0,
                    "second": 0
                    }
                }
            ]
        },
    },
    getters: {
        SendObject: state => {
            return state.sendObject
        },
        
    },
    actions: {
        // getAll({ commit }) {
        //     commit('getAllRequest');

        //     userService.getAll()
        //         .then(
        //             users => commit('getAllSuccess', users),
        //             error => commit('getAllFailure', error)
        //         );
        // }
    },
    mutations: {
        fillName(state, payload) {
            console.log('payload',payload)
            state.sendObject.name = payload
        },
        // fillLocation(state, payload){
        //     state.sendObject.location.address = payload
        //     state.sendObject.location.latitude = payload
        //     state.sendObject.location.longitude = payload
        // },
        fillPhone(state, payload){
            console.log('phoneNamber',payload)
            state.sendObject.contact.phone = payload
        },
        fillSite(state, payload){
            console.log('site',payload)
            state.sendObject.contact.site = payload
            // console.log(state.sendObject.contact.site)
        },
        getAddressData(state, {addressData, placeResultData, id}) {
            console.log('STORE getAddressData',{addressData, placeResultData, id})
            // console.log('addressData=')
            // console.dir(addressData)
            // console.log('placeResultData=')
            // console.dir(placeResultData)
            let lat=placeResultData.geometry.location.lat()
            let lng=placeResultData.geometry.location.lng()
            console.log(lat,lng)
            state.acLatLng={lat:lat,lng:lng}
            state.sendObject.location={latitude:lat,longitude:lng}
            state.sendObject.location={
                address: placeResultData.formatted_address,
                latitude: placeResultData.geometry.location.lat(),
                longitude: placeResultData.geometry.location.lng()
            }
            state.address = addressData;
        },

        // getAllRequest(state) {
        //     state.all = { loading: true };
        // },
        // getAllSuccess(state, users) {
        //     state.all = { items: users };
        // },
        // getAllFailure(state, error) {
        //     state.all = { error };
        // }
    }
}