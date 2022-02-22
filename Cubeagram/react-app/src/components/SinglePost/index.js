import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { deleteComment, getAllComments } from "../../store/comment";
import { getAllPosts } from "../../store/post";
import { getAllUsers } from "../../store/user";
import CommentForm from "../CommentForm";
import EditCommentModal from "../../context/EditCommentModal";
import './SinglePost.css'


function SinglePost () {
    const dispatch = useDispatch()
    const comments = useSelector(state => state.commentReducer.entries)
    const sessionUser = useSelector(state => state.session.user)
    const posts = useSelector(state => state.postReducer.entries)
    const allUsers = useSelector(state => state.userState.entries)
    const { id } = useParams()
    const thisPost = posts.find(post => post.id === +id)

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        dispatch(getAllComments(id))
        dispatch(getAllPosts())
        dispatch(getAllUsers())
    },[dispatch, id])

    const handleCommentDelete = (commentId) => async (e) => {
        e.preventDefault()

        const data = await dispatch(deleteComment(commentId))
        if (data && data.msg === "Successfully deleted"){
            dispatch(getAllComments(thisPost?.id))
        }
    }

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

    function commentProfilePic(userId) {
        for(let i = 0; i < allUsers?.length; i++) {
            let user = allUsers[i]
            if(user?.id === userId) return user?.imageUrl
        }
    }

    function commentUsername(userId) {
        for(let i = 0; i < allUsers?.length; i++) {
            let user = allUsers[i]
            if(user?.id === userId) return user?.username
        }
    }


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
                        <h4 id='comment-count-single'>{comments.length} Comments</h4>
                        <div className="top-right-div">
                            {comments?.map(comment => (
                            <div className="single-comment-div">
                                <div className="fix-comments-div">
                                    <div className="comment-image-div-right">
                                        <img id='comment-profile-pic' alt="profile" src={commentProfilePic(comment?.userId)} />
                                    </div>
                                    <div className="username-body-comment">
                                        <h4 id='comment-username-right'>{commentUsername(comment?.userId)}</h4>
                                        <p>{comment?.body}</p>
                                    </div>
                                    {sessionUser?.id === comment?.userId &&
                                    <div>
                                        <EditCommentModal comment={comment}/>
                                        <i onClick={handleCommentDelete(comment?.id)} class="far fa-trash-can"></i>
                                    </div>
                                    }
                                </div>
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
