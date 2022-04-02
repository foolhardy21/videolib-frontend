import { SignupHeader, SignupCard } from '../components/Signup'
import { Main, Alert } from '../components/Reusable'
import { useTheme, useSignup } from '../contexts'
import { useTitle } from '../hooks/useTitle'
import { getBgColor } from '../utils'
import { ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS } from '../utils/constants.util'

const Signup = () => {
    useTitle('Signup')
    const { theme } = useTheme()
    const { signupAlert } = useSignup()

    return (

        <div style={{
            minHeight: '100vh',
        }}
            className={getBgColor(theme)}
        >

            <SignupHeader />

            <div className='flx flx-center'>
                {
                    signupAlert.type === ALERT_TYPE_SUCCESS
                        ? <Alert classes='bg-success'>{signupAlert.message}</Alert>
                        : signupAlert.type === ALERT_TYPE_ERROR ? <Alert classes='bg-err'>{signupAlert.message}</Alert>
                            : ''
                }
            </div>

            <Main classes='flx flx-maj-even'>

                <SignupCard />

            </Main>

        </div>
    )
}

export default Signup
