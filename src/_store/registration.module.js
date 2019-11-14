import { userService } from '../_services';
import { router } from '../_helpers';
import axios from 'axios';

export const registration = {
    namespaced: true,
    state: {
        name: null,
        email: null,
        password: null,
        role: null,
    },
    actions: {
        saveStateData({ commit }, payload){
                console.log(payload);
                commit('view');
            },
            
        register({commit}, user){
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({url: 'http://localhost:8080/register', data: user, method: 'POST' })
                .then(resp => {
                const token = resp.data.token
                const user = resp.data.user
                localStorage.setItem('token', token)
                axios.defaults.headers.common['Authorization'] = token
                commit('auth_success', token, user)
                resolve(resp)
                })
                .catch(err => {
                commit('auth_error', err);
                localStorage.removeItem('token');
                reject(err);
                });
            });
            },
        },
    mutations: {

        view(state){
            console.log(state);
            return state;
        },

        auth_request(state){
            state.status = 'loading';
        },
        auth_success(state, token, user){
            state.status = 'success';
            state.token = token
            state.user = user
        },
        auth_error(state){
            state.status = 'error';
        },
    }
};