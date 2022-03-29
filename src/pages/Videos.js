import axios from 'axios'
import { useEffect } from 'react'
import { VideosFilter, VideosHeader, VideosSection } from '../components/Videos'
import { Alert, Main, Text } from '../components/Reusable'
import { useTheme, useVideos } from '../contexts'
import { getBgColor, getTextColor } from '../utils'
import '../components/Videos/videos.css'

const Videos = () => {
    const { theme } = useTheme()
    const { videosState: {
        alert: {
            message,
            type
        },
        loading
    }, videosDispatch, getVideos, showVideosAlert } = useVideos()

    useEffect(() => {
        (async () => {
            const videos = await getVideos()
            if (videos === 404 || videos === 500) {
                showVideosAlert('could not fetch the videos', 'error')
            } else {
                videosDispatch({ type: 'INIT_VIDEOS', payload: videos })
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
                    type === 'error'
                        ? <Alert classes='bg-err'>{message}</Alert>
                        : type === 'success' ? <Alert classes='bg-success'>{message}</Alert>
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
