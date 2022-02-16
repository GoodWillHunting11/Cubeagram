import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { editPost } from "../../store/post";


function EditPostForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const params = useParams()
    const postId = parseInt(params.id, 10)

    const user = useSelector(state => state.session.user)
    const posts = useSelector(state => state.postReducer.entries)
    const currentPost = posts.find(post => post.id === postId)

    if (currentPost) {
        localStorage.setItem('body', currentPost.body)
    }

    const [errors, setErrors] = useState([])
    const [body, setBody] = useState(localStorage.getItem('body'))

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
            history.push(`/`)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="body">Caption</label>
                    <textarea
                        value={body}
                        onChange={e => setBody(e.target.value)}
                        autoComplete="off"
                        placeholder="Caption"
                    />
                <button type='submit'>Edit Post</button>
            </form>
        </div>
    )
}


export default EditPostForm
