import React, { useState } from 'react';
import { useAddPostMutation, useFetchPostsQuery } from '../features/posts/postApi';
import './PostsList.css';

interface Post {
    id?: number;
    title: string;
    userId: number;
    completed: boolean;
}

const PostsList: React.FC = () => {
    const { data: postsData, isLoading, isError } = useFetchPostsQuery();
    const [localPosts, setLocalPosts] = useState<Post[]>(postsData || []); // Initialize with fetched posts
    const [title, setTitle] = useState('');
    const [userId, setUserId] = useState(1);
    const [addPost, { isLoading: createLoading }] = useAddPostMutation();

    // Sync localPosts with server data when available
    React.useEffect(() => {
        if (postsData) {
            setLocalPosts(postsData);
        }
    }, [postsData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Optimistically update the UI
        const newPost = {
            id: Date.now(), // Temporary ID for the UI
            title,
            userId,
            completed: false,
        };

        setLocalPosts((prevPosts) => [newPost, ...prevPosts]); // Add new post to local state

        try {
            // Make the API request
            await addPost({ title, userId, completed: false });
        } catch (error) {
            console.error("Failed to add post:", error);

            // Revert the optimistic update in case of error
            setLocalPosts((prevPosts) =>
                prevPosts.filter((post) => post.id !== newPost.id)
            );
        }

        setTitle('');
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching posts.</p>;

    return (
        <div>
            <div className="form-container">
                <form onSubmit={handleSubmit} className="post-form">
                    <h2 className="form-title">Add New Post</h2>

                    <div className="form-group">
                        <label className="form-label" htmlFor="userId">
                            User ID:
                        </label>
                        <input
                            type="number"
                            id="userId"
                            value={userId}
                            onChange={(e) => setUserId(Number(e.target.value))}
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="title">
                            Title:
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={createLoading}
                        className={`submit-btn ${createLoading ? 'disabled' : ''}`}>
                        {createLoading ? "Adding..." : "Add Post"}
                    </button>
                </form>
            </div>
            <div className="table-container">
                <table className="post-table">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Title</th>
                            <th>Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {localPosts.map((post) => (
                            <tr key={post.id}>
                                <td>{post.userId}</td>
                                <td>{post.title}</td>
                                <td>{post.completed ? 'Yes' : 'No'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PostsList;
