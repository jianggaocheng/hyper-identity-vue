import axios from 'axios';

export const requestLogin = params => { return axios.post(`/api/account/login`, params).then(res => res.data); };
export const requestRegister = params => { return axios.post(`/api/account/register`, params).then(res => res.data); };