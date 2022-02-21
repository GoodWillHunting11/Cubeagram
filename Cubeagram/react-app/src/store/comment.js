const ADD_COMMENT = 'comments/ADD'
const LOAD_COMMENTS = 'comments/LOAD'

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

export const getAllComments = (postId) => async dispatch => {

    const response = await fetch (`/api/posts/${postId}/comments`)

    console.log('response', response)

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
        // case EDIT_POST:
        //     newState = { ...state }
        //     return { ...newState}
        // case DELETE_POST:
        //     newState = {...state}
        //     delete newState[action.payload]
        //     return newState
        default:
            return state;
    }
}

export default commentReducer
