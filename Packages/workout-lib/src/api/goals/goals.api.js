import client from './client';

export const goalsApi = {
    get: async (userId) => client.get(`/goals/${userId}`),
    update: async (userId, goalsData) => client.post(`/goals/${userId}`, goalsData),
    create: async (userId, goalsData) => client.put(`/goals/${userId}`, goalsData)
}