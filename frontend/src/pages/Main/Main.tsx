import React from "react";
import { motion } from "framer-motion";
import "../../styles/Main.css";
import yuncheongImg from "../../assets/yuncheong-black.png";
import bgImage from "../../assets/background1.webp";

const Main = () => {
    return (
        <div className="main-container">
            {/* 배경 애니메이션 */}
            <motion.div
                className="background"
                style={{backgroundImage: `url(${bgImage})`}} // 배경 이미지 설정
                initial={{scale: 1.1, opacity: 0.5}}  // 처음에는 확대된 상태
                whileInView={{scale: 1, opacity: 0.7}} // 화면에 보일 때 최종 상태로 변경
                transition={{duration: 3}} // 2초 동안 실행
            ></motion.div>


            {/* 메인 컨텐츠 */}
            <div className="content">
                <motion.h1
                    className="welcome-text"
                    initial={{x: -100, opacity: 0}}
                    animate={{x: 0, opacity: 1}}
                    transition={{duration: 1}}
                >
                    <p>어서오세요, 윤청의 작업실입니다! 🎨✨</p>
                </motion.h1>

                <motion.img
                    className="main-image"
                    src={yuncheongImg}
                    alt="메인 이미지"
                    initial={{scale: 0.8, opacity: 0}}
                    animate={{scale: 1, opacity: 1}}
                    transition={{duration: 1.2}}
                />
            </div>
        </div>
    );
};

export default Main;
