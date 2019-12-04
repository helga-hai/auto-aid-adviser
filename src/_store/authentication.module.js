import { userService } from '../_services';
import { router } from '../_helpers';

// const user = JSON.parse(localStorage.getItem('user'));

const user = localStorage.getItem('token');
// console.log('user', user)
const initialState = user ? { status: { loggedIn: true }, user } : { status: {}, user: null };

export const authentication = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ dispatch, commit }, { email, password }) {
            console.log('store action login: email, password', email, password);
            commit('loginRequest', { email, password});

            userService.login(email, password)
                .then(
                    
                    user => {
                        console.log()
                        commit('loginSuccess', user);
                        if(user.role==='ROLE_USER'){
                            router.push('user');
                        }else if(user.role==='ROLE_BUSINESS'){
                        router.push('business');
                        }else{
                            console.log(user.role);
                        router.push('/');
                        }
                    },
                    ([error, errorStatus]) => {
                        console.log('authentication error', [error, errorStatus])
                        commit('loginFailure', error);
                        dispatch('alert/error', [error, errorStatus], { root: true });
                    }
                );
        },
        logout({ commit }) {
            userService.logout();
            commit('logout');
        }
    },
    mutations: {
        loginRequest(state, user) {
            // console.log('store mutations loginRequest: state, user', state, user)
            state.status = { loggingIn: true };
            state.user = user;
        },
        loginSuccess(state, user) {
            state.status = { loggedIn: true };
            state.user = user;
        },
        loginFailure(state) {
            state.status = {};
            state.user = null;
        },
        logout(state) {
            state.status = {};
            state.user = null;
        }
    }
}