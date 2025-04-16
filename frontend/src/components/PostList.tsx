import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom"; // Link 컴포넌트 임포트
import api from "../api/auth"; // api 경로는 자신의 경로에 맞게 수정
import '../styles/Base.css'

type Post = {
    id: number;
    title: string;
    content: string;
    createdAt: string;
};

const PostList = () => {
    const [posts, setPosts] = useState<Post[]>([]); // 글 목록을 상태로 관리
    const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 관리
    const [error, setError] = useState<string | null>(null); // 에러 상태 관리

    // 컴포넌트가 마운트되면 글 목록을 API로 가져옴
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get("/posts"); // 게시글 목록을 가져오는 API 호출
                setPosts(response.data); // 데이터 설정
            } catch (err) {
                setError("게시글을 불러오는 데 실패했습니다."); // 에러 처리
            } finally {
                setLoading(false); // 로딩 끝
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="base-container">
            <div className="post-list">
                <h2>게시글 목록</h2>
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            {/* 제목 클릭 시 상세 페이지로 이동 */}
                            <Link to={`/posts/${post.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                                <h3>{post.title}</h3>
                            </Link>

                            <p>{new Date(post.createdAt).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PostList;
