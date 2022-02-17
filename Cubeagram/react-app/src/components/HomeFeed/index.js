import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from 'react-router-dom';
import { deletePost, getAllPosts } from "../../store/post";
import "./homeFeed.css"


function HomeFeed() {
    const posts = useSelector(state => state.postReducer.entries)
    const user = useSelector(state => state.session)
    const history = useHistory()
    console.log('post state', posts)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllPosts())
    },[dispatch])

    // function postAuthor(postUserId) {
    //     return user.find(user => user.id === postUserId)
    // }

    const handlePostDelete = async (e) => {
        e.preventDefault()
        const id = e.target.value
        const data = await dispatch(deletePost(id))
        if (data.msg === "Successfully deleted"){
            dispatch(getAllPosts())
            history.push('/')
        }
    }
    // {postAuthor(post.userId)}
    return (
        <div>
            <div className="home-main-div">
                <div className="home-left-container">
                    left
                </div>
                <div className="home-middle-container">
                    {posts?.map(post => (
                    <div className="home-post-div" key={post?.id}>
                        <p><img id='profile-pic' src={user.imageUrl} /></p>
                        <img id="home-post-img" src={post?.imageUrl} />
                        <p>{post?.body}</p>
                        {user?.id === post?.userId &&
                            <Link to={`/posts/${post?.id}/edit`}><button>Edit Post</button></Link>
                        }
                        {user?.id === post?.userId &&
                            <button value={post.id} onClick={handlePostDelete}>Delete Post</button>
                        }
                    </div>
                    ))}
                </div>
                <div className="home-right-container">
                    right
                </div>
            </div>
        </div>
    )
}


export default HomeFeed
