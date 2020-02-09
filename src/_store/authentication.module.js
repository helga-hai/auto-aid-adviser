import { userService } from '../_services';
import { router } from '../_helpers';

// const user = JSON.parse(localStorage.getItem('user'));

const user = localStorage.getItem('token');
// console.log('user', user)
const initialState = user ? { status: { loggedIn: true }, user } : { status: {}, user: null };

export const authentication = {
    namespaced: true,
    state: {
        initialState,

        password: null,
        email: null, // test
        role: null, // test


    },
    actions: {
        login({ dispatch, commit }, { email, password }) {
            console.log('store action login: email, password', email, password);
            commit('loginRequest', { email, password });

            userService.login(email, password)
                .then(user => {
                        console.log(user)
                        if(user === "Unauthorized"){
                            console.log("AuthModule "+"Unauthorized");
                        }
                        console.log(user);
                        commit('loginSuccess', user);
                        commit('setVal', user); /////////////test
                        


                        
                        if (user.role === 'ROLE_USER') {
                            console.log('userService.login ROLE_USER');
                            router.push('/user');
                        } else if (user.role === 'ROLE_BUSINESS') {
                            console.log('userService.login ROLE_BUSINESS');
                            router.push('/cabinet');
                        } else {
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
            console.log('store mutations loginRequest: state, user', state, user);
            state.status = { loggingIn: true };
            // state.user = user;
            state.email = user.email;
            state.password = user.password;
            console.log('store mutations loginRequest: state, user', state.email);
            console.log('store mutations loginRequest: state, user', state.password);
            console.log('---------------------hhhhhhhhhhh--------------');
        },
        loginSuccess(state, user) {
            state.status = { loggedIn: true };
            state.user = user;
        },


        ///test
        setVal(state, obj) {
            console.log('setVal work')
            return state.email = obj.email, state.role = obj.role;
            // state.role = obj.role;
        },
        ////


        loginFailure(state) {
            state.status = {};
            state.user = null;
        },
        logout(state) {
            state.status = {};
            state.user = null;
        }
    }
};