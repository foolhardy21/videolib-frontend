import { createContext, useContext, useState, useReducer } from "react";
import { arePasswordAndConfirmedPasswordDiff, isEmailInvalid, isNameInvalid, isPasswordInvalid } from "../utils";
import { signupFormReducer } from "../reducers";
import { ACTION_REMOVE_CONFIRMED_PASSWORD_ERROR, ACTION_REMOVE_EMAIL_ERROR, ACTION_REMOVE_FIRST_NAME_ERROR, ACTION_REMOVE_LAST_NAME_ERROR, ACTION_REMOVE_PASSWORD_ERROR, ACTION_SET_CONFIRMED_PASSWORD_ERROR, ACTION_SET_EMAIL_ERROR, ACTION_SET_FIRST_NAME_ERROR, ACTION_SET_LAST_NAME_ERROR, ACTION_SET_PASSWORD_ERROR, ALERT_DISPLAY_TIME, INPUT_ERROR_TIME } from "../utils/constants.util";

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

    /*
        * this function validates if the input values in signup form
        * @return {boolean} validationError    
    */
    function isFormInvalid() {
        let validationError = false

        if (isEmailInvalid(signupFormState.email.value)) {
            validationError = true
            signupFormDispatch({ type: ACTION_SET_EMAIL_ERROR })
            setTimeout(() => signupFormDispatch({ type: ACTION_REMOVE_EMAIL_ERROR }), INPUT_ERROR_TIME)
        }
        if (isNameInvalid(signupFormState.firstName.value)) {
            validationError = true
            signupFormDispatch({ type: ACTION_SET_FIRST_NAME_ERROR })
            setTimeout(() => signupFormDispatch({ type: ACTION_REMOVE_FIRST_NAME_ERROR }), INPUT_ERROR_TIME)
        }
        if (isNameInvalid(signupFormState.lastName.value)) {
            validationError = true
            signupFormDispatch({ type: ACTION_SET_LAST_NAME_ERROR })
            setTimeout(() => signupFormDispatch({ type: ACTION_REMOVE_LAST_NAME_ERROR }), INPUT_ERROR_TIME)
        }
        if (isPasswordInvalid(signupFormState.password.value)) {
            validationError = true
            signupFormDispatch({ type: ACTION_SET_PASSWORD_ERROR })
            setTimeout(() => signupFormDispatch({ type: ACTION_REMOVE_PASSWORD_ERROR }), INPUT_ERROR_TIME)
        }
        if (arePasswordAndConfirmedPasswordDiff(signupFormState.password.value, signupFormState.confirmedPassword.value)) {
            validationError = true
            signupFormDispatch({ type: ACTION_SET_CONFIRMED_PASSWORD_ERROR })
            setTimeout(() => signupFormDispatch({ type: ACTION_REMOVE_CONFIRMED_PASSWORD_ERROR }), INPUT_ERROR_TIME)
        }
        return validationError
    }

    /*
        * this function shows alert on signup page
        * @param {string} message - message to be displayed
        * @param {string} type - type of alert(success/error)    
    */
    function showSignupAlert(message, type) {
        setSignupAlert({
            message,
            type
        })
        setTimeout(() => setSignupAlert({
            message: '',
            type: ''
        }), ALERT_DISPLAY_TIME)
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