<<<<<<< HEAD
import { useNavigate } from "react-router-dom"
import { Form, Input, Label, Button, Text } from "../Reusable"
import { getSolidBtnTextColor, getSolidBtnBgColor } from "../../utils"
import { useTheme, useSignup, useAuth } from '../../contexts'

const SignupForm = () => {
    const navigate = useNavigate()
    const { theme } = useTheme()
    const { signupFormState, signupFormDispatch, isFormInvalid, showSignupAlert } = useSignup()
    const { signupUser } = useAuth()

    async function handleSignupSubmit(e) {
        e.preventDefault()

        if (!isFormInvalid()) {
            const signupUserResponse = await signupUser(signupFormState.email.value, signupFormState.password.value, signupFormState.firstName.value, signupFormState.lastName.value)
            if (signupUserResponse === 201) {
                showSignupAlert('account created', 'success')
                signupFormDispatch({ type: 'INIT_FORM' })
                setTimeout(() => navigate('/login'), 1600)
            } else if (signupUserResponse === 422) {
                showSignupAlert('account already exists', 'error')
            }
        }

    }

    return (

        <Form>

            <Input type='email' placeholder="email" value={signupFormState.email.value} onChange={(e) => signupFormDispatch({ type: 'UPDATE_EMAIL', payload: e.target.value })} classes={`${signupFormState.email.error && 'input-err'} input-lg txt-md pd-xs mg-top-s`} />
            {
                signupFormState.email.error && <Text classes="txt-md txt-cap txt-err mg-top-xs mg-left-xs">email is invalid</Text>
            }

            <Input type='text' placeholder="first name" value={signupFormState.firstName.value} onChange={(e) => signupFormDispatch({ type: 'UPDATE_FIRST_NAME', payload: e.target.value })}
                classes={`${signupFormState.firstName.error && 'input-err'} input-lg txt-md pd-xs mg-top-s`} />
            {
                signupFormState.firstName.error && <Text classes="txt-md txt-err txt-cap mg-top-xs mg-left-xs">first name is invalid</Text>
            }

            <Input type='text' placeholder="last name" value={signupFormState.lastName.value} onChange={(e) => signupFormDispatch({ type: 'UPDATE_LAST_NAME', payload: e.target.value })}
                classes={`${signupFormState.lastName.error && 'input-err'} input-lg txt-md pd-xs mg-top-s`} />
            {
                signupFormState.lastName.error && <span className="txt-md txt-err txt-cap mg-left-xs mg-top-xs">last name is invalid</span>
            }

            <Input type={signupFormState.passwordInputType} placeholder="password" value={signupFormState.password.value} onChange={(e) => signupFormDispatch({ type: 'UPDATE_PASSWORD', payload: e.target.value })}
                classes={`${signupFormState.password.error && 'input-err'} input-lg txt-md pd-xs mg-top-s`} />
            {
                signupFormState.password.error && <Text classes="txt-md txt-err txt-cap mg-left-xs mg-top-xs">password must be alphanumeric {<br />} with special characters</Text>
            }

            <Input type={signupFormState.passwordInputType} placeholder="password" value={signupFormState.confirmedPassword.value} onChange={(e) => signupFormDispatch({ type: 'UPDATE_CONFIRMED_PASSWORD', payload: e.target.value })}
                classes={`${signupFormState.confirmedPassword.error && 'input-err'} input-lg txt-md pd-xs mg-top-s`} />
            {
                signupFormState.confirmedPassword.error && <Text classes="txt-md txt-err txt-cap mg-left-xs mg-top-xs">password is not matching</Text>
            }

            <div className='flx flx-maj-end flx-min-center mg-top-xs mg-btm-md'>

                <Label htmlFor='toggle-pass' classes='txt-cap txt-md'>
                    <Input type='checkbox' id='toggle-pass' onChange={() => signupFormDispatch({ type: 'TOGGLE_PASSWORD_TYPE' })} classes='mg-right-xs' />
                    show password
                </Label>

            </div>

            <Button onClick={handleSignupSubmit} classes={`btn-solid ${getSolidBtnBgColor(theme)} ${getSolidBtnTextColor(theme)} txt-md txt-ucase pd-xs`}>
                sign up
            </Button>

        </Form>
    )


}

export default SignupForm
||||||| parent of b2863d1 (style - signup components added)
=======
import axios from "axios"
import { useState } from "react"
import { Form, Input, Label, Button, Text } from "../Reusable"
import { getSolidBtnTextColor, getSolidBtnBgColor, emailIsInvalid, nameIsInvalid, passIsInvalid, passAndConfPassAreDiff } from "../../utils"
import { useNotification, useTheme } from '../../contexts'

