// import { userService } from '../_services';

export const templateB = {
    namespaced: true,
    state: {
        allBusinesServises: [],
        serviceTypesList: [],
        service:{
            run: [],
            bite: [],
            scream: []
        },
        test: [

        ]
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
            
            state.allBusinesServises =  payload;
            state.allBusinesServises.forEach(item => {
            if (state.serviceTypesList.indexOf(item.serviceType.name) < 0) {
                state.serviceTypesList.push(item.serviceType.name)
            }

            });
            for(let i = 0; i < state.serviceTypesList.length; i++){
                let serviceType = state.serviceTypesList[i];
                // state.test.push(serviceType);
                state.allBusinesServises.forEach(item => {
                    if (state.test.indexOf(item.serviceType.name) < 0) {
                        if( serviceType == item.serviceType.name){
                        state.test.push(item.name)
                    }
                    }
                })
                
            }
            console.log(JSON.stringify(state.test))
            
            // for(let i = 0; i < state.serviceTypesList.length; i++){
            //     console.log(state.serviceTypesList[i])
            //     //     if(state.allBusinesServises.serviceType.name )
            //     // }
            // }
            // for(let i=0; i < state.allBusinesServises.length; i++){
            //     // console.log(state.allBusinesServises[i])
            //     for(let key of state.allBusinesServises[i]){
            //         console.log(key)
            //     }
            // }
            // for(let i=0; i < state.allBusinesServises.length; i++){
            //     console.log(state.allBusinesServises[i])
            //     for(let j = 0; j < state.serviceTypesList; j++ ){
            //         console.log("sssssssssssssss"+state.serviceTypesList[j])
            //         if(state.allBusinesServises.serviceType.name[i] == state.serviceTypesList[j]){
                        
            //         }
            //     }
            // }
            
            console.log("allBusinesServises1:"+ JSON.stringify(state.allBusinesServises))
            console.log("serviceTypesList:"+ JSON.stringify(state.serviceTypesList))
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