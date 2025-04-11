import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/auth';

interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    createdAt: string;
    updatedAt: string;
}
//추가 해줘야할거 axios 토큰부여


const PostDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState(true);


    // 게시글 조회 (인증 불필요)
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await api.get(`/posts/${id}`);
                setPost(response.data);
            } catch (error) {
                console.error('Error fetching post:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    // 삭제 처리 (인증 필요)
    const handleDelete = async () => {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            if (window.confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')) {
                navigate('/login');
            }
            return;
        }

        if (!window.confirm('정말 삭제하시겠습니까?')) return;

        try {
            await api.delete(`/posts/${id}`);
            navigate('/posts');
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };


    // 수정 페이지 진입 전 토큰 확인 (선택사항)
    const handleEdit = () => {
        if (!localStorage.getItem('accessToken')) {
            if (window.confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')) {
                navigate('/login');
            }
            return;
        }
        navigate(`/posts/${id}/edit`);
    };

    if (isLoading) return <div>Loading...</div>;
    if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-6">
                <button
                    onClick={() => navigate('/posts')}
                    className="text-blue-500 hover:underline"
                >
                    &larr; 목록으로
                </button>
            </div>

            <article className="border rounded-lg p-6 shadow-sm">
                <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

                <div className="flex justify-between items-center mb-6 text-sm text-gray-500">
                    <span>작성자: {post.author}</span>
                    <span>
            {new Date(post.createdAt).toLocaleString()} |
                        {post.updatedAt !== post.createdAt && ` (수정됨)`}
          </span>
                </div>

                <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{__html: post.content}}
                />

                {localStorage.getItem('accessToken') && (
                    <div className="flex justify-end space-x-3 mt-8">
                        <button
                            onClick={handleEdit}
                            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                            수정
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            삭제
                        </button>
                    </div>
                )}
            </article>
        </div>
    );
};

export default PostDetail;
