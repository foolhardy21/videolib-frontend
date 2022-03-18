import { SignupHeader, SignupCard } from '../components/Signup'
import { getBgColor } from '../utils'
import { Icon, Main, Text } from '../components/Reusable'
import { useNotification, useTheme } from '../contexts'

const Signup = () => {
    const { theme } = useTheme()
    const { notification } = useNotification()

    return (

        <div style={{
            minHeight: '100vh',
        }}
            className={getBgColor(theme)}
        >

            <SignupHeader />

            <div className='flx flx-center'>
                {
                    notification === 'signed up successfully.' &&
                    <div className='flx flx-maj-start flx-min-center txt-md txt-primary bg-success alert-size-s pd-xs'>
                        <Icon classes='icon-primary mg-right-s'>
                            check_circle
                        </Icon>
                        <Text classes='txt-md txt-cap'>{notification}</Text>
                    </div>
                }

                {
                    notification === 'user already exist. proceed to login.' &&
                    <div className='flx flx-maj-start flx-min-center txt-md txt-primary bg-err alert-size-s pd-xs'>
                        <Icon classes='icon-primary mg-right-s'>
                            error
                        </Icon>
                        <Text classes='txt-md txt-cap'>{notification}</Text>
                    </div>
                }
            </div>

            <Main classes='flx flx-maj-even'>

                <SignupCard />

            </Main>

        </div>
    )
}

export default Signup