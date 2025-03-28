import React from "react";
import { motion } from "framer-motion";
import "../styles/About.css";
import yuncheongImg from "../assets/yuncheong-black.png";
import PortfolioContainer from "../components/PortfolioContainer";

const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
};

const About = () => {
    return (
        <div className="about-container">
            <div className="about-content">
                <PortfolioContainer>
                    <motion.h1
                        className="name-intro"
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <p>윤 청 Cheong Yun</p>
                        <p>TEL. 010-2306-9408 | E-mail. yuncheong3@gmail.com | Address. 45, Nambusunhwan-ro 161ga-gil,
                            Gwanak-gu, Seoul</p>
                        <p>자기소개</p>
                        <p>뭐시기</p>
                    </motion.h1>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
                        viewport={{ once: true }}
                    >
                        <motion.h2 variants={fadeInVariants}>프로젝트 경험</motion.h2>

                        <motion.div variants={fadeInVariants}>
                            <h3>O2O 중계 서비스</h3>
                            <p>수행업무: 프로필 정보 CRUD 기능 구현, HTML 상호작용을 통한 이미지 파일 처리</p>
                            <p>Skills: Spring, JSP, MyBatis, CSS, JavaScript</p>
                            <p>주요성과: 사용자 프로필 관리 기능 개선으로 UX 향상</p>
                            <p>문제점 및 해결방안: 프로필 배너의 드롭박스를 통해 UI 개선, 이미지 파일 동시 처리를 위한 모달 및 중복 파일 처리 알고리즘 사용</p>
                        </motion.div>

                        <motion.div variants={fadeInVariants}>
                            <h3>사내관리 사이트</h3>
                            <p>수행업무: 데이터베이스 설계, JPA를 활용한 상품 CRUD 기능 구현</p>
                            <p>Skills: Spring Boot, JPA, Thymeleaf, JavaScript</p>
                            <p>주요성과: 사내 거래 프로세스를 디지털화하여 관리자의 처리 능력 향상</p>
                        </motion.div>

                        <motion.div variants={fadeInVariants}>
                            <h3>포트폴리오 사이트</h3>
                            <p>수행업무: 데이터베이스 설계, 로그인 및 보안 기능 구현, 프론트엔드/백엔드 데이터 분리 및 CRUD 기능 개발, UI/UX 개선</p>
                            <p>Skills: Spring Boot, React, TypeScript, JPA, CSS</p>
                            <p>주요성과: 보안 및 로그인 기능 강화를 통해 보안 취약점 보완</p>
                        </motion.div>
                    </motion.div>

                    <motion.h1
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                    >
                        <p>SKILLS</p>
                        {/* SKILL BADGES */}
                        {[
                            ["java", "007396"],
                            ["html5", "E34F26"],
                            ["jquery", "0769AD"],
                            ["mysql", "4479A1"],
                            ["spring", "6DB33F"],
                            ["springboot", "6DB33F"],
                            ["react", "61DAFB"],
                            ["github", "181717"],
                            ["gradle", "02303A"],
                            ["javascript", "F7DF1E"],
                            ["typescript", "3178C6"],
                            ["css", "1572B6"],
                            ["axios", "5A29E4"],
                        ].map(([tech, color]) => (
                            <img
                                key={tech}
                                src={`https://img.shields.io/badge/${tech}-${color}?style=for-the-badge&logo=${tech}&logoColor=white`}
                                alt={tech}
                            />
                        ))}
                    </motion.h1>

                    <motion.img
                        className="main-image"
                        src={yuncheongImg}
                        alt="메인 이미지"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                    />
                </PortfolioContainer>
            </div>
        </div>
    );
};

export default About;
