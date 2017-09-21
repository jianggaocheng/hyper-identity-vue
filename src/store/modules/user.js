import { requestLogin } from '~/api/userApi';
import Cookies from 'js-cookie';
import _ from 'lodash';

const user = {
    state: {
        user: '',
        token: Cookies.get('User-Token'),
        roles: [],
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            Cookies.set('User-Token', token);
            state.token = token;
        },
        SET_USER: (state, user) => {
            state.user = _.cloneDeep(user);
        },
        LOGOUT: state => {
            state.user = '';
            state.token = '';
            Cookies.remove('User-Token');
        }
    },
}

export default user;