import React from "react";
import "../styles/Posts.css";

import PostList from "../components/PostList";


const Posts: React.FC = () => {
    return (
        <div className="post-container">
        <PostList></PostList>
        </div>
    );
};

export default Posts;

