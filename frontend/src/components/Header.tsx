import React from "react";
import {useSidebar} from "../components/SidebarContext";
import "../styles/Header.css";
import yuncheongLogo from "../assets/yuncheong-white.png";
import {useNavigate} from "react-router-dom";



const Header: React.FC = () => {
    const { isSidebarOpen, toggleSidebar } = useSidebar();
    const navigate = useNavigate();
    const handleLogoClick = () => {
        if (isSidebarOpen) {
            toggleSidebar(); // 사이드바가 열려 있으면 닫기
        }
        navigate("/"); // 메인 페이지로 이동
    };

    // 로그인 버튼 클릭 시 사이드바가 열려 있을 경우에만 닫기
    const handleLoginClick = () => {
        if (isSidebarOpen) {
            toggleSidebar(); // 사이드바가 열려 있으면 닫기
        }
        navigate("/login"); // 로그인 페이지로 이동
    };
    return (
        <header className="header">
            {/* 사이드바 버튼 */}
            <div className="sidebar-toggle-container">
                <button className="sidebar-toggle" onClick={toggleSidebar}>
                    ☰
                </button>
            </div>
            {/* 로고 */}
            <div className="main-logo">
                <img
                    src={yuncheongLogo}
                    alt="Yuncheong Logo"
                    className="logo"
                    onClick={handleLogoClick}
                />
            </div>
            <div className="loginpage-button-container">
                <button className="loginpage-button" onClick={handleLoginClick}>
                    <i className="bi bi-box-arrow-in-left"></i>
                </button>
            </div>
        </header>
    );
};

export default Header;
