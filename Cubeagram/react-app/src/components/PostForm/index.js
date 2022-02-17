import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { newPost } from "../../store/post";


function PostForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const [imageUrl, setImageUrl] = useState("")
    const [errors, setErrors] = useState([])
    const [body, setBody] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            imageUrl,
            userId: user.id,
            body,
        }

        const new_post = await dispatch(newPost(payload))

        if (new_post?.errors) {
            setErrors(new_post?.errors)
        }
        else if (!new_post?.errors) {
            history.push(`/`)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="imageUrl">Image URL</label>
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                        placeholder="Image Url"
                        autoComplete="off"
                        required
                    />
                <label htmlFor="body">Caption</label>
                    <textarea
                        value={body}
                        onChange={e => setBody(e.target.value)}
                        autoComplete="off"
                        placeholder="Caption"
                    />
                <button type='submit'>Add Post</button>
            </form>
        </div>
    )
}


export default PostForm
