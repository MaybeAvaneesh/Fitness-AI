import client from './client';

export const healthApi = {
    get: async (userId) => client.get(`/health/${userId}`),
    update: async (userId, healthData) => client.post(`/health/${userId}`, healthData),
    create: async (userId, healthData) => client.put(`/health/${userId}`, healthData)
}