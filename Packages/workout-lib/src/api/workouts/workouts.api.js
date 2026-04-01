import client from './client';

export const workoutsApi = {
    get: async (userId) => client.get(`/workouts/${userId}`),
    update: async (userId, workoutData) => client.post(`/workouts/${userId}`, workoutData),
    create: async (userId, workoutData) => client.put(`/workouts/${userId}`, workoutData)
}