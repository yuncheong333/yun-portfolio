import React from "react";
import "../styles/Posts.css";
import PostEditor from "../components/PostEditor";

const Posts: React.FC = () => {
    return (
        <div className="post-container">
            <p>관리자 로그인</p>
            <p>관리자 로그인</p>
            <p>관리자 로그인</p>
            <p>관리자 로그인</p>
            <p>관리자 로그인</p>

            <PostEditor></PostEditor>
        </div>
    );
};

export default Posts;

