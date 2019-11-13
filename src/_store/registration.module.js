import { userService } from '../_services';
import { router } from '../_helpers';

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
            console.log('reg');
            commit('fdgfd');
        }
    },
    mutations: {
        fdgfd(state){
            console.log('reg');
        }
    }


}