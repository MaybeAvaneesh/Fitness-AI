import client from './client';

export const goalsApi = {
    get: async (userId) => client.get(`/goals/${userId}`),
    create: async (userId, goalsData) => client.put(`/goals/${userId}`, goalsData)
}