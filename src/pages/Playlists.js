import { useEffect } from 'react'
import { Text, Main } from "../components/Reusable"
import { PlaylistHeader, PlaylistsSection, LikesSection, PlaylistForm } from "../components/Playlists"
import { useTheme } from "../contexts"
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

            <Main classes='flx flx-column'>

                <Text classes={`txt-lg txt-cap ${getTextColor(theme)} flx flx-center mg-top-md mg-btm-md`}>all playlists</Text>

                <PlaylistForm />

                <LikesSection />

                <PlaylistsSection />

            </Main>

        </div>
    )
}

export default Playlists
