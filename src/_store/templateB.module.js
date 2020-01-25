import { userService } from '../_services';
import { authHeader, router } from '../_helpers';

import axios from 'axios';

export const templateB = {
    namespaced: true,
    state: {
        // allBusinesServises: [],
        // serviceTypesList: [],
        // serviceTypesObj: [],
        // st: [],
        // service: {
        //     run: [],
        //     bite: [],
        //     scream: []
        // },
        // dataList: [],
        categoryList: [],
    },
    getters: {
        // SERVICE: state => {
        //     return state.service; //let name = this.$store.getters.NAME
        // },
        // DATALIST: state => {
        //     return state.dataList; //let name = this.$store.getters.NAME
        // },
        CATEGORYLIST: state => {
            return state.categoryList; //let name = this.$store.getters.NAME
        },
    },
    actions: {
        fillallBusinesServises(state, payload) {
            state.commit('fillallBusinesServises', payload);
        },
        GET_CATTEGORY_LIST: async(context, payload) => {
            const config = {
                method: 'get',
                url: userService.config.apiUrl + '/api/catalog/business/type/17/service/types',
                headers: authHeader()
            }
            let { data } = await axios(config);
            context.commit('SET_CATTEGORY_LIST', data);
        },
        GET_SERVICE_LIST: async(context, ID) => {
            console.log('GET_SERVICE_LIST', ID)

            function config(ID) {
                return {
                    method: 'get',
                    url: userService.config.apiUrl + '/api/catalog/service/type/' + ID + '/services',
                    headers: authHeader()
                }
            }
            for (let i = 0; i < ID.length; i++) { //Type Services
                //let tmpObj = {}
                let { data } = await axios(config(ID[i]));
                let categoryID = ID[i];
                context.commit('SET_SERVICE_LIST', { data, categoryID })
            }
            //console.log(context.serviceList)
            // context.categoryList.forEach(async item=>{
            //     let { data } = await axios(config(item.id));
            //     context.commit('SET_SERVICE_LIST', data);
            // })
            // asyncForEach([1, 2, 3], async (num) => {
            //     await waitFor(50);
            //     console.log(num);
            //   })
        },
        // GET_DATALIST: async(context, payload) => {
        //     console.log('GET_DATALIST')
        //     const config = {
        //         method: 'get',
        //         url: userService.config.apiUrl + '/api/catalog/services',
        //         headers: authHeader()
        //     }
        //     let { data } = await axios(config);
        //     context.commit('SET_DATALIST', data);
        // },

        // SAVE_DATALIST: async(context, payload) => {
        //     console.log('SAVE_DATALIST')
        //     let { data } = await axios.post(userService.config.apiUrl + '/api/catalog/services', requestOptions);
        //     context.commit('ADD_DATALIST', payload);
        // },
    },
    mutations: {
        SET_CATTEGORY_LIST: (state, payload) => {
            console.log('SET_CATTEGORY_LIST')
            state.categoryList = payload;
            console.dir(state.categoryList)
        },
        SET_SERVICE_LIST: (state, { data, categoryID }) => {
            console.log('SET_SERVICE_LIST')
            for (let k = 0; k < state.categoryList.length; k++) { //categoryList
                if (state.categoryList[k].id === categoryID) {
                    state.categoryList[k]['list'] = data
                }
            }
        },
    }
}