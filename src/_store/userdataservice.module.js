//Experemental Module

import { authHeader, router } from '../_helpers';
import { userService } from '../_services';

export const userdataservice = {
    namespaced: true,
    state: {
        personalPageData: {
            surname: null,
            name: null,
            phone: null,
        },
        types: null,



        // menuItem: null,

    },
    actions: {
        getData(path) {




            // const requestOptions = {
            //     method: 'GET',
            //     headers: authHeader(),
            // };

            // return fetch(`${userService.config.apiUrl}/${path}`, requestOptions)
            //     .then(userService.handleResponse);

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

    }
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