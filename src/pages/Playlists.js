import axios from 'axios'
import { useEffect } from 'react'
import { PlaylistHeader, PlaylistsSection } from "../components/Playlists"
import { Text, Main } from "../components/Reusable"
import { useLikes, useTheme } from "../contexts"
import { getBgColor, getTextColor } from "../utils"
import '../components/Playlists/playlists.css'

const Playlists = () => {
    const { theme } = useTheme()
    const { likesDispatch } = useLikes()

    useEffect(() => {
        async function getLikedVideos() {
            const userToken = window.localStorage.getItem('userToken')
            try {
                const response = await axios.get('/api/user/likes', {
                    headers: {
                        authorization: userToken
                    }
                })
                return response.data.likes
            } catch (e) {
                console.log(e)
            }
        }
        (async () => {
            const likedVideos = await getLikedVideos()
            likedVideos && likesDispatch({ type: 'INIT_LIKES', payload: likedVideos })
        })()
    }, [likesDispatch])

    return (
        <div
            style={{
                minHeight: '100vh'
            }}
            className={getBgColor(theme)}
        >
            <PlaylistHeader />

            <Main classes='flx flx-column flx-center'>

                <Text classes={`txt-lg txt-cap ${getTextColor(theme)} mg-top-md mg-btm-md`}>all playlists</Text>

                <PlaylistsSection />

            </Main>

        </div>
    )
}

export default Playlists