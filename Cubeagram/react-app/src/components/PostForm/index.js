import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link} from 'react-router-dom';
import { newPost } from "../../store/post";
import "./PostForm.css"


function PostForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const [imageUrl, setImageUrl] = useState("")
    const [errors, setErrors] = useState([])
    const [body, setBody] = useState("")

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

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
        <div className="post-form-main">
            <div className="post-form-left">
                <div className="preview-post-div">
                    <div className="post-pic-user">
                        <img src={user?.imageUrl} id='profile-pic' alt='profile' />
                        <p id='post-user-top'>{user?.username}</p>
                    </div>
                    <img alt='profile' id='home-post-img' src={imageUrl?.length < 1 ? "https://www.gaithersburgdental.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.png": imageUrl} className='home-post-img' />
                    <div className="caption-author-div">
                            <p><span id='post-user-caption'>{user?.username}</span> {body.length < 1 ? "Caption" : body}</p>
                    </div>
                </div>
            </div>
            <div className="mid-line-div"></div>
            <div className="post-form-right">
                <form onSubmit={handleSubmit}>
                    <div className="input-post-form">
                    {errors.map(error => (
                        <div key={error}>{error}</div>
                        ))}
                        <label id='image-label' htmlFor="imageUrl">Image *</label>
                            <input
                                id='image-input'
                                type="text"
                                value={imageUrl}
                                onChange={e => setImageUrl(e.target.value)}
                                placeholder="Image Url"
                                autoComplete="off"
                                required
                            />
                        <label id='caption-label' htmlFor="body">Caption</label>
                            <textarea
                                id='caption-input'
                                value={body}
                                onChange={e => setBody(e.target.value)}
                                autoComplete="off"
                                placeholder="Caption"
                            />
                        <div className="post-form-buttons">
                            <button id='submit-post-button' type='submit'>Post</button>
                            <Link to='/'>Cancel</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default PostForm
