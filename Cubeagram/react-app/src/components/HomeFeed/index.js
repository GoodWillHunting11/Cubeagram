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
    const comments = useSelector(state => state.commentReducer.entries)
    const history = useHistory()
    const dispatch = useDispatch()

    function getCommentCount(postId) {
        const commentArr = []
        for(let i = 0; i < comments.length; i++) {
            let comment = comments[i]
            if(comment.postId === postId) commentArr.push(comment)
        }
        return commentArr.length;
    }

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
            <div className="home-main-div">
                <div className="home-left-container">
                </div>
                <div className="home-middle-container">
                    {posts?.map(post => (
                    <div className="home-post-div" key={post?.id}>
                        <div className="post-pic-user">
                            <img id='profile-pic' alt="profile" src={postAuthorPic(post?.userId)} />
                            <p id='post-user-top'>{postAuthor(post?.userId)}</p>
                            <div className="edit-delete-post-home">
                                {user?.id === post?.userId &&
                                    <Link to={`/posts/${post?.id}/edit`}><button>Edit</button></Link>
                                }
                                {user?.id === post?.userId &&
                                    <button value={post?.id} onClick={handlePostDelete}>Delete</button>
                                }
                            </div>
                        </div>
                        <Link to={`/post/${post?.id}`}><img id="home-post-img" alt="post" src={post?.imageUrl} /></Link>
                        <div className="like-comment-div">
                            <i id='like-heart' class="far fa-heart"></i>
                            <Link to={`/post/${post?.id}`} ><i id='comment-bubble' class="far fa-comment"></i></Link>
                        </div>
                        <div className="caption-author-div">
                            <p><span id='post-user'>{postAuthor(post?.userId)}</span> {post?.body}</p>
                        </div>
                        <div className="view-all-comments-home">
                            <Link to={`/post/${post?.id}`}>{`View All ${getCommentCount(post?.id)} Comments`}</Link>
                        </div>

                    </div>
                    ))}
                </div>
                <div className="home-right-container">
                    <div className="right-pic-username">
                        <img alt="profile" id='profile-pic' src={user?.imageUrl} />
                        <div id='username-right'>
                            <h3>{user?.username}</h3>
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
