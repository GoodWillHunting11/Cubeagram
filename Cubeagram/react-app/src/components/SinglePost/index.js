import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from 'react-router-dom';
import { deleteComment, getAllComments } from "../../store/comment";
import { getAllPosts, deletePost } from "../../store/post";
import { getAllUsers } from "../../store/user";
import CommentForm from "../CommentForm";
import EditCommentModal from "../../context/EditCommentModal";
import './SinglePost.css'


function SinglePost () {
    const history = useHistory()
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

    const handlePostDelete = (postId) => async (e) => {
        e.preventDefault()

        const data = await dispatch(deletePost(postId))
        if (data.msg === "Successfully deleted"){
            dispatch(getAllPosts())
            history.push('/')
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

    if(!thisPost){
        return (
        <div className="main-not-found">
            <div className="page-not-found">
                <h1 id='error-code'>404</h1>
                <h2 id='not-not-found'>{`Page Not Found :(`}</h2>
                <Link id='return-cubeagram' to='/'>Return To Cubeagram</Link>
            </div>
        </div>
        )
    }

    return (
        <div className="page-container-single-post">
            <div className="home-main-div">
                <div className="home-left-container">
                </div>
                <div className="home-middle-container">
                    <div className="single-post-div">
                        <div className="post-pic-user">
                            <img id='profile-pic' alt="profile" src={postAuthorPic(thisPost?.userId)} />
                            <Link id='post-user-top' to={`/user/${thisPost?.userId}`}><p>{postAuthor()}</p></Link>
                            {sessionUser?.id === thisPost?.userId &&
                            <div className="edit-delete-single-post-page">
                                <Link id='edit-pencil-single-post' to={`/posts/${thisPost?.id}/edit`}><i className="fas fa-pencil"></i></Link>
                                <i onClick={handlePostDelete(thisPost?.id)} className="far fa-trash-can"></i>
                            </div>
                            }
                        </div>
                        <img id='home-post-img' alt='post' src={thisPost?.imageUrl} />
                        <div className="caption-author-div-post">
                            <span id='post-user'>{postAuthor()}</span>
                            <p id='overflow-post-caption'>{thisPost?.body}</p>
                        </div>
                    </div>
                </div>
                <div className="single-post-right-container">
                    <div className="comments-single-post">
                        <h4 id='comment-count-single'>{comments?.length} Comments</h4>
                        <div className="top-right-div">
                            {comments?.map(comment => (
                            <div key={comment?.id} className="single-comment-div">
                                <div className="fix-comments-div">
                                    <div className="comment-image-div-right">
                                        <img id='comment-profile-pic' alt="profile" src={commentProfilePic(comment?.userId)} />
                                    </div>
                                    <div className="username-body-comment">
                                        <h4 id='comment-username-right'>{commentUsername(comment?.userId)}</h4>
                                        <p id='actual-comment'>{comment?.body}</p>
                                    </div>
                                </div>
                                    {sessionUser?.id === comment?.userId &&
                                    <div id='edit-delete-comment-button-single'>
                                        <EditCommentModal comment={comment}/>
                                        <i id='a-unique-id' onClick={handleCommentDelete(comment?.id)} className="far fa-trash-can"></i>
                                    </div>
                                    }
                            </div>
                            ))}
                        </div>
                        <div className="bottom-right-div-comment">
                            <CommentForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SinglePost
