export function loginFormReducer(state, action) {

    switch (action.type) {

        case 'INIT_FORM': return {
            ...state,
            email: {
                ...state.email,
                value: ''
            },
            password: {
                ...state.password,
                value: ''
            },
            passwordInputType: 'password'
        }
        case 'UPDATE_EMAIL': return {
            ...state, email: {
                ...state.email,
                value: action.payload
            }
        }
        case 'UPDATE_PASSWORD': return {
            ...state, password: {
                ...state.password,
                value: action.payload
            }
        }
        case 'TOGGLE_PASSWORD_TYPE': return { ...state, passwordInputType: state.passwordInputType === 'password' ? 'text' : 'password' }

        case 'SET_EMAIL_ERROR': return {
            ...state, email: {
                ...state.email,
                error: true
            }
        }
        case 'REMOVE_EMAIL_ERROR': return {
            ...state, email: {
                ...state.email,
                error: false
            }
        }
        case 'SET_PASSWORD_ERROR': return {
            ...state, password: {
                ...state.password,
                error: true
            }
        }
        case 'REMOVE_PASSWORD_ERROR': return {
            ...state, password: {
                ...state.password,
                error: false
            }
        }

        default: return state
    }
}