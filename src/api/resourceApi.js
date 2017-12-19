import axios from 'axios';
import store from '~/store';

axios.interceptors.request.use(function(config) { // 这里的config包含每次请求的内容
    if (store.getters.token) {
        config.headers['Admin-Token'] = store.getters.token;
    }

    return config;
}, function(err) {
    return Promise.reject(err);
});

export const commonGetQuery = (modelName, params) => { return axios.get('/api/' + modelName, {params}).then(res => res.data); };
export const commonDelete = (modelName, id) => { return axios.delete('/api/' + modelName + '/' + id).then(res => res.data); };
export const commonCreate = (modelName, params) => { return axios.post('/api/' + modelName, params).then(res => res.data); };
export const commonUpdate = (modelName, params) => { return axios.put('/api/' + modelName, params).then(res => res.data); };
