import { ACTION_SET_LOADING, ACTION_REMOVE_LOADING, ACTION_INIT_WATCHLATER, ACTION_ADD_TO_WATCHLATER, ACTION_REMOVE_FROM_WATCHLATER } from 'utils/constants.util'

export function watchlaterReducer(state, { type, payload }) {

    switch (type) {

        case ACTION_SET_LOADING: return { ...state, loading: true }

        case ACTION_REMOVE_LOADING: return { ...state, loading: false }

        case ACTION_INIT_WATCHLATER: return { ...state, watchlaterVideos: payload }

        case ACTION_ADD_TO_WATCHLATER: return { ...state, watchlaterVideos: state.watchlaterVideos.concat(payload) }

        case ACTION_REMOVE_FROM_WATCHLATER: return { ...state, watchlaterVideos: state.watchlaterVideos.filter(video => video._id !== payload) }

        default: return state

    }

}