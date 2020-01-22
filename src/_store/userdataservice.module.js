//Experemental Module

import { authHeader, router } from '../_helpers';
import { userService } from '../_services';
import axios from 'axios';

export const userdataservice = {
    namespaced: true,
    state: {
        personalPageData: {
            surname: null,
            name: null,
            phone: null,
        },
        types: null,
        brands: null,
        models: null,
        selectedModelId: null,
        currentIndex: null,
        car:null,




        // menuItem: null,

    },
    getters: {
        TYPES: state => {
            return state.types; //let name = this.$store.getters.types
        },
    },
    actions: {
        GET_TYPES: async(context, payload) => {
            console.log('GET_TYPES')
            const config = {
                method: 'get',
                url: userService.config.apiUrl + '/api/catalog/car/types',
                headers: authHeader()
            }
            let { data } = await axios(config);
            context.commit('SET_TYPES', data);
        },

        GET_MULTIPART: async(context, carInfo) => {
            let customHeader = authHeader();
            console.log(customHeader);
            customHeader['Content-Type'] = undefined;
            console.log("THIS " + customHeader['Content-Type']);
            console.log("THIS " + customHeader['Authorization']);
            console.log(customHeader);
            let formData = new FormData();
            // formData.append("file", carPhoto);
            // formData.append("json", JSON.stringify(carInfo));
            // formData.append('properties', new Blob(JSON.stringify({
            //     "name": "root",
            //     "password": "root"                    
            // }), {
            //     type: "application/json"
            // }));


            const config = {
                method: 'POST',
                url: userService.config.apiUrl + '/api/user/profile/car',
                headers: customHeader,
                data: formData,
            };


            let { data } = await axios(config);
            context.commit('SET_MULTIPART', data);

        },
        // getData(path) {




        // const requestOptions = {
        //     method: 'GET',
        //     headers: authHeader(),
        // };

        // return fetch(`${userService.config.apiUrl}/${path}`, requestOptions)
        //     .then(userService.handleResponse);

        // },
        getData(val) {
            return val;
        },
        // getAll({ commit }) {
        //     commit('getAllRequest');

        //     userService.getAll()
        //         .then(
        //             users => commit('getAllSuccess', users),
        //             error => commit('getAllFailure', error)
        //         );
        // }
        fieldsVal({ commit }, val) {
            // console.log(data);
            commit('setData', val);
        }
    },

    mutations: {
        SET_TYPES: (state, payload) => {
            state.types = payload;
        },
        SET_MULTIPART: (state, payload)=>{

            state.car = payload;
            console.log(payload)

        },
        setData(state, data) {
            console.log(data[1]);
            console.log(data);
            let toState = data[1];
            state[toState] = data[0];
            console.log(state[toState]);
        },

        // setData(state, resp){
        //     return state.user_data.role.resp.role = resp.role;
        // {
        //     id: resp.id,
        //     role: resp.role,
        //     email: resp.email,
        // }

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
    // }
};