import Vue from 'vue';
import Vuex from 'vuex';

import { alert } from './alert.module';
import { authentication } from './authentication.module';
import { users } from './users.module';
import { selfLocation } from './selfLocation.module';
import { maploader } from './maploader.module';
import { registration } from './registration.module';
import { data } from './data.module';
import { userdataservice } from './userdataservice.module';
import { create } from './create.module';
import { templateB } from './templateB.module';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        alert,
        authentication,
        users,
        selfLocation,
        maploader,
        registration,
        data,
        userdataservice,
        create,
        templateB
    }
});