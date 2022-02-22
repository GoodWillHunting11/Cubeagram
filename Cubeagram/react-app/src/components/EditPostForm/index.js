import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from 'react-router-dom';
import { editPost, getAllPosts } from "../../store/post";
import './EditPostForm.css'

function EditPostForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const params = useParams()
    const postId = parseInt(params.id, 10)

    const user = useSelector(state => state.session.user)
    const posts = useSelector(state => state.postReducer.entries)
    const currentPost = posts.find(post => post.id === postId)

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

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
            postId,
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

    return (
        <div className="post-form-main">
            <div className="post-form-left">
                <div className="preview-post-div">
                    <div className="post-pic-user">
                        <img src={user?.imageUrl} id='profile-pic' alt='profile' />
                        <p id='post-user-top'>{user?.username}</p>
                    </div>
                    <img alt="post" id='home-post-img' src={image} />
                    <div className="like-comment-div">
                        <i id='like-heart' class="far fa-heart"></i>
                        <i id='comment-bubble' class="far fa-comment"></i>
                    </div>
                    <div className="caption-author-div">
                        <p><span id='post-user-caption'>{user?.username}</span> {body.length < 1 ? "Caption" : body}</p>
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
    )
}


export default EditPostForm
