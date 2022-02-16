import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from 'react-router-dom';
import { getAllPosts } from "../../store/post";


function HomeFeed() {
    const posts = useSelector(state => state.postReducer.entries)
    const user = useSelector(state => state.session.user)
    console.log('posts state', posts)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllPosts())
    },[dispatch])

    return (
        <div>
            {posts?.map(post => (
                <div key={post?.id}>
                    <img src={post?.imageUrl} />
                    <p>{post?.userId} {post?.body}</p>
                    {user.id === post.userId &&
                        <Link to={`/posts/${post.id}`}><button>Edit Post</button></Link>
                    }
                </div>
            ))}
        </div>
    )
}


export default HomeFeed
