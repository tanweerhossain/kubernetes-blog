import React, { useState, useEffect } from 'react';
import CommentCreateComponent from '../components/CommentCreateComponent';
import CommentListComponent from '../components/CommentListComponent';
import { getPosts } from '../services/query';


const PostListContainer = () => {
    const [posts, setPosts] = useState({});
    
    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const response = await getPosts();

        setPosts(response);
    };
    return (
        <div className="d-flex flex-row flex-warp justified-content-between">
            {
                Object.values(posts)
                    .map(post => (
                        <div 
                            className="card"
                            style={{
                                width: '30%',
                                marginBottom: '20px'
                            }}
                            key={post.id}>
                                <div className="card-body">
                                    <h3>{post.title}</h3>
                                    <CommentListComponent comments={post.comments} />
                                    <CommentCreateComponent postId={post.id} />
                                </div>  
                        </div>
                    ))
            }     
        </div> 
    );
};

export default PostListContainer;