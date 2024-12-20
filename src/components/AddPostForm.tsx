import React, { useState } from 'react';
import { useAddPostMutation } from '../features/posts/postApi';
import './AddPostForm.css';

const AddPostForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [userId, setUserId] = useState(1);
    const [addPost, { isLoading }] = useAddPostMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const test = await addPost({ title, userId, completed: false });
        console.log(test)
        setTitle('');
    };

    return (
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
                    disabled={isLoading}
                    className={`submit-btn ${isLoading ? 'disabled' : ''}`}>
                    {isLoading ? "Adding..." : "Add Post"}
                </button>
            </form>
        </div>
    );
};

export default AddPostForm;
