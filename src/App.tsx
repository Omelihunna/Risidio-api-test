import React from 'react';
import AddPostForm from './components/AddPostForm';
import PostsList from './components/PostList';

const App: React.FC = () => {
  return (
    <div>
      <h1>Posts</h1>
      <AddPostForm />
      <PostsList />
    </div>
  );
};

export default App;
