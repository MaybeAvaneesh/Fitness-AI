const BASE_URL = process.env.REACT_APP_AUTH_SERVICE_URL || 'http://localhost:5000';
const axios = require('axios');
const client  = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

client.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

client.interceptors.response.use(response => {
    return response;
} , error => {
    if (error.response && error.response.status === 401) {
        localStorage.removeItem('accessToken');
    }
    return Promise.reject(error);
});

export default client;