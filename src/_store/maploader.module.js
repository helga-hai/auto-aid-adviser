export const maploader = {
    namespaced: true,
    state: {
        isMap: false,
        mapObj: null
            // options: {
            //     libraries: [], //'places'
            //     apiKey: '' // optional
            // }
    },
    getters: {
        ISMAP: state => {
            return state.isMap
        },
        MAPOBJ: state => {
            return state.mapObj
        },
    },
    actions: {
        // setConnect() {
        //     var GoogleMapsApiLoader = require('google-maps-api-loader');

        //     GoogleMapsApiLoader({
        //             libraries: ['places'],
        //             apiKey: 'your-api-key' // optional
        //         })
        //         .then(function(googleApi) {
        //             var autocomplete = new googleApi.maps.places.AutocompleteService();
        //         }, function(err) {
        //             console.error(err);
        //         });
        // }
    },
    mutations: {
        IS_MAP(state, payload) {
            console.log(payload)
            state.isMap = true
            state.mapObj = payload
        },
    }
}