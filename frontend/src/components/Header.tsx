import React from "react";
import { useSidebar } from "../components/SidebarContext";
import "../styles/Header.css";
import yuncheongLogo from "../assets/yuncheong-white.png";

const Header: React.FC = () => {
    const { toggleSidebar } = useSidebar();

    return (
        <header className="header">
            {/* 사이드바 버튼 */}
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                ☰
            </button>
            {/* 로고 */}
            <div className="main-logo">
            <img
                src={yuncheongLogo}
                alt="Yuncheong Logo"
                className="logo"
                onClick={() => (window.location.href = "/")}
            />
            </div>
        </header>
    );
};

export default Header;
