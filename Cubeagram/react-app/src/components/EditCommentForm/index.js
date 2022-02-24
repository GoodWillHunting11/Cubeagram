import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editComments, getAllComments } from "../../store/comment";
import "../../context/Modal.css"

function EditCommentForm({comment, setShowModal}) {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])
    const [body, setBody] = useState(comment?.body)

    console.log('body comment', body)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            body,
            commentId: comment?.id
        }
        console.log('payload', payload)
        const edit_comment = await dispatch(editComments(payload))

        if (edit_comment?.errors) {
            setErrors(edit_comment?.errors)
        }
        else if (!edit_comment?.errors) {

            dispatch(getAllComments(comment?.postId))
            setShowModal(false)
        }
    }

    return (
        <div className="comment-modal-div">
            <form onSubmit={handleSubmit}>
                <label id='comment-label-edit' htmlFor="body">Edit Comment</label>
                    <textarea
                        id='modal-comment-body'
                        value={body}
                        onChange={e => setBody(e.target.value)}
                        autoComplete="off"
                        placeholder="Comment"
                    />
                    {errors.map(error => (
                        <h5 key={error} id='edit-comment-errors'>{error}</h5>
                    ))}
                <button id='edit-button-modal' type='submit'>Edit</button>
            </form>
        </div>
    )
}

export default EditCommentForm
