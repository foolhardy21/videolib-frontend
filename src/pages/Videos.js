import axios from 'axios'
import { useEffect } from 'react'
import { VideosFilter, VideosHeader, VideosSection } from '../components/Videos'
import { Main, Text } from '../components/Reusable'
import { useTheme, useVideos } from '../contexts'
import { getBgColor, getTextColor } from '../utils'
import '../components/Videos/videos.css'

const Videos = () => {
    const { theme } = useTheme()
    const { videosDispatch } = useVideos()

    useEffect(() => {
        async function getVideos() {
            try {
                const response = await axios.get('/api/videos')
                return response.data.videos
            } catch (e) {
                console.log(e)
            }
        }
        (async () => {
            const videos = await getVideos()
            videosDispatch({ type: 'INIT_VIDEOS', payload: videos })
        })()
    }, [videosDispatch])


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

                <VideosSection />

            </Main>

        </div>
    )
}

export default Videos