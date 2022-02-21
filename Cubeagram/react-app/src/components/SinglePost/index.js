import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from 'react-router-dom';
import { getAllComments } from "../../store/comment";
import { deletePost, getAllPosts } from "../../store/post";
import { getAllUsers } from "../../store/user";
import CommentForm from "../CommentForm";
import './SinglePost.css'


function SinglePost () {
    const dispatch = useDispatch()
    const comments = useSelector(state => state.commentReducer.entries)
    console.log('all comments', comments)
    const posts = useSelector(state => state.postReducer.entries)
    const allUsers = useSelector(state => state.userState.entries)
    const { id } = useParams()
    const thisPost = posts.find(post => post.id === +id)
    console.log('this post', thisPost)
    // console.log('comments', comments)

    useEffect(() => {
        dispatch(getAllComments(id))
        dispatch(getAllPosts())
        dispatch(getAllUsers())
    },[dispatch])

    function postAuthor() {
        for(let i = 0; i < allUsers?.length; i++) {
            let user = allUsers[i]
            if(user?.id === thisPost?.userId) return user?.username
        }
    }

    function postAuthorPic() {
        for(let i = 0; i < allUsers?.length; i++) {
            let user = allUsers[i]
            if(user?.id === thisPost?.userId) return user?.imageUrl
        }
    }

    function commentProfilePic() {

    }

    console.log('pic', postAuthorPic())
    return (
        <div>
            <div className="home-main-div">
                <div className="home-left-container">
                </div>
                <div className="home-middle-container">
                    <div className="single-post-div">
                        <div className="post-pic-user">
                            <img id='profile-pic' alt="profile" src={postAuthorPic(thisPost?.userId)} />
                            <p id='post-user-top'>{postAuthor()}</p>
                        </div>
                        <img id='home-post-img' alt='post' src={thisPost?.imageUrl} />
                        <div className="like-comment-div">
                            <i id='like-heart' class="far fa-heart"></i>
                            <i id='comment-bubble' class="far fa-comment"></i>
                        </div>
                        <div className="caption-author-div">
                        <p><span id='post-user'>{postAuthor()}</span> {thisPost?.body}</p>
                        </div>
                    </div>
                </div>
                <div className="single-post-right-container">
                    <div className="comments-single-post">
                        <div className="top-right-div">
                            <h4>{comments.length} Comments</h4>
                            {comments?.map(comment => (
                            <div className="single-comment-div">
                                <img id='comment-profile-pic' alt="profile" src={postAuthorPic(thisPost?.userId)} />
                                <p>{comment?.body}</p>
                            </div>
                            ))}
                        </div>
                        <div className="bottom-right-div">
                            <CommentForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SinglePost
