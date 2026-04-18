import React, { useState } from "react";
import "../../styles/Login.css";
import axios from "axios";

import { useNavigate } from "react-router-dom"; // React Router의 useNavigate 훅

import InputField from "../Login/components/InputField";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [isUser, setIsUser] = useState(true);

    // useNavigate 훅 사용
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const requestData = isUser
            ? { username, password, rememberMe }
            : { email, password, rememberMe };
        const endpoint = isUser ? `/api/user/login` : `/api/admin/login`; // URL 분기
        try {
            const response = await axios.post(
                `${endpoint}`,
                requestData,
                { withCredentials: true }
            );

            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("adminId", response.data.adminId); // 일반 유저는 따로 처리 가능
            alert("로그인 성공!");
            window.location.href = "/";
        } catch (error) {
            alert("로그인 실패! 아이디 또는 비밀번호를 확인하세요.");
            console.error("로그인 오류:", error);
        }
    };

    const toggleMode = () => {
        setIsUser((prev) => !prev);
    };

    const goToRegister = () => {
        navigate("/register"); // 회원가입 페이지로 이동
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1>{isUser ? "일반 로그인" : "관리자 로그인"}</h1>
                    <p>{isUser ? "댓글 입력 시 로그인이 필요합니다." : "관리자 전용"}</p>
                </div>
                <div className="login-switch">
                    <label className="switch">
                        <input type="checkbox" checked={isUser} onChange={toggleMode} />
                        <span className="slider"></span>
                    </label>
                </div>
                <form onSubmit={handleSubmit} className="login-form">
                    {isUser ? (
                        <InputField
                            id="username"
                            label="아이디"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="user123"
                        />
                    ) : (
                        <InputField
                            id="email"
                            label="이메일"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@example.com"
                        />
                    )}

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
                        {isUser ? <div className="register-link">


                                <button onClick={goToRegister}>회원가입</button>

                        </div> : ''}
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
