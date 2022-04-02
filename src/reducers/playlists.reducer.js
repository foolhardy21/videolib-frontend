import { ACTION_INIT_PLAYLISTS, ACTION_SET_ALERT, ACTION_REMOVE_ALERT, ACTION_SET_LOADING, ACTION_REMOVE_LOADING, ACTION_ADD_NEW_PLAYLIST, ACTION_REMOVE_PLAYLIST, ACTION_ADD_VIDEO_TO_PLAYLIST, ACTION_REMOVE_VIDEO_FROM_PLAYLIST } from '../utils/constants.util'

export function playlistsReducer(state, action) {

    switch (action.type) {

        case ACTION_INIT_PLAYLISTS: return { ...state, playlists: action.payload }

        case ACTION_SET_ALERT: return {
            ...state, alert: {
                message: action.payload.message,
                type: action.payload.type
            }
        }

        case ACTION_REMOVE_ALERT: return {
            ...state, alert: {
                message: '',
                type: ''
            }
        }

        case ACTION_SET_LOADING: return { ...state, loading: true }

        case ACTION_REMOVE_LOADING: return { ...state, loading: false }

        case ACTION_ADD_NEW_PLAYLIST: return { ...state, playlists: state.playlists.concat({ ...action.payload }).reverse() }

        case ACTION_REMOVE_PLAYLIST: return { ...state, playlists: state.playlists.filter(playlist => playlist._id !== action.payload) }

        case ACTION_ADD_VIDEO_TO_PLAYLIST: return { ...state, playlists: state.playlists.map(playlist => playlist._id === action.payload.playlistId ? ({ ...playlist, videos: playlist.videos.concat(action.payload.video) }) : playlist) }

        case ACTION_REMOVE_VIDEO_FROM_PLAYLIST: return { ...state, playlists: state.playlists.map(playlist => playlist._id === action.payload.playlistId ? ({ ...playlist, videos: playlist.videos.filter(video => video._id !== action.payload.videoId) }) : playlist) }

        default: return state

    }
}