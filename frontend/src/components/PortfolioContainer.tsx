import React from "react";
import "../styles/PortfolioContainer.css";

interface PortfolioContainerProps {
    children: React.ReactNode; // 컨테이너 안에 들어갈 내용을 받음
}

const PortfolioContainer: React.FC<PortfolioContainerProps> = ({ children }) => {
    return <section className="portfolio-contents">{children}</section>;
};

export default PortfolioContainer;
