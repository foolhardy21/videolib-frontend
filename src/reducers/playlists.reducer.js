import { ACTION_INIT_PLAYLISTS, ACTION_SET_ALERT, ACTION_REMOVE_ALERT, ACTION_SET_LOADING, ACTION_REMOVE_LOADING, ACTION_ADD_NEW_PLAYLIST, ACTION_REMOVE_PLAYLIST, ACTION_ADD_VIDEO_TO_PLAYLIST, ACTION_REMOVE_VIDEO_FROM_PLAYLIST } from 'utils/constants.util'

export function playlistsReducer(state, { type, payload }) {

    switch (type) {

        case ACTION_INIT_PLAYLISTS: return { ...state, playlists: payload }

        case ACTION_SET_ALERT: return {
            ...state, alert: {
                message: payload.message,
                type: payload.type
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

        case ACTION_ADD_NEW_PLAYLIST: return { ...state, playlists: state.playlists.concat({ ...payload }).reverse() }

        case ACTION_REMOVE_PLAYLIST: return { ...state, playlists: state.playlists.filter(playlist => playlist._id !== payload) }

        case ACTION_ADD_VIDEO_TO_PLAYLIST: return { ...state, playlists: state.playlists.map(playlist => playlist._id === payload.playlistId ? ({ ...playlist, videos: playlist.videos.concat(payload.video) }) : playlist) }

        case ACTION_REMOVE_VIDEO_FROM_PLAYLIST: return { ...state, playlists: state.playlists.map(playlist => playlist._id === payload.playlistId ? ({ ...playlist, videos: playlist.videos.filter(video => video._id !== payload.videoId) }) : playlist) }

        default: return state

    }
}