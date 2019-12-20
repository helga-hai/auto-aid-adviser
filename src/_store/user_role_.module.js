//Experemental Module

import { authHeader, router } from '../_helpers';
import { userService } from '../_services';

export const user_data_service = {
    namespaced: true,
    state: {

            firs_name: null,
            last_name: null,
            email: null,

    },
    actions: {
        getData(){

                const requestOptions = {
                    method: 'GET',
                    headers: authHeader()
                };
            
                return fetch(`${userService.config.apiUrl}/users`, requestOptions)
                .then(userService.handleResponse);
            
        }
        // getAll({ commit }) {
        //     commit('getAllRequest');

        //     userService.getAll()
        //         .then(
        //             users => commit('getAllSuccess', users),
        //             error => commit('getAllFailure', error)
        //         );
        // }
    },
    mutations: {
        setData(state, resp){
            return state.user_data.role.resp.role = resp.role;
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
    }
};