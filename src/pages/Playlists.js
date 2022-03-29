import { useEffect } from 'react'
import { PlaylistHeader, PlaylistsSection } from "../components/Playlists"
import { Text, Main } from "../components/Reusable"
import { useLikes, useTheme } from "../contexts"
import { getBgColor, getTextColor } from "../utils"
import '../components/Playlists/playlists.css'

const Playlists = () => {
    const { theme } = useTheme()
    const { likesDispatch, getLikedVideos, showLikesAlert } = useLikes()

    useEffect(() => {
        (async () => {
            const likedVideosResponse = await getLikedVideos()
            if (likedVideosResponse === 404 || likedVideosResponse === 500) {
                showLikesAlert('could not get liked videos', 'error')
            } else {
                likesDispatch({ type: 'INIT_LIKES', payload: likedVideosResponse })
            }
        })()
    }, [])

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