import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    async resetPassword(data: { email: string; otp: string; newPassword: string }) {
        const response = await api.post('/auth/reset-password', data);
        return response.data;
    },
};

// Skill Course API
export const skillAPI = {
    async getAll() {
        const response = await api.get('/skills');
        return response.data;
    },

    async create(data: FormData) {
        const response = await api.post('/skills', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    async update(id: string, data: FormData) {
        const response = await api.put(`/skills/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    async delete(id: string) {
        const response = await api.delete(`/skills/${id}`);
        return response.data;
    },
};

export default api;

