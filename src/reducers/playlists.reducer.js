export function playlistsReducer(state, action) {

    switch (action.type) {

        case 'INIT_PLAYLISTS': console.log('init'); return { ...state, playlists: action.payload }

        case 'SET_LOADING': return { ...state, loading: true }

        case 'REMOVE_LOADING': return { ...state, loading: false }

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

        case 'ADD_NEW_PLAYLIST': return { ...state, playlists: state.playlists.concat({ ...action.payload }).reverse() }

        case 'REMOVE_PLAYLIST': return { ...state, playlists: state.playlists.filter(playlist => playlist._id !== action.payload) }

        default: return state

    }
}