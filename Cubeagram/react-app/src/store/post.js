const LOAD_POSTS = 'posts/LOAD'
const ADD_POST = 'posts/ADD'
const EDIT_POST = 'posts/EDIT'
const DELETE_POST = 'posts/DELETE'

export const loadPosts = payload => {
    return {
        type: LOAD_POSTS,
        payload
    }
}

export const addPost = payload => {
    return {
        type: ADD_POST,
        payload
    }
}

export const editpost = payload => {
    return {
        type: EDIT_POST,
        payload
    }
}

export const removePost = payload => {
    return {
        type: DELETE_POST,
        payload
    }
}


export const deletePost = id => async dispatch => {

    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const deleteMessage = await response.json()
        console.log('delete message',deleteMessage)
        dispatch(removePost(deleteMessage))
        return deleteMessage
    }
}

export const editPost = (payload) => async dispatch => {
    console.log('payload', payload.body)
    const response = await fetch(`/api/posts/${payload.postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({"body": payload.body})
    })
    console.log('edit response', response)

    if(response.ok) {
        const editedPost = await response.json()
        console.log("edited post", editedPost)
        dispatch(editPost(editedPost))
        return editedPost
    } else {
        const data = await response.json()
        if (data.errors) {
            return { 'errors': data.errors };
        } else {
            return { 'errors': 'Something went wrong. Please try again.'}
        }
    }
}

export const newPost = (payload) => async dispatch => {

    const response = await fetch(`/api/posts/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const newPost = await response.json()

        dispatch(addPost(newPost))
        return newPost
    } else {
        const data = await response.json()
        if (data.errors) {
            return { 'errors': data.errors };
        } else {
            return { 'errors': 'Something went wrong. Please try again.'}
        }
    }
}

export const getAllPosts = () => async dispatch => {

    const response = await fetch (`/api/posts/`)
    console.log('response', response)

    if (response.ok) {
        const posts = await response.json()

        dispatch(loadPosts(posts))
        return posts
    }
}


const initialState = { entries: [] }

const postReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD_POSTS:
            return { ...state, entries: [...action.payload.posts]}
        case ADD_POST:
            newState = { ...state }
            return { ...newState }
        case EDIT_POST:
            newState = { ...state }
            return { ...newState}
        case DELETE_POST:
            newState = {...state}
            delete newState[action.payload]
            return newState
        default:
            return state;
    }
}

export default postReducer
