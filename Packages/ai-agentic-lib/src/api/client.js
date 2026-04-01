const BASE_URL = process.env.REACT_APP_AI_AGENTIC_SERVICE_URL || 'http://localhost:3003';

const client  = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

client.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
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
        localStorage.removeItem('authToken');
    }
    return Promise.reject(error);
});

export default client;