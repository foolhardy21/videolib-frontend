import { ACTION_ADD_CATEGORY_TO_FILTER, ACTION_REMOVE_CATEGORY_FROM_FILTER } from "utils/constants.util"

export function filterReducer(state, { type, payload }) {

    switch (type) {

        case ACTION_ADD_CATEGORY_TO_FILTER: return state.concat(payload)

        case ACTION_REMOVE_CATEGORY_FROM_FILTER: return state.filter(category => category !== payload)

        default: return state
    }
}
