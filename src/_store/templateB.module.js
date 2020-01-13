import { userService } from '../_services';
import { authHeader, router } from '../_helpers';

import axios from 'axios';

export const templateB = {
    namespaced: true,
    state: {
        allBusinesServises: [],
        serviceTypesList: [],
        serviceTypesObj: [],
        st: [],
        service: {
            run: [],
            bite: [],
            scream: []
        },
        dataList: []
    },
    getters: {
        SERVICE: state => {
            return state.service; //let name = this.$store.getters.NAME
        },
        DATALIST: state => {
            return state.dataList; //let name = this.$store.getters.NAME
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
        // fillallBusinesServises: async(context) => {
        //     let { data } = await axios.post(userService.config.apiUrl + '/api/catalog/services', { headers: authHeader() });

        //     if (data.status == 200) {
        //         context.commit('fillallBusinesServises');
        //     }
        // },
        fillallBusinesServises(state, payload) {
            state.commit('fillallBusinesServises', payload);
            // state.allBusinesServises = payload;
            // payload.forEach(item => {
            //     if (state.serviceTypesList.indexOf(item.serviceType.name) < 0) {
            //         state.serviceTypesList.push(item.serviceType.name)
            //     }
            // });
            // state.serviceTypesList.forEach(item => {
            //     for (let i = 0; i < state.allBusinesServises.length; i++) {
            //         if (state.allBusinesServises[i].serviceType.name == item) {
            //             let tmpObj = {}
            //             tmpObj['id'] = state.allBusinesServises[i].serviceType.id
            //             tmpObj['name'] = state.allBusinesServises[i].serviceType.name
            //             state.serviceTypesObj.push(tmpObj)
            //         }
            //     }
            // })

            // function getUnique(arr, comp) {
            //     const unique = arr
            //         .map(e => e[comp])
            //         // store the keys of the unique objects
            //         .map((e, i, final) => final.indexOf(e) === i && i)
            //         // eliminate the dead keys & store unique objects
            //         .filter(e => arr[e]).map(e => arr[e]);
            //     return unique;
            // }

            // state.st = getUnique(state.serviceTypesObj, 'id')
        },
        GET_DATALIST: async(context, payload) => {
            console.log('GET_DATALIST')
            const requestOptions = {
                //method: 'GET',
                headers: authHeader()
            };
            const config = {
                method: 'get',
                url: userService.config.apiUrl + '/api/catalog/services',
                headers: authHeader()
            }
            let { data } = await axios(config);
            context.commit('SET_DATALIST', data);
        },

        SAVE_DATALIST: async(context, payload) => {
            console.log('SAVE_DATALIST')
            let { data } = await axios.post(userService.config.apiUrl + '/api/catalog/services', requestOptions);
            context.commit('ADD_DATALIST', payload);
        },
    },
    mutations: {
        SET_DATALIST: (state, payload) => {
            console.log('SET_DATALIST')
            state.dataList = payload;
        },
        ADD_DATALIST: (state, payload) => {
            console.log('ADD_DATALIST')
            state.datsList.push(payload);
        },
        fillallBusinesServises(state, payload) {
            state.allBusinesServises = payload;

            //
            payload.filter(item => {

                })
                //
            payload.forEach(item => {
                if (state.serviceTypesList.indexOf(item.serviceType.name) < 0) {
                    state.serviceTypesList.push(item.serviceType.name)
                }
            });
            state.serviceTypesList.forEach(item => {
                for (let i = 0; i < state.allBusinesServises.length; i++) {
                    if (state.allBusinesServises[i].serviceType.name == item) {
                        let tmpObj = {}
                        tmpObj['id'] = state.allBusinesServises[i].serviceType.id
                        tmpObj['name'] = state.allBusinesServises[i].serviceType.name
                        state.serviceTypesObj.push(tmpObj)
                    }
                }
            })

            function getUnique(arr, comp) {
                const unique = arr
                    .map(e => e[comp])
                    // store the keys of the unique objects
                    .map((e, i, final) => final.indexOf(e) === i && i)
                    // eliminate the dead keys & store unique objects
                    .filter(e => arr[e]).map(e => arr[e]);
                return unique;
            }

            state.st = getUnique(state.serviceTypesObj, 'id')
        },
    }
}