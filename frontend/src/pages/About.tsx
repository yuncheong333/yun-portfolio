import React from "react";
import { motion } from "framer-motion";
import "../styles/About.css"
import yuncheongImg from "../assets/yuncheong-black.png";
import bgImage from "../assets/background.jpg";
import PortfolioContainer from "../components/PortfolioContainer";

const About = () => {
    return (
        <div className="about-container">
            {/* 배경 애니메이션 */}
            <div className="about-content">
                <PortfolioContainer>
                <motion.h1
                    className="name-intro"
                    initial={{x: -100, opacity: 0}}
                    animate={{x: 0, opacity: 1}}
                    transition={{duration: 1}}
                >
                    <p>윤 청 Cheong Yun</p>
                    <p>TEL. 010-2306-9408 | E-mail. yuncheong3@gmail.com | Address. 45, Nambusunhwan-ro 161ga-gil, Gwanak-gu, Seoul</p>
                    <p> 자기소개</p>
                    <p> 뭐시기</p>


                </motion.h1>

                    <motion.h1
                        initial={{scale: 0.8, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        transition={{duration: 1.2}}
                    >
                        <p>
                            SKILLS
                        </p>
                        <img
                            src="https://img.shields.io/badge/java 8,11,17-007396?style=for-the-badge&logo=java&logoColor=white"/>

                        <img
                            src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
                        <img
                            src="https://img.shields.io/badge/jquery-0769AD?style=for-the-badge&logo=jquery&logoColor=white"/>
                        <img
                            src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"/>
                        <img
                            src="https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white"/>
                        <img
                            src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"/>
                        <img
                            src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
                        <img
                            src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"/>
                        <img
                            src="https://img.shields.io/badge/gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white"/>
                        <img
                            src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
                        <img
                            src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
                        <img
                            src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>
                        <img
                            src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"/>
                    </motion.h1>
                    <motion.img
                        className="main-image"
                        src={yuncheongImg}
                    alt="메인 이미지"

                    initial={{scale: 0.8, opacity: 0}}
                    animate={{scale: 1, opacity: 1}}
                    transition={{duration: 1.2}}
                />
                </PortfolioContainer>
            </div>


        </div>
    );
};

export default About;
