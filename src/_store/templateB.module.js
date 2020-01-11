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
    },
    mutations: {
        fillallBusinesServises(state, payload) {
            state.allBusinesServises = payload;
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