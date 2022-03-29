import { Button, Card, Text } from "../Reusable"
import { getTextColor } from '../../utils'
import { useHistory, useLikes, useTheme, useVideos } from "../../contexts"

const VideoCard = ({ video, video: {
    _id,
    url,
    title,
    description,
    views,
    uploadedOn,
    category
} }) => {
    const { theme } = useTheme()
    const { addVideoToHistory } = useHistory()
    const { isVideoLiked, addVideoToLikes, removeVideoFromLikes, likesDispatch } = useLikes()
    const { showVideosAlert } = useVideos()

    async function handleVideoLike() {
        const addToLikesResponse = await addVideoToLikes(video)
        if (addToLikesResponse === 409 || addToLikesResponse === 404) {
            showVideosAlert('could not like the video', 'error')
        } else {
            likesDispatch({ type: 'ADD_TO_LIKES', payload: video })
        }

    }

    async function handleVideoUnlike() {
        const removeFromLikes = await removeVideoFromLikes(_id)
        if (removeFromLikes === 404 || removeFromLikes === 500) {
            showVideosAlert('could not dislike the video', 'error')
        } else {
            likesDispatch({ type: 'REMOVE_FROM_LIKES', payload: _id })
        }
    }


    return (
        <Card id='container-video' classes='pd-xs pos-relative'>

            <video onPlay={() => addVideoToHistory(video)} id='card-video' controls controlsList="nodownload nofullscreen">
                <source src={url}></source>
            </video>

            <Text classes={`txt-md txt-cap txt-500 ${getTextColor(theme)} card-txtw-s mg-btm-xs`}>{title}</Text>

            <Text classes={`txt-md txt-cap ${getTextColor(theme)} card-txtw-s`}>{description.slice(0, 40)}</Text>

            <div className="flx flx-maj-start mg-top-s mg-btm-s">

                <Text classes={`txt-md txt-cap ${getTextColor(theme)} mg-right-xs`}>{`${views} views`}</Text>

                <Text classes={`txt-md txt-cap ${getTextColor(theme)}`}>{uploadedOn.slice(0, -14)}</Text>

            </div>

            <Text classes={`txt-md txt-cap ${getTextColor(theme)} card-txtw-s`}>{`category - ${category}`}</Text>


            <div className='flx flx-maj-end mg-top-xs'>

                {
                    isVideoLiked(_id) ?
                        <Button onClick={handleVideoUnlike} classes={`btn-txt txt-md ${getTextColor(theme)} mg-right-s`}>liked</Button> :
                        <Button onClick={handleVideoLike} classes={`btn-txt txt-md ${getTextColor(theme)} mg-right-s`}>like</Button>
                }

                <Button classes={`btn-txt txt-md ${getTextColor(theme)}`}>add to playlist</Button>

            </div>

        </Card>
    )
}

export default VideoCard
