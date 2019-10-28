export const selfLocation = {
    namespaced: true,
    state: {
        location: null,
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
                state.location = pos;
                console.log(typeof state.location.coords.latitude)
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