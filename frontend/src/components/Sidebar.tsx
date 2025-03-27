import React from "react";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../components/SidebarContext";
import "../styles/Sidebar.css";

const Sidebar: React.FC = () => {
    const { isSidebarOpen, toggleSidebar } = useSidebar();
    const navigate = useNavigate();

    const handleAboutClick = () => {
        toggleSidebar(); // 사이드바 닫기
        setTimeout(() => {
            navigate("/about"); // About 페이지로 이동
        }, 300); // 애니메이션 시간 동안 대기 후 이동
    };

    return (
        <nav className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
            <ul>
                <li onClick={() => navigate("/")}>🏠 Home</li>
                <li onClick={handleAboutClick}>📌 About</li>
                <li onClick={() => navigate("/posts")}>📑 Posts</li>
                <li onClick={() => navigate("/contact")}>📬 Contact</li>
            </ul>
        </nav>
    );
};

export default Sidebar;
