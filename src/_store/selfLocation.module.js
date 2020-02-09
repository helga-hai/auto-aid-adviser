export const selfLocation = {
    namespaced: true,
    state: {
        location: {
            id: '0',
            position: null,
            content: ''
        },
        ac_location: null,
        gettingLocation: false,
        errorStr: null,
        toggleAddres: false
    },
    getters: {
        doneLocation: state => {
            return state.location
<<<<<<< HEAD

        
=======
>>>>>>> 1698edb600bb5203b508bac30babb3761436857c
        },
        gettingLocation: state => {
            return state.gettingLocation
        },
        toggleAddres: state => {
            return state.toggleAddres
        },
        ac_location: state => {
            return state.ac_location
        },
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
            state.ac_location = {};
            state.ac_location.lat = placeResultData.geometry.location.lat();
            state.ac_location.lng = placeResultData.geometry.location.lng()
            console.log(state.location)
            state.toggleAddres = !state.toggleAddres
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