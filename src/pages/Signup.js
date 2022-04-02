import { SignupHeader, SignupCard } from '../components/Signup'
import { Main, Alert } from '../components/Reusable'
import { useTheme, useSignup } from '../contexts'
import { getBgColor } from '../utils'

const Signup = () => {
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
                    signupAlert.type === 'success'
                        ? <Alert classes='bg-success'>{signupAlert.message}</Alert>
                        : signupAlert.type === 'error' ? <Alert classes='bg-err'>{signupAlert.message}</Alert>
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
