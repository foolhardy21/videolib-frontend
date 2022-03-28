export function signupFormReducer(state, action) {

    switch (action.type) {

        case 'INIT_FORM': return {
            ...state,
            email: {
                ...state.email,
                value: ''
            },
            firstName: {
                ...state.firstName,
                value: ''
            },
            lastName: {
                ...state.lastName,
                value: ''
            },
            password: {
                ...state.password,
                value: ''
            },
            confirmedPassword: {
                ...state.confirmedPassword,
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
        case 'UPDATE_FIRST_NAME': return {
            ...state, firstName: {
                ...state.firstName,
                value: action.payload
            }
        }
        case 'UPDATE_LAST_NAME': return {
            ...state, lastName: {
                ...state.lastName,
                value: action.payload
            }
        }
        case 'UPDATE_PASSWORD': return {
            ...state, password: {
                ...state.password,
                value: action.payload
            }
        }
        case 'UPDATE_CONFIRMED_PASSWORD': return {
            ...state, confirmedPassword: {
                ...state.confirmedPassword,
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
        case 'SET_FIRST_NAME_ERROR': return {
            ...state, firstName: {
                ...state.firstName,
                error: true
            }
        }
        case 'REMOVE_FIRST_NAME_ERROR': return {
            ...state, firstName: {
                ...state.firstName,
                error: false
            }
        }
        case 'SET_LAST_NAME_ERROR': return {
            ...state, lastName: {
                ...state.lastName,
                error: true
            }
        }
        case 'REMOVE_LAST_NAME_ERROR': return {
            ...state, lastName: {
                ...state.lastName,
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
        case 'SET_CONFIRMED_PASSWORD_ERROR': return {
            ...state, confirmedPassword: {
                ...state.confirmedPassword,
                error: true
            }
        }
        case 'REMOVE_CONFIRMED_PASSWORD_ERROR': return {
            ...state, confirmedPassword: {
                ...state.confirmedPassword,
                error: false
            }
        }

        default: return state
    }
}