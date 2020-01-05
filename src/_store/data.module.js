import { userService } from '../_services';
import API from "../_services/ApiService";

export const data = {
    namespaced: true,
    state: {
        // name: null,
        business_types: null,
        service_types: null,
        services: null,
        data: null
    },
    actions: {
        getData({ commit }, payload) {
            console.log('payload', payload);
            console.log('uri', userService.config.apiUrl + payload);
            let uri = userService.config.apiUrl + payload;
            API.fetch(uri)
                .then(resp => {
                    commit({
                        type: setData,
                        list: resp
                    })
                })
                .catch(err => console.log("fetch data failed", err));
        },
    },
    mutatuins: {
        setData(state, payload) {
            console.log(JSON.parse(payload))
                //state.data = payload.list;
                //state.events = payload.list;
        },
    }
}