import React, {useState} from "react";
import "../../styles/Login.css";
import axios from "axios";
import InputField from "./components/InputField"; // InputField 임포트
import FieldWithCheck from "./components/FieldWithCheck";
const Register = () => {
    const [username, setUsername] = useState(""); // 아이디 상태
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState(""); // 비밀번호 상태// 닉네임 상태
    const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null);
    const [isNicknameAvailable, setIsNicknameAvailable] = useState<boolean | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = {username,nickname, password}; // 서버로 보내는 데이터

        try {
            const response = await axios.post(`/api/user/register`, data);
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
                {/* InputField 컴포넌트 사용 */}
                <FieldWithCheck
                    label="아이디"
                    value={username}
                    setValue={setUsername}
                    checkUrl="/api/user/check-id"
                    onCheckComplete={setIsUsernameAvailable}
                />

                <FieldWithCheck
                    label="닉네임"
                    value={nickname}
                    setValue={setNickname}
                    checkUrl="/api/user/check-nickname"
                    onCheckComplete={setIsNicknameAvailable}
                />

                <InputField
                    id="password"
                    label="비밀번호"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=""
                />
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
};

export default Register;
