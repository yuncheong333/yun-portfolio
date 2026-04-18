import React, { useState } from "react";
import axios from "axios";

interface Props {
    label: string;
    value: string;
    setValue: (value: string) => void;
    checkUrl: string;
    onCheckComplete?: (isAvailable: boolean) => void;
    placeholder?: string;
}

const FieldWithCheck: React.FC<Props> = ({
                                             label,
                                             value,
                                             setValue,
                                             checkUrl,
                                             onCheckComplete,
                                             placeholder,
                                         }) => {
    const [message, setMessage] = useState<string | null>(null);

    const handleCheck = async () => {
        try {
            const response = await axios.get(`${checkUrl}?value=${value}`);
            if (response.data.available) {
                setMessage("사용 가능한 " + label + "입니다.");
                onCheckComplete?.(true);
            } else {
                setMessage("이미 사용 중인 " + label + "입니다.");
                onCheckComplete?.(false);
            }
        } catch (error) {
            setMessage("중복 확인에 실패했습니다.");
            onCheckComplete?.(false);
            console.error("중복 확인 오류:", error);
        }
    };

    return (
        <div className="field-with-check">
            <label>{label}</label>
            <div className="input-with-button">
                <input
                    type="text"
                    value={value}
                    placeholder={placeholder || `${label} 입력`}
                    onChange={(e) => {
                        setValue(e.target.value);
                        setMessage(null); // 입력값이 바뀌면 메시지 초기화
                    }}
                />
                <button type="button" onClick={handleCheck}>
                    중복 확인
                </button>
            </div>
            {message && <p className="check-message">{message}</p>}
        </div>
    );
};

export default FieldWithCheck;
