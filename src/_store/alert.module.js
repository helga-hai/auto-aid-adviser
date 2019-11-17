export const alert = {
    namespaced: true,
    state: {
        type: null,
        message: null
    },
    actions: {
        success({ commit }, message) {
            commit('success', message);
        },
        error({ commit }, message) {
            commit('error', message);
        },
        clear({ commit }, message) {
            commit('success', message);
        }
    },
    mutations: {
        success(state, message) {
            state.type = 'alert-success';
            state.message = message;
        },
        error(state, [message, errorStatus]) {
            console.log('ERROR alert module')
            state.type = 'alert-danger';
            if (errorStatus == 404) {
                state.message = 'Дана поштова адреса не зареєстрована на нашому сервісі. Перейдіть, будь ласка, на сторінку реєстрації нових користувачів';
            } else if (errorStatus == 403) {
                state.message = 'Forbidden / Недостатньо захищений пароль';
            } else if (errorStatus == 401) {
                state.message = 'Unauthorized';
            }
        },
        clear(state) {
            state.type = null;
            state.message = null;
        }
    }
}