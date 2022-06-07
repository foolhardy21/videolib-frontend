import { SignupHeader, SignupCard } from 'components/Signup'
import { Main, Alert } from 'components/Reusable'
import { useTheme, useSignup } from 'contexts'
import { useTitle } from 'hooks/useTitle'
import { getBgColor } from 'utils'

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

            {
                signupAlert.message && <Alert type={signupAlert.type}>{signupAlert.message}</Alert>
            }

            <Main classes='flx flx-maj-even'>
                <SignupCard />
            </Main>

        </div>
    )
}

export default Signup
