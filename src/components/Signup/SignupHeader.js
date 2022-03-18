import { useState } from 'react'
import { Header, Text, NavBar, Icon, Button } from '../Reusable'
import { getTextColor, getBgColor, getIconColor } from '../../utils'
import { useTheme } from '../../contexts'
import { Link } from 'react-router-dom'

const SignupHeader = () => {
    const { theme, toggleTheme } = useTheme()
    const [isSmallNavVisible, setIsSmallNavVisible] = useState(false)

    function toggleNavVisibility() {
        setIsSmallNavVisible(!isSmallNavVisible)
    }

    return (
        <Header>

            <Link to='/'>
                <Text classes='txt-lg txt-ucase'>
                    sneakerviews
                </Text>
            </Link>

            <NavBar id='nav-big' classes='flx-min-center'>

                <Link to='/products'>
                    <Button classes={`btn-txt ${getTextColor(theme)} txt-md txt-lcase mg-right-lg`}>
                        browse
                    </Button>
                </Link>

                <Link to='/wishlist'>
                    <Icon classes={`${getIconColor(theme)} mg-right-lg`}>
                        playlist_play
                    </Icon>
                </Link>

                <Link to='/cart'>
                    <Icon classes={`${getIconColor(theme)} mg-right-lg`}>
                        history
                    </Icon>
                </Link>

                <Link to='/login'>
                    <Button classes={`btn-txt txt-lcase ${getTextColor(theme)} bg-primary pd-xs txt-md`}>
                        login
                    </Button>
                </Link>

            </NavBar>

            <div className='pos-relative'>

                <Button id='btn-ham' onClick={toggleNavVisibility} classes='btn-txt mg-top-xs'>

                    <Icon classes={getIconColor(theme)}>
                        menu
                    </Icon>

                </Button>

                {
                    isSmallNavVisible &&
                    <NavBar id='nav-small' classes={`flx-column pd-md ${getBgColor(theme)} pos-absolute z-index tl-0 b-solid`}>

                        <Button onClick={toggleNavVisibility} classes='btn-txt mg-btm-s'>

                            <Icon classes={`${getIconColor(theme)}`}>
                                close
                            </Icon>

                        </Button>

                        <Link to='/products'>

                            <Button classes={`btn-txt ${getTextColor(theme)} txt-md txt-lcase mg-btm-xs`}>
                                browse
                            </Button>

                        </Link>

                        <Link to='/wishlist'>
                            <Icon classes={`${getIconColor(theme)} mg-btm-xs`}>
                                playlist_play
                            </Icon>
                        </Link>

                        <Link to='/cart'>
                            <Icon classes={`flx ${getIconColor(theme)} mg-btm-xs`}>
                                history
                            </Icon>
                        </Link>

                        <Link to='/login'>
                            <Button classes={`btn-txt txt-lcase ${getTextColor(theme)} txt-md`}>
                                login
                            </Button>
                        </Link>

                    </NavBar>

                }

            </div >

            <Button onClick={toggleTheme} classes='btn-txt pd-xs'>

                <Icon classes={getIconColor(theme)}>
                    {
                        theme === 'light' ? 'bedtime' : 'light_mode'
                    }
                </Icon>
            </Button>

        </Header >
    )
}

export default SignupHeader