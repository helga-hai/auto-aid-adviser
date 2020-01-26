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
                //     {
                //     "day": null,
                //     "fromTime": {
                //         "hour": null,
                //         "minute": null,
                //         "nano": null,
                //         "second": null
                //     },
                //     "id": null,
                //     "toTime": {
                //         "hour": null,
                //         "minute": null,
                //         "nano": null,
                //         "second": null
                //     }
                // }]
        },
        businessPrepend: null,
        myObjects: null
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
                // "workTimes": [{
                //     "day": null,
                //     "fromTime": {
                //         "hour": null,
                //         "minute": null,
                //         "nano": null,
                //         "second": null
                //     },
                //     "id": null,
                //     "toTime": {
                //         "hour": null,
                //         "minute": null,
                //         "nano": null,
                //         "second": null
                //     }
                // }]
                // const config = {
                //     method: 'put',
                //     url: userService.config.apiUrl + '/api/businesses',
                //     headers: authHeader()
                // }
                // let { data } = await axios(config);
                // context.commit('SEND_BUSINESS', data);
        },
        SEND_MULTIPART_BUSINESS: async(context, payload) => {
            console.log('SEND_MULTIPART_BUSINESS', payload)
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
    },
    mutations: {
        fillBusinesTemplate(state, payload) {
            console.log('dawdawdaw', payload)
            state.sendObject = payload;
        },

        fillName(state, payload) {
            console.log('payload', payload)
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