import { ACTION_ADD_TO_LIKES, ACTION_INIT_LIKES, ACTION_REMOVE_FROM_LIKES, ACTION_REMOVE_LOADING, ACTION_SET_LOADING } from "utils/constants.util"

export function likesReducer(state, { type, payload }) {

    switch (type) {

        case ACTION_INIT_LIKES: return { ...state, likedVideos: payload }

        case ACTION_SET_LOADING: return { ...state, loading: true }

        case ACTION_REMOVE_LOADING: return { ...state, loading: false }

        case ACTION_ADD_TO_LIKES: return { ...state, likedVideos: state.likedVideos.concat({ ...payload }) }

        case ACTION_REMOVE_FROM_LIKES: return { ...state, likedVideos: state.likedVideos.filter(video => video._id !== payload) }

        default: return state

    }
}