import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/api/posts/${id}`);
                setPost(response.data);
            } catch (error) {
                console.error('Error fetching post:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            try {
                await axios.delete(`/api/posts/${id}`);
                navigate('/posts');
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
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
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <div className="flex justify-end space-x-3 mt-8">
                    <button
                        onClick={() => navigate(`/posts/${id}/edit`)}
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
            </article>
        </div>
    );
};

export default PostDetail;