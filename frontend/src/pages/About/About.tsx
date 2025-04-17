import React from "react";
import { motion } from "framer-motion";
import "../../styles/About.css";
import yuncheongImg from "../../assets/yuncheong-black.png";
import PortfolioContainer from "../../components/PortfolioContainer";
import { projects, skillBadges } from "../About/components/AboutContent";

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
                        <p>TEL. 010-2306-9408 | E-mail. yuncheong3@gmail.com | Address. 45, Nambusunhwan-ro 161ga-gil, Gwanak-gu, Seoul</p>
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

                        {projects.map((project, index) => (
                            <motion.div key={index} variants={fadeInVariants}>
                                <h3>{project.title}</h3>
                                <p>{project.tasks}</p>
                                <p>{project.skills}</p>
                                <p>{project.outcomes}</p>
                            </motion.div>
                        ))}

                        <motion.div variants={fadeInVariants}>
                            <h2>기술 스택</h2>
                            <div className="skill-badges">
                                {skillBadges.map(([tech, color]) => (
                                    <img
                                        key={tech}
                                        src={`https://img.shields.io/badge/${tech}-${color}?style=for-the-badge&logo=${tech}&logoColor=white`}
                                        alt={tech}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

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
