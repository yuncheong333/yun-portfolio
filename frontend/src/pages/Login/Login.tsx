import React, { useState } from "react";
import "../../styles/Login.css";
import api from "../../api/auth";  // 수정된 api 인스턴스를 가져옵니다
import InputField from "../Login/components/InputField";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate(); // React Router v6 사용 시 페이지 이동 처리

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post("/admin/login", {
                email,
                password,
                rememberMe,
            });

            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken); // refreshToken 저장
            localStorage.setItem("adminId", response.data.adminId);

            alert("로그인 성공!");
            navigate("/"); // 로그인 후 홈 페이지로 이동
        } catch (error) {
            alert("로그인 실패! 아이디 또는 비밀번호를 확인하세요.");
            console.error("로그인 오류:", error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1>관리자 로그인</h1>
                    <p>시스템 관리자 전용 페이지입니다</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <InputField
                        id="email"
                        label="이메일"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@example.com"
                    />

                    <InputField
                        id="password"
                        label="비밀번호"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                    />

                    <div className="form-options">
                        <label className="remember-me">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            로그인 상태 유지
                        </label>
                    </div>

                    <button type="submit" className="login-button">
                        로그인
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
