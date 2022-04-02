import { ACTION_INIT_HISTORY, ACTION_REMOVE_FROM_HISTORY, ACTION_REMOVE_HISTORY, ACTION_REMOVE_LOADING, ACTION_SET_LOADING } from "../utils/constants.util"

export function historyReducer(state, { type, payload }) {

    switch (type) {

        case ACTION_INIT_HISTORY: return { ...state, history: payload }

        case ACTION_SET_LOADING: return { ...state, loading: true }

        case ACTION_REMOVE_LOADING: return { ...state, loading: false }

        case ACTION_REMOVE_FROM_HISTORY: return { ...state, history: state.history.filter(video => video._id !== payload) }

        case ACTION_REMOVE_HISTORY: return { ...state, history: [] }

        default: return state

    }
}