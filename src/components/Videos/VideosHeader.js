import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Header, Text, Button, Icon, NavBar, Input } from 'components/Reusable'
import { getTextColor, getIconColor, getBgColor } from 'utils'
import { useAuth, useTheme, useVideos } from 'contexts'
import { ACTION_INIT_VIDEOS } from 'utils/constants.util'

const VideosHeader = () => {
    const [isSmallNavVisible, setIsSmallNavVisible] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const { theme, toggleTheme } = useTheme()
    const { isUserLoggedIn, logoutUser } = useAuth()
    const { videosDispatch, getVideos } = useVideos()

    function toggleNavVisibility() {
        setIsSmallNavVisible(!isSmallNavVisible)
    }

    async function handleSearchSubmit() {
        const getVideosResponse = await getVideos()
        const filteredVideos = getVideosResponse.filter(video => video.title.toLowerCase().includes(searchQuery.toLowerCase()) || video.description.toLowerCase().includes(searchQuery.toLowerCase()))
        videosDispatch({ type: ACTION_INIT_VIDEOS, payload: filteredVideos })
    }

    return (
        <Header>

            <Link to='/'>
                <Text classes='txt-lg txt-ucase'>
                    sneakerviews
                </Text>
            </Link>

            <div className='flx'>

                <Input placeholder='search...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} classes={`input-s txt-md ${getTextColor(theme)}`} />

                <Button onClick={handleSearchSubmit} classes='btn-txt'>
                    <Icon classes='pd-xs'>search</Icon>
                </Button>

            </div>

            <NavBar id='nav-big' classes='flx-min-center'>

                <Link to='/videos'>
                    <Button classes={`btn-txt ${getTextColor(theme)} txt-md txt-lcase mg-right-lg`}>
                        browse
                    </Button>
                </Link>

                <Link to='/playlists'>
                    <Icon classes={`${getIconColor(theme)} mg-right-lg`}>
                        playlist_play
                    </Icon>
                </Link>

                <Link to='/history'>
                    <Icon classes={`${getIconColor(theme)} mg-right-lg`}>
                        history
                    </Icon>
                </Link>

                {
                    isUserLoggedIn
                        ? <Link to='/'>
                            <Button onClick={logoutUser} classes={`btn-txt txt-lcase ${getTextColor(theme)} bg-primary pd-xs txt-md`}>
                                logout
                            </Button>
                        </Link>
                        : <Link to='/login'>
                            <Button classes={`btn-txt txt-lcase ${getTextColor(theme)} bg-primary pd-xs txt-md`}>
                                login
                            </Button>
                        </Link>
                }

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

                        <Link to='/videos'>

                            <Button classes={`btn-txt ${getTextColor(theme)} txt-md txt-lcase mg-btm-xs`}>
                                browse
                            </Button>

                        </Link>

                        <Link to='/playlists'>
                            <Icon classes={`${getIconColor(theme)} mg-btm-xs`}>
                                playlist_play
                            </Icon>
                        </Link>

                        <Link to='/history'>
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

export default VideosHeader