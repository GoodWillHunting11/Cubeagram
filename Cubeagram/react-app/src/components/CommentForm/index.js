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

    // function breakUpLongStrings (comment) {
    //     let count = 0
    //     let newComment = ''
    //     for(let i = 0; i < comment.length; i++){
    //         let char = comment[i]
    //         if(count >= 25) {
    //             let slicedString = comment.slice(0, char)
    //             newComment += slicedString + ' '
    //             count = 0;
    //         }
    //         count++
    //     }
    //     return newComment;
    // }

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
            setBody("")
        }
        else if (!new_comment?.errors) {
            dispatch(getAllComments(id))
            setErrors([])
            setBody("")
            history.push(`/post/${id}`)
        }
    }

    return (
        <div id='div-givin-the-problems'>
            {errors?.map(error => (
                <h5 id='error-for-comments' key={error}>{error}</h5>
            ))}
            <form id='form-messing-me-up' onSubmit={handleSubmit}>
                <textarea
                    id='comment-textarea'
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    autoComplete="off"
                    placeholder="Add a comment..."
                    required={true}
                />
                <button id='comment-post-button' type="submit">Post</button>
            </form>
        </div>
    )
}

export default CommentForm
