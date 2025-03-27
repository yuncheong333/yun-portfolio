import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8080", // 백엔드 주소
    withCredentials: true // 쿠키 공유 설정 (필요한 경우)
});

export default api;