export function filterReducer(state, action) {

    switch (action.type) {

        case 'ADD_CATEGORY': return state.concat(action.payload)

        case 'REMOVE_CATEGORY': return state.filter(category => category !== action.payload)

        default: return state
    }
}
