import React, { useState } from "react";
import "../styles/Login.css";
import axios from "axios";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const handleSubmit = async (e: React.FormEvent) => {  // async로 선언
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/admin/login", {
                email: email,
                password: password,
                rememberMe: rememberMe,
            });

            // JWT 토큰 저장
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("adminId", response.data.adminId);
            alert("로그인 성공!");
            window.location.href = "/";
        } catch (error) {
            console.log({ email, password })
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
                    <div className="form-group">
                        <label htmlFor="email">이메일</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@example.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">비밀번호</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div className="form-options">
                        <div className="remember-me">
                            <input
                                type="checkbox"
                                id="remember"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label htmlFor="remember">로그인 상태 유지</label>
                        </div>
                        {/*<a href="/forgot-password" className="forgot-password">*/}
                        {/*    비밀번호 찾기*/}
                        {/*</a>*/}
                    </div>

                    <button type="submit" className="login-button">
                        로그인
                    </button>
                </form>

                {/*<div className="login-footer">*/}
                {/*    <p>계정이 없으신가요? <a href="/register">관리자 계정 요청</a></p>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default Login;