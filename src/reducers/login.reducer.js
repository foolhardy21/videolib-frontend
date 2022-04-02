import { ACTION_INIT_FORM, ACTION_REMOVE_EMAIL_ERROR, ACTION_REMOVE_PASSWORD_ERROR, ACTION_SET_EMAIL_ERROR, ACTION_SET_PASSWORD_ERROR, ACTION_TOGGLE_PASSWORD_TYPE, ACTION_UPDATE_EMAIL, ACTION_UPDATE_PASSWORD } from "../utils/constants.util"

export function loginFormReducer(state, { type, action }) {

    switch (type) {

        case ACTION_INIT_FORM: return {
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
        case ACTION_UPDATE_EMAIL: return {
            ...state, email: {
                ...state.email,
                value: payload
            }
        }
        case ACTION_UPDATE_PASSWORD: return {
            ...state, password: {
                ...state.password,
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

        default: return state
    }
}