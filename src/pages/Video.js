import { useState, useEffect } from "react"
import { Button, Main, Text } from "components/Reusable"
import { PlaylistModal, VideosHeader } from "components/Videos"
import { useHistory, useLikes, usePlaylists, useTheme, useVideos } from "contexts"
import { getBgColor, getDateForVideoCard, getTextColor } from "utils"
import { Link, useParams } from "react-router-dom"
import styles from 'components/Videos/videos.module.css'
import { ACTION_ADD_TO_LIKES, ACTION_REMOVE_FROM_LIKES, ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS } from "utils/constants.util"

const Video = () => {
    const [currentVideo, setCurrentVideo] = useState({})
    const [similarVideos, setSimilarVideos] = useState([])
    const params = useParams()
    const { theme } = useTheme()
    const { addVideoToHistory } = useHistory()
    const { showPlaylistModal, isPlaylistModalVisible } = usePlaylists()
    const { videosState: { videos }, showVideosAlert, updateSelectedVideo } = useVideos()
    const { isVideoLiked, addVideoToLikes, removeVideoFromLikes, likesDispatch } = useLikes()

    useEffect(() => {
        setCurrentVideo(videos.find(video => video._id == params.videoId))
    }, [params.videoId])

    useEffect(() => {
        if (Object.keys(currentVideo).length > 0) {
            setSimilarVideos(videos.filter(video => video.category === currentVideo.category && video._id !== currentVideo._id))
        }
    }, [currentVideo])

    async function handleVideoLike() {
        const addToLikesResponse = await addVideoToLikes(currentVideo)
        if (addToLikesResponse === 409 || addToLikesResponse === 404 || addToLikesResponse === 500) {
            showVideosAlert('could not like the video', ALERT_TYPE_ERROR)
        } else {
            showVideosAlert('video added to likes', ALERT_TYPE_SUCCESS)
            likesDispatch({ type: ACTION_ADD_TO_LIKES, payload: currentVideo })
        }

    }

    async function handleVideoDislike() {
        const removeFromLikes = await removeVideoFromLikes(currentVideo._id)
        if (removeFromLikes === 404 || removeFromLikes === 500) {
            showVideosAlert('could not dislike the video', ALERT_TYPE_ERROR)
        } else {
            showVideosAlert('video removed from likes', ALERT_TYPE_SUCCESS)
            likesDispatch({ type: ACTION_REMOVE_FROM_LIKES, payload: currentVideo._id })
        }
    }

    function handleAddToPlaylist() {
        updateSelectedVideo(currentVideo)
        showPlaylistModal()
    }

    return (
        <div
            style={{
                minHeight: '100vh',
            }}
            className={getBgColor(theme)}
        >
            <VideosHeader />

            <div className={`${styles.singleVideoPgContainer} flx pd-xlg`}>

                <Main classes='flx flx-column'>

                    <video onPlay={() => addVideoToHistory(currentVideo)} className={styles.videoPlayer} controls>
                        <source src={currentVideo?.url}></source>
                    </video>

                    <Text classes={`txt-lg txt-cap txt-500 ${getTextColor(theme)} mg-top-s mg-left-xs`}>{currentVideo?.title}</Text>

                    <Text classes={`txt-md txt-cap ${getTextColor(theme)} mg-top-xs mg-left-xs`}>{currentVideo?.description}</Text>

                    <div className="flx flx-maj-start mg-top-s mg-left-xs">

                        <Text classes={`txt-md txt-cap ${getTextColor(theme)} mg-right-xs`}>{`${currentVideo?.views} views`}</Text>

                        <Text classes={`txt-md txt-cap ${getTextColor(theme)}`}>{getDateForVideoCard(currentVideo?.uploadedOn)}</Text>

                    </div>

                    <Text classes={`txt-md txt-cap ${getTextColor(theme)} mg-top-s mg-left-xs`}>{`category - ${currentVideo?.category}`}</Text>

                    <div className='flx flx-maj-end mg-top-xs'>

                        {
                            isVideoLiked(currentVideo?._id) ?
                                <Button onClick={handleVideoDislike} classes={`btn-txt txt-md ${getTextColor(theme)} mg-right-s`}>liked</Button> :
                                <Button onClick={handleVideoLike} classes={`btn-txt txt-md ${getTextColor(theme)} mg-right-s`}>like</Button>
                        }

                        <Button onClick={handleAddToPlaylist} classes={`btn-txt txt-md ${getTextColor(theme)}`}>add to playlist</Button>

                    </div>

                </Main>

                <aside className={`${styles.videoAside} mg-left-s`}>
                    <Text classes={`${getTextColor(theme)} txt-lg txt-ucase mg-btm-md`}>similar videos</Text>
                    {
                        similarVideos?.map(similarVideo =>
                            <Link to={`/videos/${similarVideo?._id}`} key={similarVideo?._id}>
                                <video>
                                    <source src={similarVideo?.url}></source>
                                </video>
                                <Text classes={`txt-md txt-cap txt-500 ${getTextColor(theme)} card-txtw-s mg-btm-s`}>{similarVideo?.title}</Text>
                            </Link>)
                    }
                </aside>

            </div>
            {
                isPlaylistModalVisible && <PlaylistModal />
            }
        </div>
    )
}

export default Video