import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import getters from './getters';
import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user,
    },
    getters,
    // store vuex with sessionStorage
    plugins: [
        createPersistedState({
        storage: {
            getItem: key => sessionStorage.getItem(key),
            setItem: (key, value) => sessionStorage.setItem(key, value),
            removeItem: key => sessionStorage.removeItem(key)
        }
        })
    ]
});

export default store;