export function playlistsReducer(state, action) {

    switch (action.type) {

        case 'INIT_PLAYLISTS': return { ...state, playlists: action.payload }

        case 'SET_ALERT': return {
            ...state, alert: {
                message: action.payload.message,
                type: action.payload.type
            }
        }

        case 'REMOVE_ALERT': return {
            ...state, alert: {
                message: '',
                type: ''
            }
        }

        case 'SET_LOADING': return { ...state, loading: true }

        case 'REMOVE_LOADING': return { ...state, loading: false }

        case 'ADD_NEW_PLAYLIST': return { ...state, playlists: state.playlists.concat({ ...action.payload }).reverse() }

        case 'REMOVE_PLAYLIST': return { ...state, playlists: state.playlists.filter(playlist => playlist._id !== action.payload) }

        case 'ADD_VIDEO_TO_PLAYLIST': return { ...state, playlists: state.playlists.map(playlist => playlist._id === action.payload.playlistId ? ({ ...playlist, videos: playlist.videos.concat(action.payload.video) }) : playlist) }

        default: return state

    }
}