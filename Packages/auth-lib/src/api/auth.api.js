import client from '../client';

export const authApi={
    signup: async (userData) => client.post('/user/signup', userData),
    login: async (credentials) => {
        const response = await client.post('/user/login', credentials);
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        return response;
    },
    logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    },
    fetchUserProfile: async (userId) => client.post(`/user/profile/${userId}`, null),
    deleteUser: async (userId) => client.delete(`/user/delete/${userId}`)

}