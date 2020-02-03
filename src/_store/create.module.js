import { userService } from '../_services';
import { authHeader, router } from '../_helpers';
import axios from 'axios';

export const create = {
    namespaced: true,
    state: {
        acLatLng: {},
        address: '',
        sendObject: { //для відправки на бек для створення бізнесу
            "contact": {
                "phone": "",
                "url": ""
            },
            "id": null,
            "location": {
                "address": "",
                "latitude": null,
                "longitude": null
            },
            "name": "",
            "serviceForBusinesses": [],
            "workTimes": []
        },
        businessPrepend: null,
        myObjects: null,
        encoding: null
    },
    getters: {
        SendObject: state => {
            return state.sendObject
        },
        businessPrepend: state => {
            return state.businessPrepend
        },
        MY_OBJECTS: state => {
            return state.myObjects; //let name = this.$store.getters.NAME
        },
        acLatLng: state => {
            return state.acLatLng; //let name = this.$store.getters.NAME
        },
        encoding: state => {
            return state.encoding; //let name = this.$store.getters.NAME
        },
        ADDRESS: state => {
            return state.address; //let name = this.$store.getters.ADDRESS
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

        GET_TIME: (context, payload) => {
            console.log('GET_TIME', payload)

            payload.forEach(item => {
                let single = {}
                single.day = item.day;
                single.fromTime = item.fromTime;
                single.toTime = item.toTime;
                // if (item.fromTime) {
                //     single.fromTime = {};
                //     single.fromTime.hour = parseInt(item.fromTime[0])
                //     single.fromTime.minute = parseInt(item.fromTime[1])

                //     single.toTime = {};
                //     single.toTime.hour = parseInt(item.toTime[0])
                //     single.toTime.minute = parseInt(item.toTime[1])
                // }
                context.commit('SET_TIME', single);

            })
        },
        SEND_MULTIPART_BUSINESS: async(context, payload) => {
            console.log('SEND_MULTIPART_BUSINESS', payload[0])
            var str = JSON.stringify(context.state.sendObject)
            var formData = new FormData();
            formData.append("files", payload);
            formData.append('json', new Blob([str], {
                type: "application/json"
            }));
            // var businessHeader = authHeader()
            // businessHeader['Content-Type'] = undefined; //'multipart/form-data';
            // businessHeader['Authorization'] = `Bearer ${localStorage.getItem('token').split('"').join('')}`;

            var config = {
                method: "POST",
                url: userService.config.apiUrl + '/api/businesses',
                // headers: businessHeader,
                headers: {
                    'Accept': 'application/json, */*',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token').split('"').join(' ')}`
                },
                data: formData
            }
            console.dir(config)
            let { data } = await axios(config);
            context.commit('SET_MULTIPART_BUSINESS', data);
            context.dispatch('GET_BUSINESS_DATA', data.id);
        },
        GET_BUSINESS_DATA: async(context, payload) => { // попередній перегляд щойно створеного обєкту
            const options = authHeader() ? { headers: authHeader() } : {};
            const uri = userService.config.apiUrl + '/api/businesses/' + payload
            let { data } = await axios.get(uri, options);
            context.commit('SET_BUSINESS_DATA_PRPEND', data);
        },
        GET_MY_BUSINESS_DATA: async(context, payload) => { // попередній перегляд щойно створеного обєкту
            const options = authHeader() ? { headers: authHeader() } : {};
            const uri = userService.config.apiUrl + '/api/businesses/'
            let { data } = await axios.get(uri, options);
            context.commit('SET_MY_BUSINESS_DATA', data);
        },
        DELETE_BUSINESS: async(context, payload) => { // попередній перегляд щойно створеного обєкту
            const options = authHeader() ? { headers: authHeader() } : {};
            const uri = userService.config.apiUrl + '/api/businesses/' + payload
            let { data } = await axios.delete(uri, options);
            // context.commit('', data);
        },
        GET_ENCODING: async(context, payload) => {
            console.log('payload type', typeof payload)
            console.log('payload ', payload)
            const lat = payload.lat;
            const lng = payload.lng;
            let uri = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=' + 'AIzaSyBasISENNNlp6Immcd1Rr5pGhkQ5Um1ZVA'
            var config = {
                method: "GET",
                url: uri,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
            }
            context.state.sendObject.location.latitude = lat
            context.state.sendObject.location.longitude = lng
            let { data } = await axios(uri, config);
            context.commit('SET_ENCODING', data, lat, lng);
        }
    },
    mutations: {
        fillBusinesTemplate(state, payload) {
            state.sendObject = payload;
        },

        fillName(state, payload) {
            state.sendObject.name = payload
        },
        // fillLocation(state, payload){
        //     state.sendObject.location.address = payload
        //     state.sendObject.location.latitude = payload
        //     state.sendObject.location.longitude = payload
        // },
        fillPhone(state, payload) {
            state.sendObject.contact.phone = payload
        },
        fillSite(state, payload) {
            state.sendObject.contact.url = payload
        },
        getAddressData(state, { addressData, placeResultData, id }) {
            console.log('STORE getAddressData', { addressData, placeResultData, id })
            let lat = placeResultData.geometry.location.lat()
            let lng = placeResultData.geometry.location.lng()
            console.log(lat, lng)
            state.acLatLng = { lat: lat, lng: lng }
            state.sendObject.location = { latitude: lat, longitude: lng }
            state.sendObject.location = {
                address: placeResultData.formatted_address,
                latitude: placeResultData.geometry.location.lat(),
                longitude: placeResultData.geometry.location.lng()
            }
            state.address = addressData;
        },
        getServiceForBusinesses(state, payload) {
            console.log('create/getServiceForBusinesses', payload)
            payload.forEach(item => {
                let tmp = {};
                tmp.id = item
                state.sendObject.serviceForBusinesses.push(tmp)
            })
        },
        SET_TIME(state, payload) {
            state.sendObject.workTimes.push(payload)
        },
        SET_MULTIPART_BUSINESS(state, payload) {
            console.log('SET_MULTIPART_BUSINESS')
            console.log(payload)
        },
        SET_BUSINESS_DATA_PRPEND: (state, payload) => {
            console.log('SET_BUSINESS_DATA_PRPEND')
            state.businessPrepend = payload;
            console.dir(state.business)
        },
        SET_MY_BUSINESS_DATA: (state, payload) => {
            console.log('SET_MY_BUSINESS_DATA')
            console.dir(payload)
            state.myObjects = payload;
        },
        SET_ENCODING: (state, payload) => {
            var longest = payload.results.reduce(function(a, b) { return a.formatted_address.length > b.formatted_address.length ? a : b; });
            state.encoding = longest.formatted_address;
            state.sendObject.location.address = longest.formatted_address;
            console.log(longest.formatted_address)
            state.address = longest.formatted_address;
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