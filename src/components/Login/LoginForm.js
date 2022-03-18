import { useState } from "react"
import axios from "axios"
import { Form, Text, Button, Input, Label } from "../Reusable"
import { emailIsInvalid, passIsInvalid, getSolidBtnBgColor, getSolidBtnTextColor } from "../../utils"
import { useNotification, useTheme } from '../../contexts'

const LoginForm = () => {
    const [enteredInfo, setEnteredInfo] = useState({
        email: '',
        password: '',
    })
    const [inputError, setInputError] = useState({
        email: false,
        password: false,
    })
    const [passType, setPassType] = useState('password')
    const { theme } = useTheme()
    const { setNotification } = useNotification()

    function togglePassType() {
        passType === 'password' ? setPassType('text') : setPassType('password')
    }

    function updateEmail(e) {
        setEnteredInfo(i => ({ ...i, email: e.target.value }))
    }
    function updatePassword(e) {
        setEnteredInfo(i => ({ ...i, password: e.target.value }))
    }

    function validateEnteredInfo() {
        let validationError = false

        if (emailIsInvalid(enteredInfo.email)) {
            validationError = true
            setInputError((e) => ({ ...e, email: true }))
            setTimeout(() => {
                setInputError((e) => ({ ...e, email: false }))
            }, 3000)
        }

        if (passIsInvalid(enteredInfo.password)) {
            validationError = true
            setInputError((e) => ({ ...e, password: true }))
            setTimeout(() => {
                setInputError((e) => ({ ...e, password: false }))
            }, 3000)
        }

        return validationError
    }

    async function logInUser() {
        try {
            const response = await axios.post('/api/auth/login', {
                email: enteredInfo.email,
                password: enteredInfo.password,
            })
            window.localStorage.setItem('userToken', response.data.encodedToken)
            setNotification('logged in successfully.')
            setTimeout(() => setNotification(''), 3000)
            // route to products page in above timeout function
        } catch (e) {
            setNotification('email is not registered.')
            setTimeout(() => setNotification(''), 3000)
            console.log(e)
        }
    }

    function handleLoginSubmit(e) {

        e.preventDefault()

        if (!validateEnteredInfo()) {
            //send api reuqest
            logInUser()
        } else {

            console.log('not fine')
        }

    }

    return (
        <Form>

            <Input type='email' placeholder='enter email here' value={enteredInfo.email} onChange={(e) => updateEmail(e)}
                classes={`${inputError.email && 'input-err'} input-lg txt-md pd-xs mg-top-s`} />
            {
                inputError.email &&
                <Text classes='txt-md txt-err txt-cap mg-left-xs mg-top-xs'>
                    entered email is not valid.
                </Text>
            }

            <Input type={passType} placeholder='enter password here' value={enteredInfo.password} onChange={(e) => updatePassword(e)}
                classes={`${inputError.password && 'input-err'} input-lg txt-md pd-xs mg-top-s`} />
            {
                inputError.password &&
                <Text classes='txt-md txt-err txt-cap mg-left-xs mg-top-xs' >entered password is not valid.</Text>
            }

            <div className='flx flx-maj-end flx-min-center mg-top-s mg-btm-s'>

                <div className='flx flx-min-center'>

                    <Input type='checkbox' id='toggle-pass' />

                    <Label for='toggle-pass' onClick={togglePassType} classes='txt-cap txt-md mg-left-xs'>
                        show password
                    </Label>

                </div>

            </div>

            <Button onClick={handleLoginSubmit} classes={`btn-solid ${getSolidBtnTextColor(theme)} ${getSolidBtnBgColor(theme)} txt-md txt-ucase pd-xs`}>
                log in
            </Button>

        </Form>
    )
}

export default LoginForm