import { useEffect } from 'react'
import { Text, Main, Alert } from "../components/Reusable"
import { PlaylistHeader, PlaylistsSection, LikesSection, PlaylistForm } from "../components/Playlists"
import { useTheme, useLikes, usePlaylists } from "../contexts"
import { getBgColor, getTextColor } from "../utils"
import '../components/Playlists/playlists.css'

const Playlists = () => {
    const { theme } = useTheme()
    const { likesState, likesDispatch, getLikedVideos, showLikesAlert } = useLikes()
    const { playlistsState, getPlaylists, showPlaylistsAlert } = usePlaylists()

    useEffect(() => {
        (async () => {
            const likedVideosResponse = await getLikedVideos()
            if (likedVideosResponse === 404 || likedVideosResponse === 500) {
                showLikesAlert('could not get liked videos', 'error')
            } else {
                likesDispatch({ type: 'INIT_LIKES', payload: likedVideosResponse })
            }
            const getPlaylistsResponse = await getPlaylists()
            if (getPlaylistsResponse === 404 || getPlaylistsResponse === 500) {
                showPlaylistsAlert('could not get playlists', 'error')
            } else {
                playlistsDispatch({ type: 'INIT_PLAYLISTS', payload: getPlaylistsResponse })
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

                <div className='flx flx-center'>
                    {
                        likesState.alert.type === 'error'
                            ? <Alert classes='bg-err'>{likesState.alert.message}</Alert>
                            : likesState.alert.type === 'success' ? <Alert classes='bg-success'>{likesState.alert.message}</Alert>
                                : ''
                    }
                </div>

                <div className='flx flx-center'>
                    {
                        playlistsState.alert.type === 'error'
                            ? <Alert classes='bg-err'>{playlistsState.alert.message}</Alert>
                            : playlistsState.alert.type === 'success'
                                ? <Alert classes='bg-success'>{playlistsState.alert.message}</Alert>
                                : ''
                    }
                </div>

                <PlaylistForm />

                {
                    likesState.loading
                        ? <Text classes={`${getTextColor(theme)} txt-xlg txt-500 txt-cap`}>loading...</Text>
                        : <LikesSection />
                }

                {
                    playlistsState.loading
                        ? <Text classes={`${getTextColor(theme)} txt-xlg txt-500 txt-cap`}>loading...</Text>
                        : <PlaylistsSection />
                }

            </Main>

        </div>
    )
}

export default Playlists
