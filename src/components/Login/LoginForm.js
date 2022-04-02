import { useNavigate, useLocation } from "react-router-dom"
import { Form, Text, Button, Input, Label } from "../Reusable"
import { getSolidBtnBgColor, getSolidBtnTextColor } from "../../utils"
import { useLogin, useTheme, useAuth } from '../../contexts'
import { ALERT_DISPLAY_TIME, ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS } from "../../utils/constants.util"

const LoginForm = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { theme } = useTheme()
    const { loginFormState, isFormInvalid, loginFormDispatch, showLoginAlert } = useLogin()
    const { loginUser } = useAuth()
    const from = location.state?.from?.pathname || '/videos'

    async function handleLoginSubmit(e) {
        e.preventDefault()

        if (!isFormInvalid()) {
            const loginUserResponse = await loginUser(loginFormState.email.value, loginFormState.password.value)
            if (loginUserResponse === 404) {
                showLoginAlert('account not found', ALERT_TYPE_ERROR)
            } else if (loginUserResponse === 200) {
                showLoginAlert('logged in', ALERT_TYPE_SUCCESS)
                setTimeout(() => navigate(from, { replace: true }), ALERT_DISPLAY_TIME + 100)
            }
        }
    }

    return (
        <Form>

            <Input type='email' placeholder='enter email here' value={loginFormState.email.value} onChange={(e) => loginFormDispatch({ type: 'UPDATE_EMAIL', payload: e.target.value })}
                classes={`${loginFormState.email.error && 'input-err'} input-lg txt-md pd-xs mg-top-s`} />
            {
                loginFormState.email.error &&
                <Text classes='txt-md txt-err txt-cap mg-left-xs mg-top-xs'>
                    entered email is not valid.
                </Text>
            }

            <Input type={loginFormState.passwordInputType} placeholder='enter password here' value={loginFormState.password.value} onChange={(e) => loginFormDispatch({ type: 'UPDATE_PASSWORD', payload: e.target.value })}
                classes={`${loginFormState.password.error && 'input-err'} input-lg txt-md pd-xs mg-top-s`} />
            {
                loginFormState.password.error &&
                <Text classes='txt-md txt-err txt-cap mg-left-xs mg-top-xs' >entered password is not valid.</Text>
            }

            <div className='flx flx-maj-end flx-min-center mg-top-s mg-btm-s'>

                <Label htmlFor='toggle-pass' classes='txt-cap txt-md flx flx-min-center'>
                    <Input type='checkbox' id='toggle-pass' onChange={() => loginFormDispatch({ type: 'TOGGLE_PASSWORD_TYPE' })} classes='mg-right-xs' />
                    show password
                </Label>

            </div>

            <Button onClick={handleLoginSubmit} classes={`btn-solid ${getSolidBtnTextColor(theme)} ${getSolidBtnBgColor(theme)} txt-md txt-ucase pd-xs`}>
                log in
            </Button>

        </Form>
    )

}

export default LoginForm
