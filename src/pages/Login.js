import { LoginHeader, LoginCard } from '../components/Login'
import { Main, Alert } from '../components/Reusable'
import { useLogin, useTheme } from "../contexts"
import { getBgColor } from "../utils"
import { ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS } from '../utils/constants.util'

const Login = () => {
    const { theme } = useTheme()
    const { loginAlert } = useLogin()

    return (
        <div style={{
            minHeight: '100vh',
        }} className={`${getBgColor(theme)}`}>

            <LoginHeader />

            <div className='flx flx-center'>
                {
                    loginAlert.type === ALERT_TYPE_ERROR
                        ? <Alert classes='bg-err'>{loginAlert.message}</Alert>
                        : loginAlert.type === ALERT_TYPE_SUCCESS ? <Alert classes='bg-success'>{loginAlert.message}</Alert>
                            : ''
                }
            </div>

            <Main classes='flx flx-maj-even mg-top-xxlg'>

                <LoginCard />

            </Main>
        </div>
    );
}

export default Login;
