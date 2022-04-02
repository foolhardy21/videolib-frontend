import { createContext, useContext, useState, useReducer } from "react";
import { arePasswordAndConfirmedPasswordDiff, isEmailInvalid, isNameInvalid, isPasswordInvalid } from "../utils";
import { signupFormReducer } from "../reducers";

const SignupContext = createContext()

export const SignupProvider = ({ children }) => {
    const initialSignupFormValues = {
        email: {
            value: '',
            error: false
        },
        firstName: {
            value: '',
            error: false
        },
        lastName: {
            value: '',
            error: false
        },
        password: {
            value: '',
            error: false
        },
        confirmedPassword: {
            value: '',
            error: false
        },
        passwordInputType: 'password',
    }
    const [signupFormState, signupFormDispatch] = useReducer(signupFormReducer, initialSignupFormValues)
    const [signupAlert, setSignupAlert] = useState(
        {
            type: '',
            message: ''
        }
    )

    function isFormInvalid() {
        let validationError = false

        if (isEmailInvalid(signupFormState.email.value)) {
            validationError = true
            signupFormDispatch({ type: 'SET_EMAIL_ERROR' })
            setTimeout(() => signupFormDispatch({ type: 'REMOVE_EMAIL_ERROR' }), 3000)
        }
        if (isNameInvalid(signupFormState.firstName.value)) {
            validationError = true
            signupFormDispatch({ type: 'SET_FIRST_NAME_ERROR' })
            setTimeout(() => signupFormDispatch({ type: 'REMOVE_FIRST_NAME_ERROR' }), 3000)
        }
        if (isNameInvalid(signupFormState.lastName.value)) {
            validationError = true
            signupFormDispatch({ type: 'SET_LAST_NAME_ERROR' })
            setTimeout(() => signupFormDispatch({ type: 'REMOVE_LAST_NAME_ERROR' }), 3000)
        }
        if (isPasswordInvalid(signupFormState.password.value)) {
            validationError = true
            signupFormDispatch({ type: 'SET_PASSWORD_ERROR' })
            setTimeout(() => signupFormDispatch({ type: 'REMOVE_PASSWORD_ERROR' }), 3000)
        }
        if (arePasswordAndConfirmedPasswordDiff(signupFormState.password.value, signupFormState.confirmedPassword.value)) {
            validationError = true
            signupFormDispatch({ type: 'SET_CONFIRMED_PASSWORD_ERROR' })
            setTimeout(() => signupFormDispatch({ type: 'REMOVE_CONFIRMED_PASSWORD_ERROR' }), 3000)
        }
        return validationError
    }

    function showSignupAlert(message, type) {
        setSignupAlert({
            message,
            type
        })
        setTimeout(() => setSignupAlert({
            message: '',
            type: ''
        }), 1500)
    }

    return (
        <SignupContext.Provider
            value={{
                signupFormState,
                signupFormDispatch,
                isFormInvalid,
                signupAlert,
                showSignupAlert,
            }}
        >
            {children}
        </SignupContext.Provider>
    )
}

export const useSignup = () => useContext(SignupContext)