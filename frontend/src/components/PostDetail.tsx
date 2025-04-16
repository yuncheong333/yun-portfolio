import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useNavigate 추가
import api from "../api/auth"; // api 경로는 자신의 경로에 맞게 수정
import '../styles/Base.css';

const PostDetail = () => {
    const { id } = useParams(); // URL에서 id 파라미터를 추출
    const navigate = useNavigate(); // navigate 훅 사용
    const [post, setPost] = useState<any | null>(null); // 게시글 데이터 상태
    const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
    const [error, setError] = useState<string | null>(null); // 에러 상태

    // 게시글 ID를 기반으로 게시글 데이터 가져오기
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await api.get(`/posts/${id}`); // API에서 해당 게시글을 가져옴
                setPost(response.data); // 데이터 설정
            } catch (err) {
                setError("게시글을 불러오는 데 실패했습니다."); // 에러 처리
            } finally {
                setLoading(false); // 로딩 끝
            }
        };

        if (id) {
            fetchPost(); // ID가 있을 때만 데이터 가져오기
        }
    }, [id]);

    const handleDelete = async () => {
        try {
            await api.delete(`/posts/${id}`); // 삭제 API 호출
            navigate("/posts"); // 게시글 목록으로 리다이렉트
        } catch (err) {
            setError("게시글 삭제에 실패했습니다."); // 삭제 실패 처리
        }
    };

    const handleEdit = () => {
        navigate(`/posts/${id}/edit`); // 수정 페이지로 이동
    };

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;
    if (!post) return <p>게시글이 존재하지 않습니다.</p>;

    return (
        <div className="base-container">
            <div className="post-detail">
                <h1>{post.title}</h1>
                <p>{new Date(post.createdAt).toLocaleString()}</p>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                {/* HTML 내용 표시 */}

                <div className="post-actions">
                    <button onClick={handleEdit}>수정</button> {/* 수정 버튼 */}
                    <button onClick={handleDelete}>삭제</button> {/* 삭제 버튼 */}
                </div>
            </div>
        </div>
    );
};

export default PostDetail;
