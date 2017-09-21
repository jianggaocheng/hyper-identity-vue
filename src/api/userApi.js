import axios from 'axios';

export const requestLogin = params => { return axios.post(`/api/user/login`, params).then(res => res.data); };
export const requestRegister = params => { return axios.post(`/api/user/register`, params).then(res => res.data); };
export const refreshToken = params => { return axios.post(`/api/user/refreshToken`, params).then(res => res.data); };
