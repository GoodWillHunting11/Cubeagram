import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from 'react-router-dom';
import { deleteComment, getAllComments } from "../../store/comment";
import { deletePost, getAllPosts } from "../../store/post";
import { getAllUsers } from "../../store/user";
import CommentForm from "../CommentForm";
import EditCommentForm from "../EditCommentForm";
import './SinglePost.css'


function SinglePost () {
    const dispatch = useDispatch()
    const history = useHistory()
    const comments = useSelector(state => state.commentReducer.entries)
    const sessionUser = useSelector(state => state.session.user)
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

    const handleCommentDelete = (commentId) => async (e) => {
        e.preventDefault()

        // console.log('commentId', commentId)
        const data = await dispatch(deleteComment(commentId))
        console.log('data', data)
        if (data && data.msg === "Successfully deleted"){
            console.log('before dispatch')
            dispatch(getAllComments(thisPost?.id))
            // history.push(`/post/${id}`)
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

    const [renderEditForm, setRenderEditForm] = useState(false)

    console.log('pic', postAuthorPic())

    let value;
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
                                        <i onClick={() => setRenderEditForm(true)} class="fas fa-pencil"></i>
                                        <i onClick={handleCommentDelete(comment?.id)} class="far fa-trash-can"></i>
                                        { renderEditForm &&
                                        <p onClick={() => setRenderEditForm(false)}>x</p>}
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
                { renderEditForm &&
                <div className="edit-comment-form-div">
                    <EditCommentForm comment={value}/>
                </div>}
            </div>
        </div>
    )
}

export default SinglePost
