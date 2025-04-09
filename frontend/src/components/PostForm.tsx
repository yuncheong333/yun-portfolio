import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostEditor from './PostEditor';
import axios from 'axios';

interface PostData {
    title: string;
    content: string;
    author: string;
}

const PostForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState<PostData>({
        title: '',
        content: '',
        author: '작성자명' // 실제로는 로그인된 사용자 정보 사용
    });
    const [isLoading, setIsLoading] = useState(false);

    // 수정 모드일 경우 기존 데이터 로드
    useEffect(() => {
        if (id) {
            const fetchPost = async () => {
                try {
                    const response = await axios.get(`/api/posts/${id}`);
                    setPost({
                        title: response.data.title,
                        content: response.data.content,
                        author: response.data.author
                    });
                } catch (error) {
                    console.error('Error fetching post:', error);
                }
            };
            fetchPost();
        }
    }, [id]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPost({ ...post, title: e.target.value });
    };

    const handleContentChange = (content: string) => {
        setPost({ ...post, content });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const token = localStorage.getItem('accessToken');
        if (!token) {
            alert('로그인이 필요합니다.');
            setIsLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };

            if (id) {
                await axios.put(`/api/posts/${id}`, post, config);
            } else {
                await axios.post('/api/posts', post, config);
            }

            navigate('/posts');
        } catch (error) {
            console.error('Error saving post:', error);
            alert('저장 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">
                {id ? '게시글 수정' : '새 게시글 작성'}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block mb-2 font-medium">
                        제목
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={post.title}
                        onChange={handleTitleChange}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                        required
                        maxLength={100}
                    />
                </div>

                <div>
                    <label htmlFor="content" className="block mb-2 font-medium">
                        내용
                    </label>
                    <PostEditor
                        initialData={post.content}
                        onChange={handleContentChange}
                    />
                </div>

                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={() => navigate('/posts')}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`px-4 py-2 text-white rounded ${
                            isLoading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                    >
                        {isLoading ? '처리 중...' : id ? '수정 완료' : '작성 완료'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostForm;
