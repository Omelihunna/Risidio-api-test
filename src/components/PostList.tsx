import React from 'react';
import { useFetchPostsQuery } from '../features/posts/postApi';
import './PostsList.css';  // Importing the CSS file

const PostsList: React.FC = () => {
    const { data: posts, isLoading, isError } = useFetchPostsQuery({});

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching posts.</p>;

    return (
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
                    {posts?.map((post: any) => (
                        <tr key={post.id}>
                            <td>{post.userId}</td>
                            <td>{post.title}</td>
                            <td>{post.completed ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PostsList;
