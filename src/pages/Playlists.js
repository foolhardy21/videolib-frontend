import { useEffect } from 'react'
import { Text, Main, Alert } from "../components/Reusable"
import { PlaylistHeader, PlaylistsSection, LikesSection, PlaylistForm, WatchlaterSection } from "../components/Playlists"
import { useTheme, useLikes, usePlaylists, useWatchlater } from "../contexts"
import { useTitle } from '../hooks/useTitle'
import { getBgColor, getTextColor } from "../utils"
import { ACTION_INIT_LIKES, ACTION_INIT_PLAYLISTS, ACTION_INIT_WATCHLATER, ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS } from '../utils/constants.util'

const Playlists = () => {
    useTitle('Playlists')
    const { theme } = useTheme()
    const { watchlaterState, watchlaterDispatch, getWatchlater } = useWatchlater()
    const { likesState, likesDispatch, getLikedVideos } = useLikes()
    const { playlistsState, playlistsDispatch, getPlaylists, showPlaylistsAlert } = usePlaylists()

    useEffect(() => {
        (async () => {
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
            const getPlaylistsResponse = await getPlaylists()
            if (getPlaylistsResponse === 404 || getPlaylistsResponse === 500) {
                showPlaylistsAlert('could not get playlists', ALERT_TYPE_ERROR)
            } else {
                playlistsDispatch({ type: ACTION_INIT_PLAYLISTS, payload: getPlaylistsResponse })
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
                        playlistsState.alert.type === ALERT_TYPE_ERROR
                            ? <Alert classes='bg-err'>{playlistsState.alert.message}</Alert>
                            : playlistsState.alert.type === ALERT_TYPE_SUCCESS
                                ? <Alert classes='bg-success'>{playlistsState.alert.message}</Alert>
                                : ''
                    }
                </div>

                <PlaylistForm />

                {
                    playlistsState.loading
                        ? <Text classes={`${getTextColor(theme)} txt-xlg txt-500 txt-cap`}>loading...</Text>
                        : <PlaylistsSection />
                }

                {
                    watchlaterState.loading
                        ? <Text classes={`${getTextColor(theme)} txt-xlg txt-500 txt-cap`}>loading...</Text>
                        : <WatchlaterSection />
                }

                {
                    likesState.loading
                        ? <Text classes={`${getTextColor(theme)} txt-xlg txt-500 txt-cap`}>loading...</Text>
                        : <LikesSection />
                }

            </Main>

        </div>
    )
}

export default Playlists
