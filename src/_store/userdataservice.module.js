//Experemental Module

import { authHeader, router } from '../_helpers';
import { userService } from '../_services';

export const userdataservice = {
    namespaced: true,
    state: {

        firsName: null,
        lastName: null,
        menuItem: null,

    },
    actions: {
        getData(){

                const requestOptions = {
                    method: 'GET',
                    headers: authHeader()
                };
            
                return fetch(`${userService.config.apiUrl}/users`, requestOptions)
                .then(userService.handleResponse);
            
        },
        // getAll({ commit }) {
        //     commit('getAllRequest');

        //     userService.getAll()
        //         .then(
        //             users => commit('getAllSuccess', users),
        //             error => commit('getAllFailure', error)
        //         );
        // }
        menuVal({ commit },val){
            // console.log(data);
            commit('changeItem',val);
        }
    },

    mutations: {
        changeItem(state,val){
            // console.log(data);
            state.menuItem = val;
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