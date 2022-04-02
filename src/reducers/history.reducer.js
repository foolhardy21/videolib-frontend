export function historyReducer(state, action) {

    switch (action.type) {

        case 'INIT_HISTORY': return { ...state, history: action.payload }

        case 'SET_LOADING': return { ...state, loading: true }

        case 'REMOVE_LOADING': return { ...state, loading: false }

        case 'REMOVE_FROM_HISTORY': return { ...state, history: state.history.filter(video => video._id !== action.payload) }

        case 'REMOVE_HISTORY': return { ...state, history: [] }

        default: return state

    }
}