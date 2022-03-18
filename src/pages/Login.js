import { LoginHeader, LoginCard } from '../components/Login'
import { Main, Icon, Text } from '../components/Reusable'
import { useNotification, useTheme } from "../contexts"
import { getBgColor } from "../utils"

const Login = () => {
    const { theme } = useTheme()
    const { notification } = useNotification()

    return (
        <div style={{
            minHeight: '100vh',
        }} className={`${getBgColor(theme)}`}>

            <LoginHeader />

            <div className='flx flx-center'>
                {
                    notification === 'logged in successfully.' &&
                    <div className='flx flx-maj-start flx-min-center txt-md txt-primary bg-success alert-size-s pd-xs'>
                        <Icon classes='icon-primary mg-right-s'>
                            check_circle
                        </Icon>
                        <Text classes='txt-md txt-cap'>{notification}</Text>
                    </div>
                }
                {
                    notification === 'email is not registered.' &&
                    <div className='flx flx-maj-start flx-min-center txt-md txt-primary bg-err alert-size-s pd-xs'>
                        <Icon classes='icon-primary mg-right-s'>
                            error
                        </Icon>
                        <Text classes='txt-md txt-cap'>{notification}</Text>
                    </div>
                }

            </div>

            <Main classes='flx flx-maj-even mg-top-xxlg'>

                <LoginCard />

            </Main>
        </div>
    );
}

export default Login;
