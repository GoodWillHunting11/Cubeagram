const ADD_COMMENT = 'comments/ADD'
const LOAD_COMMENTS = 'comments/LOAD'
const EDIT_COMMENT = 'comments/EDIT'
const DELETE_COMMENT = 'comments/DELETE'

export const addComment = payload => {
    return {
        type: ADD_COMMENT,
        payload
    }
}

export const loadComments = payload => {
    return {
        type: LOAD_COMMENTS,
        payload
    }
}

export const editComment = payload => {
    return {
        type: EDIT_COMMENT,
        payload
    }
}

export const removeComment = payload => {
    return {
        type: DELETE_COMMENT,
        payload
    }
}

export const deleteComment = id => async dispatch => {

    const response = await fetch(`/api/comments/${id}`, {
        method:'DELETE'
    })

    if (response.ok) {
        const deleteMessage = await response.json()
        dispatch(removeComment(deleteMessage))
        return deleteMessage
    }
}

export const editComments = (payload) => async dispatch => {
    const response = await fetch(`/api/comments/${payload.commentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({"body": payload.body})
    })

    if(response.ok) {
        const editedComment = await response.json()
        dispatch(editComment(editedComment))
        return editedComment
    } else {
        const data = await response.json()
        if (data.errors) {
            return { 'errors': data.errors };
        } else {
            return { 'errors': 'Something went wrong. Please try again.'}
        }
    }
}

export const getAllComments = (postId) => async dispatch => {

    const response = await fetch (`/api/posts/${postId}/comments`)


    if (response.ok) {
        const comments = await response.json()

        dispatch(loadComments(comments))
        return comments
    }
}

export const newComment = (payload) => async dispatch => {

    const response = await fetch(`/api/comments/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const newComment = await response.json()

        dispatch(addComment(newComment))
        return newComment
    } else {
        const data = await response.json()
        if (data.errors) {
            return { 'errors': data.errors };
        } else {
            return { 'errors': 'Something went wrong. Please try again.'}
        }
    }
}

const initialState = { entries: [] }

const commentReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD_COMMENTS:
            return { ...state, entries: [...action.payload.comments]}
        case ADD_COMMENT:
            newState = { ...state }
            return { ...newState }
        case EDIT_COMMENT:
            newState = { ...state }
            return { ...newState}
        case DELETE_COMMENT:
            newState = {...state}
            delete newState[action.payload]
            return newState
        default:
            return state;
    }
}

export default commentReducer
