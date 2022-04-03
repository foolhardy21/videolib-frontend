import { Link } from 'react-router-dom'
import { SignupForm } from './'
import { Card, Text, Button, Icon } from "components/Reusable"
import { getBorderColor, getTextColor } from "utils"
import { useTheme } from "contexts"

const SignupCard = () => {
    const { theme } = useTheme()

    return (

        <Card classes='flx flx-column flx-center pd-lg mg-top-lg'>

            <Text classes='txt-cap txt-lg'>
                signup
            </Text>

            <SignupForm />

            <Link to='/login'>
                <Button classes={`btn-outlined ${getBorderColor(theme)} ${getTextColor(theme)} b-solid txt-md flx flx-center txt-cap pd-xs mg-top-xs`}>
                    already have an account
                    <Icon>
                        chevron_right
                    </Icon>
                </Button>
            </Link>

        </Card >
    )
}

export default SignupCard