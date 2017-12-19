import axios from 'axios';

export const requestLogin = params => { return axios.post('/api/login', params).then(res => res.data); };
export const verifyToken = params => { return axios.post('/api/verifyToken', params).then(res => res.data); };
