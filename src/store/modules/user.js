import _ from 'lodash';
import Cookies from "js-cookie";

const user = {
    state: {
        user: '',
        token: '',
        menus: '',
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_USER: (state, user) => {
            state.user = _.cloneDeep(user);
        },
        SET_MENUS: (state, menus) => {
            state.menus = _.cloneDeep(menus);
        },
        LOGOUT: state => {
            state.user = '';
            state.token = '';
            state.menus = '',

            Cookies.remove('email');
            Cookies.remove('password');
        }
    },
}

export default user;