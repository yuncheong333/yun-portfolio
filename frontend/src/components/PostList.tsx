import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Post {
    id: number;
    title: string;
    author: string;
    createdAt: string;
    previewContent: string;
}

const PostList = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">게시글 목록</h1>
                <Link
                    to="/posts/new"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    새 글 작성
                </Link>
            </div>

            <div className="space-y-4">
                {posts.map((post) => (
                    <div key={post.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h2 className="text-xl font-semibold mb-2">
                            <Link to={`/posts/${post.id}`} className="hover:text-blue-500">
                                {post.title}
                            </Link>
                        </h2>
                        <p className="text-gray-600 text-sm mb-2">작성자: {post.author}</p>
                        <p className="text-gray-500 text-xs mb-3">
                            {new Date(post.createdAt).toLocaleString()}
                        </p>
                        <div className="text-gray-700 line-clamp-2">
                            {post.previewContent}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostList;