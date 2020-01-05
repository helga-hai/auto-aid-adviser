// import { userService } from '../_services';

export const templateB = {
    namespaced: true,
    state: {
        allBusinesServises: []
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
        fillallBusinesServises(state, payload) {
            // console.log('payloadqqq',payload)
            state.allBusinesServises = payload
            console.log("allBusinesServises1:"+ JSON.stringify(state.allBusinesServises))
        },
        // // fillLocation(state, payload){
        // //     state.sendObject.location.address = payload
        // //     state.sendObject.location.latitude = payload
        // //     state.sendObject.location.longitude = payload
        // // },
        // fillPhone(state, payload){
        //     console.log('phoneNamber',payload, state.contact)
        //     state.sendObject.phone = payload
        // },
        // fillSite(state, payload){
        //     console.log('site',payload, this.state)
        //     state.sendObject.site = payload
        // },
        // getAddressData(state, {addressData, placeResultData, id}) {
        //     console.log('STORE getAddressData',{addressData, placeResultData, id})
        //     // console.log('addressData=')
        //     // console.dir(addressData)
        //     // console.log('placeResultData=')
        //     // console.dir(placeResultData)
        //     let lat=placeResultData.geometry.location.lat()
        //     let lng=placeResultData.geometry.location.lng()
        //     console.log(lat,lng)
        //     state.acLatLng={lat:lat,lng:lng}
        //     state.sendObject.location={latitude:lat,longitude:lng}
        //     state.sendObject.location={
        //         address: placeResultData.formatted_address,
        //         latitude: placeResultData.geometry.location.lat(),
        //         longitude: placeResultData.geometry.location.lng()
        //     }
        //     state.address = addressData;
        // },

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