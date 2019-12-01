export const selfLocation = {
    namespaced: true,
    state: {
        location: {
            id: '0'
        },
        gettingLocation: false,
        errorStr: null
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
        }
    },
    mutations: {
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