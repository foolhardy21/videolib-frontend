import { createContext, useContext, useState, useReducer } from "react";
import { isEmailInvalid, isPasswordInvalid } from "../utils";
import { loginFormReducer } from "../reducers/login.reducer";
import { ACTION_REMOVE_EMAIL_ERROR, ACTION_REMOVE_PASSWORD_ERROR, ACTION_SET_EMAIL_ERROR, ACTION_SET_PASSWORD_ERROR, ALERT_DISPLAY_TIME, INPUT_ERROR_TIME } from '../utils/constants.util'

const LoginContext = createContext()

export const LoginProvider = ({ children }) => {
    const initialLoginFormValues = {
        email: {
            value: '',
            error: false
        },
        password: {
            value: '',
            error: false
        },
        passwordInputType: 'password',
    }
    const [loginFormState, loginFormDispatch] = useReducer(loginFormReducer, initialLoginFormValues)
    const [loginAlert, setLoginAlert] = useState({
        type: '',
        message: ''
    })

    function isFormInvalid() {
        let validationError = false

        if (isEmailInvalid(loginFormState.email.value)) {
            validationError = true
            loginFormDispatch({ type: ACTION_SET_EMAIL_ERROR })
            setTimeout(() => loginFormDispatch({ type: ACTION_REMOVE_EMAIL_ERROR }), INPUT_ERROR_TIME)
        }
        if (isPasswordInvalid(loginFormState.password.value)) {
            validationError = true
            loginFormDispatch({ type: ACTION_SET_PASSWORD_ERROR })
            setTimeout(() => loginFormDispatch({ type: ACTION_REMOVE_PASSWORD_ERROR }), INPUT_ERROR_TIME)
        }
        return validationError
    }

    function showLoginAlert(message, type) {
        setLoginAlert({
            message,
            type
        })
        setTimeout(() => setLoginAlert({
            message: '',
            type: ''
        }), ALERT_DISPLAY_TIME)
    }

    return (
        <LoginContext.Provider
            value={{
                loginFormState,
                loginFormDispatch,
                isFormInvalid,
                loginAlert,
                showLoginAlert,
            }}
        >
            {children}
        </LoginContext.Provider>
    )
}

export const useLogin = () => useContext(LoginContext)