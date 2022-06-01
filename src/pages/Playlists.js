import { useEffect } from 'react'
import BarLoader from 'react-spinners/BarLoader'
import { Text, Main, Alert } from "components/Reusable"
import { PlaylistHeader, PlaylistsSection, LikesSection, PlaylistForm, WatchlaterSection } from "components/Playlists"
import { useTheme, useLikes, usePlaylists, useWatchlater } from "contexts"
import { useTitle } from 'hooks/useTitle'
import { getBgColor, getTextColor } from "utils"
import { ACTION_INIT_LIKES, ACTION_INIT_PLAYLISTS, ACTION_INIT_WATCHLATER, ALERT_TYPE_ERROR } from 'utils/constants.util'

const Playlists = () => {
    useTitle('Playlists')
    const { theme } = useTheme()
    const { watchlaterState, watchlaterDispatch, getWatchlater } = useWatchlater()
    const { likesState, likesDispatch, getLikedVideos } = useLikes()
    const { playlistsState, playlistsDispatch, getPlaylists, showPlaylistsAlert } = usePlaylists()

    useEffect(() => {
        (async () => {
            const getPlaylistsResponse = await getPlaylists()
            if (getPlaylistsResponse === 404 || getPlaylistsResponse === 500) {
                showPlaylistsAlert('could not get playlists', ALERT_TYPE_ERROR)
            } else {
                playlistsDispatch({ type: ACTION_INIT_PLAYLISTS, payload: getPlaylistsResponse })
            }
            const watchlaterVideosResponse = await getWatchlater()
            if (watchlaterVideosResponse === 404 || watchlaterVideosResponse === 500) {
                showPlaylistsAlert('could not get watch later', ALERT_TYPE_ERROR)
            } else {
                watchlaterDispatch({ type: ACTION_INIT_WATCHLATER, payload: watchlaterVideosResponse })
            }
            const likedVideosResponse = await getLikedVideos()
            if (likedVideosResponse === 404 || likedVideosResponse === 500) {
                showPlaylistsAlert('could not get liked videos', ALERT_TYPE_ERROR)
            } else {
                likesDispatch({ type: ACTION_INIT_LIKES, payload: likedVideosResponse })
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

                {
                    playlistsState.alert.message && <Alert type={playlistsState.alert.type}>{playlistsState.alert.message}</Alert>
                }

                <PlaylistForm />

                {
                    playlistsState.loading
                        ? <BarLoader width={300} height={5} css={{ marginLeft: '80px' }} />
                        : <PlaylistsSection />
                }

                {
                    watchlaterState.loading
                        ? <BarLoader width={300} height={5} css={{ marginLeft: '80px' }} />
                        : <WatchlaterSection />
                }

                {
                    likesState.loading
                        ? <BarLoader width={300} height={5} css={{ marginLeft: '80px' }} />
                        : <LikesSection />
                }

            </Main>

        </div>
    )
}

export default Playlists
