import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { getAllComments, newComment } from "../../store/comment";
import './CommentForm.css'

function CommentForm () {

    const dispatch = useDispatch()
    const { id } = useParams()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const [errors, setErrors] = useState([])
    const [body, setBody] = useState("")

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

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
            dispatch(getAllComments(id))
            setBody("")
            history.push(`/post/${id}`)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    id='comment-textarea'
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    autoComplete="off"
                    placeholder="Add a comment..."
                    required={true}
                />
            <button id='comment-post-button' type="submit"><i id='send-comment' className="far fa-paper-plane"></i></button>
            </form>
        </div>
    )
}

export default CommentForm
