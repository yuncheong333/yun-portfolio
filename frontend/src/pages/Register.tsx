import React, { useState } from "react";
import "../styles/Login.css";
import axios from "axios";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = { email, password };

        try {
            const response = await axios.post("http://localhost:8080/api/admin/register", data);
            console.log(response.data);
            alert("회원가입 완료!");
        } catch (error) {
            console.error("회원가입 실패:", error);
            alert("회원가입 실패!");
        }
    };

    return (
        <div>
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">이메일</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
};

export default Register;
