import { useEffect } from 'react'
import { VideosFilter, VideosHeader, VideosSection, PlaylistModal } from '../components/Videos'
import { Alert, Main, Text } from '../components/Reusable'
import { usePlaylists, useTheme, useVideos } from '../contexts'
import { getBgColor, getTextColor } from '../utils'
import { ACTION_INIT_VIDEOS, ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS } from '../utils/constants.util'

const Videos = () => {
    const { theme } = useTheme()
    const { videosState: {
        alert: {
            message,
            type
        },
        loading
    }, videosDispatch, getVideos, showVideosAlert } = useVideos()
    const { isPlaylistModalVisible } = usePlaylists()

    useEffect(() => {
        (async () => {
            const videos = await getVideos()
            if (videos === 404 || videos === 500) {
                showVideosAlert('could not fetch the videos', ALERT_TYPE_ERROR)
            } else {
                videosDispatch({ type: ACTION_INIT_VIDEOS, payload: videos })
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
            <VideosHeader />

            <Main classes='flx flx-column flx-min-center'>

                <Text classes={`txt-lg txt-cap ${getTextColor(theme)} mg-top-md`}>all videos</Text>

                <VideosFilter />

                {
                    type === ALERT_TYPE_ERROR
                        ? <Alert classes='bg-err'>{message}</Alert>
                        : type === ALERT_TYPE_SUCCESS ? <Alert classes='bg-success'>{message}</Alert>
                            : ''
                }

                {
                    loading
                        ? <Text classes={`${getTextColor(theme)} txt-xlg txt-500 txt-cap mg-top-md`}>loading...</Text>
                        : <VideosSection />
                }

            </Main>

            {
                isPlaylistModalVisible && <PlaylistModal />
            }

        </div>
    )
}

export default Videos
