import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../api/auth";
import '../../styles/Base.css';
import '../../styles/Postlist.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { useSearchParams } from "react-router-dom";

type PostSummary = {
    id: number;
    title: string;
    createdAt: string;
};

type PostDetail = {
    id: number;
    title: string;
    content: string;
    createdAt: string;
};


const PostList = () => {
    const { id } = useParams();
    const [posts, setPosts] = useState<PostSummary[]>([]);
    const [selectedPost, setSelectedPost] = useState<PostDetail | null>(null);
    const [loadingMessage, setLoadingMessage] = useState<string>("서버를 깨우는 중입니다...⏳");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const postIdFromQuery = searchParams.get("id");

    const [currentPage, setCurrentPage] = useState<number>(1);
    const postsPerPage: number = 10;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages: number = Math.ceil(posts.length / postsPerPage);

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const renderPagination = (): React.ReactNode => {
        const pages: React.ReactNode[] = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    className={`page-btn ${i === currentPage ? "active" : ""}`}
                    onClick={() => handlePageClick(i)}
                >
                    {i}
                </button>
            );
        }
        return <div className="pagination-container">{pages}</div>;
    };

    useEffect(() => {
        const fetchPostSummaries = async () => {
            try {
                setLoadingMessage("서버를 깨우는 중입니다...⏳");

                const response = await api.get("/posts");
                setPosts(response.data);

                if (postIdFromQuery) {
                    const detailRes = await api.get(`/posts/${postIdFromQuery}`);
                    setSelectedPost(detailRes.data);
                }

                setLoadingMessage(""); // 다 끝났으면 로딩 메시지 없애기
            } catch (err) {
                setError("게시글 목록을 불러오는 데 실패했습니다.");
                setLoadingMessage("");
            }
        };

        fetchPostSummaries();
    }, [postIdFromQuery]);

    const handlePostClick = async (postId: number) => {
        const response = await api.get(`/posts/${postId}`);
        setSelectedPost(response.data);
    };

    const handleDelete = async () => {
        if (!selectedPost) return;
        try {
            await api.delete(`/posts/${selectedPost.id}`);
            setPosts(prev => prev.filter(post => post.id !== selectedPost.id));
            setSelectedPost(null);
        } catch (err) {
            setError("게시글 삭제 실패");
        }
    };

    const handleEdit = () => {
        if (!selectedPost) return;
        navigate(`/posts/${selectedPost.id}/edit`);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}.${month}.${day}`;
    };

    useEffect(() => {
        if (selectedPost) {
            hljs.highlightAll();
        }
    }, [selectedPost]);

    const isAuthenticated = localStorage.getItem("accessToken") !== null;

    // ⭐⭐ 여기 수정
    if (loadingMessage) return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>{loadingMessage}</h2>
            <p>잠시만 기다려주세요!</p>
        </div>
    );

    if (error) return <p>{error}</p>;


    return (
        <div className="post-layout">
            <div className={`post-list-panel ${selectedPost ? "collapsed" : ""}`}>
                <div className="post-list-h"><h2>게시글 목록</h2></div>
                <div className="post-lists">
                    <ul className="list-none">
                        {currentPosts.map(post => (
                            <li
                                key={post.id}
                                onClick={() => handlePostClick(post.id)}
                                className={`post-item ${selectedPost?.id === post.id ? 'active' : ''}`}
                            >
                                <h3 className="post-title">{post.title}</h3>
                            </li>
                        ))}
                    </ul>
                </div>
                {renderPagination()}
                <Link to="/posts/new">
                    <button className="new-button" title="새 글">+</button>
                </Link>
            </div>

            {selectedPost && (
                <div className="post-detail-panel">
                    <div className="post-actions">
                        <button onClick={handleEdit} disabled={!isAuthenticated} className={!isAuthenticated ? "disabled-btn" : ""}>수정</button>
                        <button onClick={handleDelete} disabled={!isAuthenticated} className={!isAuthenticated ? "disabled-btn" : ""}>삭제</button>
                    </div>
                    <div className="post-title-container">
                        <h1>{selectedPost.title}</h1>
                        <div className="post-createAt-container">
                            <h4>작성일 : {formatDate(selectedPost.createdAt)}</h4>
                        </div>
                    </div>
                    <div className="post-content-container" dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
                </div>
            )}
        </div>
    );
};

export default PostList;
