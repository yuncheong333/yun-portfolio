import axios from 'axios';

// 요청을 보낼 기본 axios 인스턴스
const api = axios.create({
    baseURL: '/api',
});

// 리프레시 요청을 위한 별도의 axios 인스턴스
const refreshInstance = axios.create({
    baseURL: '/api',
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

        // 커스텀 440 에러 또는 401 에러 처리
        if ((error.response?.status === 440 || error.response?.status === 401)
            && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await refreshInstance.post('/admin/refresh', {
                    refreshToken
                });

                // 새 토큰 저장
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);

                // Axios 기본 헤더 업데이트
                api.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;

                // 원래 요청의 헤더 업데이트
                originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                // 리프레시 실패 시 로그아웃 처리
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
