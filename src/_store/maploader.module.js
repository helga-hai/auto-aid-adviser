export const maploader = {
    namespaced: true,
    state: {
        isMap: false,
        options: {
            libraries: [], //'places'
            apiKey: '' // optional
        }
    },
    actions: {
        setConnect() {
            var GoogleMapsApiLoader = require('google-maps-api-loader');

            GoogleMapsApiLoader({
                    libraries: ['places'],
                    apiKey: 'your-api-key' // optional
                })
                .then(function(googleApi) {
                    var autocomplete = new googleApi.maps.places.AutocompleteService();
                }, function(err) {
                    console.error(err);
                });
        }
    },
    mutations: {}
}