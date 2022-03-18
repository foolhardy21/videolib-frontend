import { LoginForm } from './'
import { Card, Text, Button, Icon } from '../Reusable'
import { useTheme } from '../../contexts'
import { getBorderColor, getTextColor } from '../../utils'
import { Link } from 'react-router-dom'

const LoginCard = () => {
    const { theme } = useTheme()

    return (
        <Card classes='flx flx-column flx-center pd-lg'>

            <Text text='login' classes='txt-cap txt-lg'>
                login
            </Text>

            <LoginForm />

            <Link to='/signup'>
                <Button text='create new account' classes={`${getTextColor(theme)} ${getBorderColor(theme)} btn-outlined txt-md txt-cap b-solid flx flx-center pd-xs mg-top-xs`}>
                    create a new account
                    <Icon>
                        chevron_right
                    </Icon>

                </Button>
            </Link>

        </Card>
    )
}

export default LoginCard