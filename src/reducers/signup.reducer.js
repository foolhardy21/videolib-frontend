import { ACTION_INIT_FORM, ACTION_UPDATE_EMAIL, ACTION_UPDATE_FIRST_NAME, ACTION_UPDATE_LAST_NAME, ACTION_UPDATE_PASSWORD, ACTION_UPDATE_CONFIRMED_PASSWORD, ACTION_TOGGLE_PASSWORD_TYPE, ACTION_SET_EMAIL_ERROR, ACTION_REMOVE_EMAIL_ERROR, ACTION_SET_FIRST_NAME_ERROR, ACTION_REMOVE_FIRST_NAME_ERROR, ACTION_SET_LAST_NAME_ERROR, ACTION_REMOVE_LAST_NAME_ERROR, ACTION_SET_PASSWORD_ERROR, ACTION_REMOVE_PASSWORD_ERROR, ACTION_SET_CONFIRMED_PASSWORD_ERROR, ACTION_REMOVE_CONFIRMED_PASSWORD_ERROR } from '../utils/constants.util'

export function signupFormReducer(state, { type, payload }) {

    switch (type) {

        case ACTION_INIT_FORM: return {
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
        case ACTION_UPDATE_EMAIL: return {
            ...state, email: {
                ...state.email,
                value: payload
            }
        }
        case ACTION_UPDATE_FIRST_NAME: return {
            ...state, firstName: {
                ...state.firstName,
                value: payload
            }
        }
        case ACTION_UPDATE_LAST_NAME: return {
            ...state, lastName: {
                ...state.lastName,
                value: payload
            }
        }
        case ACTION_UPDATE_PASSWORD: return {
            ...state, password: {
                ...state.password,
                value: payload
            }
        }
        case ACTION_UPDATE_CONFIRMED_PASSWORD: return {
            ...state, confirmedPassword: {
                ...state.confirmedPassword,
                value: payload
            }
        }
        case ACTION_TOGGLE_PASSWORD_TYPE: return { ...state, passwordInputType: state.passwordInputType === 'password' ? 'text' : 'password' }

        case ACTION_SET_EMAIL_ERROR: return {
            ...state, email: {
                ...state.email,
                error: true
            }
        }
        case ACTION_REMOVE_EMAIL_ERROR: return {
            ...state, email: {
                ...state.email,
                error: false
            }
        }
        case ACTION_SET_FIRST_NAME_ERROR: return {
            ...state, firstName: {
                ...state.firstName,
                error: true
            }
        }
        case ACTION_REMOVE_FIRST_NAME_ERROR: return {
            ...state, firstName: {
                ...state.firstName,
                error: false
            }
        }
        case ACTION_SET_LAST_NAME_ERROR: return {
            ...state, lastName: {
                ...state.lastName,
                error: true
            }
        }
        case ACTION_REMOVE_LAST_NAME_ERROR: return {
            ...state, lastName: {
                ...state.lastName,
                error: false
            }
        }
        case ACTION_SET_PASSWORD_ERROR: return {
            ...state, password: {
                ...state.password,
                error: true
            }
        }
        case ACTION_REMOVE_PASSWORD_ERROR: return {
            ...state, password: {
                ...state.password,
                error: false
            }
        }
        case ACTION_SET_CONFIRMED_PASSWORD_ERROR: return {
            ...state, confirmedPassword: {
                ...state.confirmedPassword,
                error: true
            }
        }
        case ACTION_REMOVE_CONFIRMED_PASSWORD_ERROR: return {
            ...state, confirmedPassword: {
                ...state.confirmedPassword,
                error: false
            }
        }

        default: return state
    }
}