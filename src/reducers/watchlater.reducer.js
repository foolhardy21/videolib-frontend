export function watchlaterReducer(state, action) {

    switch (action.type) {

        case 'SET_LOADING': return { ...state, loading: true }

        case 'REMOVE_LOADING': return { ...state, loading: false }

        case 'INIT_WATCHLATER': return { ...state, watchlaterVideos: action.payload }

        case 'ADD_TO_WATCHLATER': return { ...state, watchlaterVideos: state.watchlaterVideos.concat(action.payload) }

        case 'REMOVE_FROM_WATCHLATER': return { ...state, watchlaterVideos: state.watchlaterVideos.filter(video => video._id !== action.payload) }

        default: return state

    }

}