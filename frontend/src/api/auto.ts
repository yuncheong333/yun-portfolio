// src/api/auth.ts (새로 생성)
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

// 요청 인터셉터 (토큰 주입)
api.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// 응답 인터셉터 (에러 처리)
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('accessToken');
            window.location.href = '/login?expired=true';
        }
        return Promise.reject(error);
    }
);

export default api;