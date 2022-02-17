import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from 'react-router-dom';
import { deletePost, getAllPosts } from "../../store/post";


function HomeFeed() {
    const posts = useSelector(state => state.postReducer.entries)
    const user = useSelector(state => state.session.user)
    const history = useHistory()
    console.log('posts state', posts)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllPosts())
    },[dispatch])

    const handlePostDelete = async (e) => {
        e.preventDefault()
        const id = e.target.value
        const data = await dispatch(deletePost(id))
        if (data.msg === "Successfully deleted"){
            dispatch(getAllPosts())
            history.push('/')
        }
    }

    return (
        <div>
            {posts?.map(post => (
                <div key={post?.id}>
                    <img src={post?.imageUrl} />
                    <p>{post?.userId} {post?.body}</p>
                    {user?.id === post?.userId &&
                        <Link to={`/posts/${post?.id}/edit`}><button>Edit Post</button></Link>
                    }
                    {user?.id === post?.userId &&
                        <button value={post.id} onClick={handlePostDelete}>Delete Post</button>
                    }
                </div>
            ))}
        </div>
    )
}


export default HomeFeed
