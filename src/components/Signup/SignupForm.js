import { useNavigate } from "react-router-dom"
import { Form, Input, Label, Button, Text } from "components/Reusable"
import { getSolidBtnTextColor, getSolidBtnBgColor } from "utils"
import { useTheme, useSignup, useAuth } from 'contexts'
import { ACTION_INIT_FORM, ACTION_TOGGLE_PASSWORD_TYPE, ACTION_UPDATE_CONFIRMED_PASSWORD, ACTION_UPDATE_EMAIL, ACTION_UPDATE_FIRST_NAME, ACTION_UPDATE_LAST_NAME, ACTION_UPDATE_PASSWORD, ALERT_DISPLAY_TIME, ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS } from "utils/constants.util"

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
                showSignupAlert('account created', ALERT_TYPE_SUCCESS)
                signupFormDispatch({ type: ACTION_INIT_FORM })
                setTimeout(() => navigate('/login'), ALERT_DISPLAY_TIME + 100)
            } else if (signupUserResponse === 422) {
                showSignupAlert('account already exists', ALERT_TYPE_ERROR)
            }
        }
    }

    return (

        <Form>

            <Input type='email' placeholder="email" value={signupFormState.email.value} onChange={(e) => signupFormDispatch({ type: ACTION_UPDATE_EMAIL, payload: e.target.value })} classes={`${signupFormState.email.error && 'input-err'} input-lg txt-md pd-xs mg-top-s`} />
            {
                signupFormState.email.error && <Text classes="txt-md txt-cap txt-err mg-top-xs mg-left-xs">email is invalid</Text>
            }

            <Input type='text' placeholder="first name" value={signupFormState.firstName.value} onChange={(e) => signupFormDispatch({ type: ACTION_UPDATE_FIRST_NAME, payload: e.target.value })}
                classes={`${signupFormState.firstName.error && 'input-err'} input-lg txt-md pd-xs mg-top-s`} />
            {
                signupFormState.firstName.error && <Text classes="txt-md txt-err txt-cap mg-top-xs mg-left-xs">first name is invalid</Text>
            }

            <Input type='text' placeholder="last name" value={signupFormState.lastName.value} onChange={(e) => signupFormDispatch({ type: ACTION_UPDATE_LAST_NAME, payload: e.target.value })}
                classes={`${signupFormState.lastName.error && 'input-err'} input-lg txt-md pd-xs mg-top-s`} />
            {
                signupFormState.lastName.error && <span className="txt-md txt-err txt-cap mg-left-xs mg-top-xs">last name is invalid</span>
            }

            <Input type={signupFormState.passwordInputType} placeholder="password" value={signupFormState.password.value} onChange={(e) => signupFormDispatch({ type: ACTION_UPDATE_PASSWORD, payload: e.target.value })}
                classes={`${signupFormState.password.error && 'input-err'} input-lg txt-md pd-xs mg-top-s`} />
            {
                signupFormState.password.error && <Text classes="txt-md txt-err txt-cap mg-left-xs mg-top-xs">password must be alphanumeric {<br />} with special characters</Text>
            }

            <Input type={signupFormState.passwordInputType} placeholder="confirm password" value={signupFormState.confirmedPassword.value} onChange={(e) => signupFormDispatch({ type: ACTION_UPDATE_CONFIRMED_PASSWORD, payload: e.target.value })}
                classes={`${signupFormState.confirmedPassword.error && 'input-err'} input-lg txt-md pd-xs mg-top-s`} />
            {
                signupFormState.confirmedPassword.error && <Text classes="txt-md txt-err txt-cap mg-left-xs mg-top-xs">password is not matching</Text>
            }

            <div className='flx flx-maj-end flx-min-center mg-top-xs mg-btm-md'>

                <Label htmlFor='toggle-pass' classes='txt-cap txt-md'>
                    <Input type='checkbox' id='toggle-pass' onChange={() => signupFormDispatch({ type: ACTION_TOGGLE_PASSWORD_TYPE })} classes='mg-right-xs' />
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
