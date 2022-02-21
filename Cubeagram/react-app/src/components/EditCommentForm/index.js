import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from 'react-router-dom';
import { editComments } from "../../store/comment";
import { deletePost, getAllPosts } from "../../store/post";
import { getAllUsers } from "../../store/user";

function EditCommentForm({comment}) {
    console.log('passed in comment', comment)
    const params = useParams()
    const commentIdParam =  parseInt(params.id, 10)
    console.log('commentIdParam', commentIdParam)
    const dispatch = useDispatch()
    const history = useHistory()
    // console.log("comment id", id)
    // const comments = useSelector(state => state.commentReducer.entries)
    // const currentComment = comments.find(comment => comment.id === commentIdParam)
    // console.log('current comment', currentComment)

    if (comment) {
        localStorage.setItem('commentBody', comment?.body)
        localStorage.setItem('commentId', comment?.id)
    }

    const [setErrors] = useState([])
    const [body, setBody] = useState(localStorage.getItem('commentBody'))
    const [commentId] = useState(localStorage.getItem("commentId"))

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            body,
            commentId
        }
        console.log('payload', payload)
        const edit_comment = await dispatch(editComments(payload))

        if (edit_comment?.errors) {
            setErrors(edit_comment?.errors)
        }
        else if (!edit_comment?.errors) {
            history.push(`/post/${comment?.postId}`)
        }

        localStorage.clear()
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label id='caption-label-edit' htmlFor="body">Comment</label>
                    <textarea
                        id='caption-input-edit'
                        value={body}
                        onChange={e => setBody(e.target.value)}
                        autoComplete="off"
                        placeholder="Comment"
                    />
                <button id='edit-button' type='submit'>Edit Post</button>
            </form>
        </div>
    )
}

export default EditCommentForm
