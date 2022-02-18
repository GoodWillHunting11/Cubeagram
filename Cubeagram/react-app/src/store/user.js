const LOAD_USERS = "users/LOAD_ALL"

const loadAll = entries => ({
    type: LOAD_USERS,
    entries
})


export const getAllUsers = () => async dispatch => {
    const response = await fetch(`/api/users/`)

    if (response.ok) {
        const entries = await response.json()
        dispatch(loadAll(entries.users))
    }
}



const initialState = {
    entries: []
}

const userState = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USERS: {
            return {
                ...state,
                entries: [...action.entries]
            }
        }

        default: return state
    }
}

export default userState
