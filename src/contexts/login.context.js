import { createContext, useContext, useState, useReducer } from "react";
import { isEmailInvalid, isPasswordInvalid } from "../utils";
import { loginFormReducer } from "../reducers/login.reducer";

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
            loginFormDispatch({ type: 'SET_EMAIL_ERROR' })
            setTimeout(() => loginFormDispatch({ type: 'REMOVE_EMAIL_ERROR' }), 3000)
        }
        if (isPasswordInvalid(loginFormState.password.value)) {
            validationError = true
            loginFormDispatch({ type: 'SET_PASSWORD_ERROR' })
            setTimeout(() => loginFormDispatch({ type: 'REMOVE_PASSWORD_ERROR' }), 3000)
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
        }), 1500)
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