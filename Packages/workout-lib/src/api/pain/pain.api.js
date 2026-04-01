import client from './client';

export const painApi = {
    get: async (userId) => client.get(`/pain/${userId}`),
    update: async (userId, painData) => client.post(`/pain/${userId}`, painData),
    create: async (userId, painData) => client.put(`/pain/${userId}`, painData)
};