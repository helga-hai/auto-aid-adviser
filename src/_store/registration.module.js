import { userService } from '../_services';
import { router } from '../_helpers';
import axios from 'axios';

export const registration = {
    namespaced: true,
    state: {
        // name: null,
        email: null,
        password: null,
        role: null,
        status: null,
    },
    actions: {
        saveStateData({ commit }, payload) {
            console.log(payload);
            commit('view');
        },

        register({ commit }, user) {

            console.log('user', user);
            userService.regist(user)
                .then(
                    resp => {
                        console.log('resp');
                        console.log(resp);
                            commit('auth_success', resp);
                            userService.successRegist();
                    },
                    reject => {
                        console.log('register reject', reject);
                            //commit('loginFailure', error);
                            // dispatch('alert/error', reject, { root: true }); 
                    });
            // return new Promise((resolve, reject) => {
            //     //commit('auth_request')
            //     fetch({ url: 'http://localhost:8080/api/user/register', data: user, method: 'POST' })
            //         .then(resp => {
            //             console.log('resp')
            //             console.log(resp)
            //                 //const token = resp.data.token
            //                 //const user = resp.data.user
            //                 //localStorage.setItem('token', token)
            //                 //axios.defaults.headers.common['Authorization'] = token
            //                 //commit('auth_success', token, user)
            //             resolve(resp)
            //         })
            //         .catch(err => {
            //             commit('auth_error', err);
            //             //localStorage.removeItem('token');
            //             reject(err);
            //         });
            // });
            },
        
    },
    mutations: {

        view(state) {
            console.log(state);
            return state;
        },

        auth_request(state) {
            console.log('loading')
            state.status = 'loading';
        },
        auth_success(state,// token, 
            user) {
            console.log('success');
            state.status = 'success';
            console.log('status : ' + state.status);
            // state.token = token
            state.user = user;
        },
        auth_error(state) {
            state.status = 'error';
        },
    }
};