import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import { deletePost, getAllPosts } from "../../store/post";
import { getAllUsers } from "../../store/user";
import "./homeFeed.css"


function HomeFeed() {
    const posts = useSelector(state => state.postReducer.entries)
    const user = useSelector(state => state.session.user)
    const allUsers = useSelector(state => state.userState.entries)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        dispatch(getAllPosts())
        dispatch(getAllUsers())
    },[dispatch])

    function postAuthor(postUserId) {
        for(let i = 0; i < allUsers.length; i++) {
            let user = allUsers[i]
            if(user.id === postUserId) return user.username
        }
    }

    function postAuthorPic(postUserId) {
        for(let i = 0; i < allUsers.length; i++) {
            let user = allUsers[i]
            if(user.id === postUserId) return user.imageUrl
        }
    }

    const handlePostDelete = (postId) => async (e) => {
        e.preventDefault()

        const data = await dispatch(deletePost(postId))
        if (data.msg === "Successfully deleted"){
            dispatch(getAllPosts())
            history.push('/')
        }
    }
    return (
        <div>
            <div className="home-main-div">
                <div className="home-left-container">
                </div>
                <div className="home-middle-container">
                    {posts?.map(post => (
                    <div className="home-post-div" key={post?.id}>
                        <div className="post-pic-user">
                            <div className="edit-delete-post-home">
                                {user?.id === post?.userId &&
                                    <Link to={`/posts/${post?.id}/edit`}><i className="fas fa-pencil"></i></Link>
                                }
                                {user?.id === post?.userId &&
                                    <i id='trash-can-home' onClick={handlePostDelete(post?.id)} className="far fa-trash-can"></i>
                                }
                            </div>
                            <div className="second-div-for-top">
                                <img id='profile-pic' alt="profile" src={postAuthorPic(post?.userId)}
                                onError={(e) => { e.target.src = 'https://www.gaithersburgdental.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.png'; e.target.onError = null; }}/>
                                <Link id='post-user-top' to={`/user/${post?.userId}`}><p>{postAuthor(post?.userId)}</p></Link>
                            </div>
                        </div>
                        <Link to={`/post/${post?.id}`}><img id="home-post-img" alt="post" src={post?.imageUrl}
                        onError={(e) => { e.target.src = 'https://www.gaithersburgdental.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.png'; e.target.onError = null; }}/></Link>
                        <div className="like-comment-div">
                            <Link to={`/post/${post?.id}`} ><i id='comment-bubble' className="far fa-comment"></i></Link>
                        </div>
                        <div className="caption-author-div">
                            <span id='post-user'>{postAuthor(post?.userId)}</span>
                            <p id='caption-on-post-post'> {post?.body}</p>
                        </div>
                        <div className="view-all-comments-home">
                            <Link to={`/post/${post?.id}`}>{`View All Comments`}</Link>
                        </div>

                    </div>
                    ))}
                </div>
                <div className="home-right-container">
                    <div className="right-pic-username">
                        <img alt="profile" id='profile-pic' src={user?.imageUrl}
                        onError={(e) => { e.target.src = 'https://www.gaithersburgdental.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.png'; e.target.onError = null; }}/>
                        <div id='username-right'>
                        <Link to={`user/${user?.id}`}><h3>{user?.username}</h3></Link>
                        </div>
                    </div>
                    <div className="right-links-container">
                        <a rel="noreferrer" target="_blank" id='linkedin-link' href="https://www.linkedin.com/in/aaron-short-780446179/">Linkedin</a>
                        <a rel="noreferrer" target="_blank" id='github-link' href="https://github.com/GoodWillHunting11/Cubeagram">GitHub</a>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default HomeFeed
