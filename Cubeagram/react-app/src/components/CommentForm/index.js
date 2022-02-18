import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from 'react-router-dom';
import { newComment } from "../../store/comment";
import { newPost } from "../../store/post";

function CommentForm () {

    const dispatch = useDispatch()
    const { id } = useParams()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const [errors, setErrors] = useState([])
    const [body, setBody] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            userId: user.id,
            "postId": id,
            body,
        }

        const new_comment = await dispatch(newComment(payload))

        if (new_comment?.errors) {
            setErrors(new_comment?.errors)
        }
        else if (!new_comment?.errors) {
            history.push(`/`)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="body">Comment</label>
                <textarea
                        value={body}
                        onChange={e => setBody(e.target.value)}
                        autoComplete="off"
                        placeholder="Comment"
                />
            <button type="submit">Add Comment</button>
            <Link to='/'>Cancel</Link>
            </form>
        </div>
    )
}

export default CommentForm
