import { useEffect } from 'react'
import BarLoader from "react-spinners/BarLoader";
import { VideosFilter, VideosHeader, VideosSection, PlaylistModal } from 'components/Videos'
import { Alert, Main, Text } from 'components/Reusable'
import { useFilter, usePlaylists, useTheme, useVideos } from 'contexts'
import { useTitle } from 'hooks/useTitle'
import { getBgColor, getTextColor } from 'utils'
import { ACTION_INIT_VIDEOS, ALERT_TYPE_ERROR } from 'utils/constants.util'

const Videos = () => {
    useTitle('Videos')
    const { theme } = useTheme()
    const { videosState: {
        alert: {
            message,
            type
        },
        loading
    }, videosDispatch, getVideos, showVideosAlert } = useVideos()
    const { isPlaylistModalVisible } = usePlaylists()
    const { filterState } = useFilter()

    useEffect(() => {
        (async () => {
            const videos = await getVideos()
            if (videos === 404 || videos === 500) {
                showVideosAlert('could not fetch the videos', ALERT_TYPE_ERROR)
            } else if (filterState.length === 0) {
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
                    message && <Alert type={type}>{message}</Alert>
                }
                {
                    loading
                        ? <BarLoader height={5} width={300} css={{ marginTop: '50px' }} />
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
