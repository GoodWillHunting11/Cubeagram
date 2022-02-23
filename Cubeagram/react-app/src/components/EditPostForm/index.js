import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from 'react-router-dom';
import { editPost, getAllPosts } from "../../store/post";
import './EditPostForm.css'

function EditPostForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()
    // const postId = parseInt(params.id, 10)

    const user = useSelector(state => state.session.user)
    const posts = useSelector(state => state.postReducer.entries)
    const currentPost = posts.find(post => post.id === +id)

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(getAllPosts())
    }, [dispatch])

    if (currentPost) {
        localStorage.setItem('body', currentPost.body)
        localStorage.setItem('imageUrl', currentPost.imageUrl)
    }

    const [setErrors] = useState([])
    const [body, setBody] = useState(localStorage.getItem('body'))
    const [image] = useState(localStorage.getItem('imageUrl'))

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            body,
            "postId": +id,
        }

        const edit_post = await dispatch(editPost(payload))

        if (edit_post?.errors) {
            setErrors(edit_post?.errors)
        }
        else if (!edit_post?.errors) {
            dispatch(getAllPosts())
            history.push(`/`)
        }

        localStorage.clear()
    }

    if(!currentPost) {
        return (
            <div className="main-not-found">
                <div className="page-not-found">
                    <h1 id='error-code'>404</h1>
                    <h2 id='not-not-found'>{`Post Not Found :(`}</h2>
                    <Link id='return-cubeagram' to='/'>Return To Cubeagram</Link>
                </div>
            </div>
        )
    }

    if(currentPost?.userId !== user.id) {
        return (
            <div className="main-not-found">
                <div className="page-not-found">
                    <h1 id='error-code'>401</h1>
                    <h2 id ='not-not-found'>Unauthorized</h2>
                    <h2 id='not-not-found'>{`You Do Not Have Access To This Content :(`}</h2>
                    <Link id='return-cubeagram' to='/'>Return To Cubeagram</Link>
                </div>
            </div>
        )
        }

    return (
        <>
            <div className="post-form-main">
                <div className="post-form-left">
                    <div className="preview-post-div">
                        <div className="post-pic-user">
                            <img src={user?.imageUrl} id='profile-pic' alt='profile' />
                            <p id='post-user-top'>{user?.username}</p>
                        </div>
                        <img alt="post" id='home-post-img' src={image} />
                        <div className="like-comment-div">
                            <i id='like-heart' className="far fa-heart"></i>
                            <i id='comment-bubble' className="far fa-comment"></i>
                        </div>
                        <div className="caption-author-div">
                            <p><span id='post-user-caption'>{user?.username}</span> {body.length < 1 ? "Caption" : body}</p>
                            <p className="view-all-comments-post">View All Comments</p>
                        </div>
                    </div>
                </div>
                <div className="mid-line-div"></div>
                <div className="post-form-right">
                    <form onSubmit={handleSubmit}>
                        <label id='caption-label-edit' htmlFor="body">Caption</label>
                            <textarea
                                id='caption-input-edit'
                                value={body}
                                onChange={e => setBody(e.target.value)}
                                autoComplete="off"
                                placeholder="Caption"
                            />
                        <button id='edit-button' type='submit'>Edit Post</button>
                        <Link id='cancel-edit-post' to={'/'}>Cancel</Link>
                    </form>
                </div>
            </div>
        </>
    )
}


export default EditPostForm
