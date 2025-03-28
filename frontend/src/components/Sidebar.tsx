import React from "react";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../components/SidebarContext";
import "../styles/Sidebar.css";

const Sidebar: React.FC = () => {
    const { isSidebarOpen, toggleSidebar } = useSidebar();
    const navigate = useNavigate();

    const handleLinkClick = (path: string) => {
        toggleSidebar(); // 사이드바 닫기
        setTimeout(() => {
            navigate(path); // About 페이지로 이동
        }, 250); // 애니메이션 시간 동안 대기 후 이동
    };

    return (
        <nav className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
            <ul>
                <li onClick={() => handleLinkClick("/")}>🏠 Home</li>
                <li onClick={() => handleLinkClick("/about")}>📌 About</li>
                <li onClick={() => handleLinkClick("/posts")}>📑 Posts</li>
                <li onClick={() => handleLinkClick("/contact")}>📬 Contact</li>
            </ul>
        </nav>
    );
};

export default Sidebar;
