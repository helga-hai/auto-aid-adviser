export const selfLocation = {
    namespaced: true,
    state: {
        location: {
            id: '0',
            position: null,
            content: ''
        },
        gettingLocation: false,
        errorStr: null
    },
    getters: {
        doneLocation: state => {
            return state.location

        }
    },
    actions: {
        getLocation({ commit }, payload) {
            //do we support geolocation
            if (!("geolocation" in navigator)) {
                // no
                commit('error', 'Geolocation is not available.');
            } else {
                // yes
                commit('success')
            }
        },
        changeLocation({ commit }, payload) {
            //do we support geolocation

            commit('getAddressMarker', payload)

        }
    },
    mutations: {
        getAddressMarker(state, { addressData, placeResultData, id }) {
            console.log('STORE getAddressMarker', { addressData, placeResultData, id })
            state.location.position = {};
            state.location.position.lat = placeResultData.geometry.location.lat();
            state.location.position.lng = placeResultData.geometry.location.lng()
            console.log(state.location)
                // state.acLatLng = { lat: lat, lng: lng }
                // state.sendObject.location = { latitude: lat, longitude: lng }
                // state.sendObject.location = {
                //     address: placeResultData.formatted_address,
                //     latitude: placeResultData.geometry.location.lat(),
                //     longitude: placeResultData.geometry.location.lng()
                // }
                // state.address = addressData;
        },
        success(state, message) {
            state.gettingLocation = true;
            // get position
            navigator.geolocation.getCurrentPosition(pos => {
                state.gettingLocation = false;
                state.location.position = {};
                state.location.position.lat = pos.coords.latitude;
                state.location.position.lng = pos.coords.longitude;
                console.log(state.location)
            }, err => {
                state.gettingLocation = false;
                state.errorStr = err.message;
            })
        },
        error(state, message) {
            state.errorStr = message;
        },
    }
}