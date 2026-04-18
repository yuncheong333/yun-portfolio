import axios from 'axios';

// 요청을 보낼 기본 axios 인스턴스
const api = axios.create({
    baseURL: `/api`,
});

// 리프레시 요청을 위한 별도의 axios 인스턴스
const refreshInstance = axios.create({
    baseURL: `/api`,
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await refreshInstance.post('/admin/refresh', {
                    refreshToken,
                });

                const newAccessToken = response.data.accessToken;
                localStorage.setItem('accessToken', newAccessToken);

                // 새로운 access token으로 재요청
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return api(originalRequest); // 실패했던 요청 재시도
            } catch (refreshError) {
                console.error('리프레시 실패', refreshError);
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
