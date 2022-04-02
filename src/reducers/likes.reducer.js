export function likesReducer(state, action) {

    switch (action.type) {

        case 'INIT_LIKES': return { ...state, likedVideos: action.payload }

        case 'SET_LOADING': return { ...state, loading: true }

        case 'REMOVE_LOADING': return { ...state, loading: false }

        case 'ADD_TO_LIKES': return { ...state, likedVideos: state.likedVideos.concat({ ...action.payload }) }

        case 'REMOVE_FROM_LIKES': return { ...state, likedVideos: state.likedVideos.filter(video => video._id !== action.payload) }

        default: return state

    }
}