const SignupForm = () => {
    const { theme } = useTheme()
    const { setNotification } = useNotification()
    const [enteredInfo, setEnteredInfo] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmedPassword: ''
    })
    const [inputError, setInputError] = useState({
        email: false,
        firstName: false,
        lastName: false,
        password: false,
        confirmedPassword: false,
    })
    const [passInputType, setPassInputType] = useState('password')

    function updateEmail(e) {
        setEnteredInfo((info) => ({ ...info, email: e.target.value }))
    }
    function updateFirstName(e) {
        setEnteredInfo((info) => ({ ...info, firstName: e.target.value }))
    }
    function updateLastName(e) {
        setEnteredInfo((info) => ({ ...info, lastName: e.target.value }))
    }
    function updatePassword(e) {
        setEnteredInfo((info) => ({ ...info, password: e.target.value }))
    }
    function updateConfirmedPassword(e) {
        setEnteredInfo((info) => ({ ...info, confirmedPassword: e.target.value }))
    }

    function validateEnteredInfo() {
        let validationError = false

        if (emailIsInvalid(enteredInfo.email)) {
            validationError = true
            setInputError((e) => ({ ...e, email: true }))
            setTimeout(() => setInputError((e) => ({ ...e, email: false })), 3000)
        }
        if (nameIsInvalid(enteredInfo.firstName)) {
            validationError = true
            setInputError((e) => ({ ...e, firstName: true }))
            setTimeout(() => setInputError((e) => ({ ...e, firstName: false })), 3000)
        }
        if (nameIsInvalid(enteredInfo.lastName)) {
            validationError = true
            setInputError((e) => ({ ...e, lastName: true }))
            setTimeout(() => setInputError((e) => ({ ...e, lastName: false })), 3000)
        }
        if (passIsInvalid(enteredInfo.password)) {
            validationError = true
            setInputError((e) => ({ ...e, password: true }))
            setTimeout(() => setInputError((e) => ({ ...e, password: false })), 3000)
        }
        if (passAndConfPassAreDiff(enteredInfo.password, enteredInfo.confirmedPassword)) {
            validationError = true
            setInputError((e) => ({ ...e, confirmedPassword: true }))
            setTimeout(() => setInputError((e) => ({ ...e, confirmedPassword: false })), 3000)
        }
        return validationError
    }

    async function signUpUser() {
        try {
            await axios.post('/api/auth/signup', {
                email: enteredInfo.email,
                password: enteredInfo.password,
                firstName: enteredInfo.firstName,
                lastName: enteredInfo.lastName,
            })
            setNotification('signed up successfully.')
            setTimeout(() => setNotification(''), 3000)
            // route to login page in the above timeout function
        } catch (e) {
            setNotification('user already exist. proceed to login.')
            setTimeout(() => setNotification(''), 3000)
            console.log(e)
        }
    }
    function handleSignupSubmit(e) {
        e.preventDefault()

        if (!validateEnteredInfo()) {
            signUpUser()
            setEnteredInfo({
                email: '',
                firstName: '',
                lastName: '',
                password: '',
                confirmedPassword: ''
            })
        }

    }

    function togglePassInputType() {
        passInputType === 'password' ? setPassInputType('text') : setPassInputType('password')
    }

    return (

        <Form classes='flx flx-column mg-left-lg mg-right-lg'>

            <Input type='email' placeholder="email" value={enteredInfo.email} onChange={(e) => updateEmail(e)} classes={`${inputError.email && 'input-err'} input-lg txt-md pd-xs mg-top-s`} />
            {
                inputError.email && <Text classes="txt-md txt-cap txt-err mg-top-xs mg-left-xs">email is invalid</Text>
            }

            <Input type='text' placeholder="first name" value={enteredInfo.firstName} onChange={(e) => updateFirstName(e)}
                classes={`${inputError.firstName && 'input-err'} input-lg txt-md pd-xs mg-top-s`} />
            {
                inputError.firstName && <Text classes="txt-md txt-err txt-cap mg-top-xs mg-left-xs">first name is invalid</Text>
            }

            <Input type='text' placeholder="last name" value={enteredInfo.lastName} onChange={(e) => updateLastName(e)}
                classes={`${inputError.lastName && 'input-err'} input-lg txt-md pd-xs mg-top-s`} />
            {
                inputError.lastName && <span className="txt-md txt-err txt-cap mg-left-xs mg-top-xs">last name is invalid</span>
            }

            <Input type={passInputType} placeholder="password" value={enteredInfo.password} onChange={(e) => updatePassword(e)}
                classes={`${inputError.password && 'input-err'} input-lg txt-md pd-xs mg-top-s`} />
            {
                inputError.password && <Text classes="txt-md txt-err txt-cap mg-left-xs mg-top-xs">password must be alphanumeric {<br />} with special characters</Text>
            }

            <Input type={passInputType} placeholder="confirm password" value={enteredInfo.confirmedPassword} onChange={(e) => updateConfirmedPassword(e)}
                classes={`${inputError.confirmedPassword && 'input-err'} input-lg txt-md pd-xs mg-top-s`} />
            {
                inputError.confirmedPassword && <Text classes="txt-md txt-err txt-cap mg-left-xs mg-top-xs">password is not matching</Text>
            }

            <div className='flx flx-maj-end flx-min-center mg-top-xs mg-btm-md'>

                <Label for='toggle-pass' classes='txt-cap txt-md'>
                    <Input type='checkbox' id='toggle-pass' onChange={togglePassInputType} />
                    {' '} show password
                </Label>

            </div>

            <Button onClick={handleSignupSubmit} classes={`btn-solid ${getSolidBtnBgColor(theme)} ${getSolidBtnTextColor(theme)} txt-md txt-ucase pd-xs`}>
                sign up
            </Button>

        </Form>
    )
}

export default SignupForm
>>>>>>> b2863d1 (style - signup components added)
