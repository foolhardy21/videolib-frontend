import { Button, Card, Text } from "../Reusable"
import { getTextColor } from '../../utils'
import { useHistory, useTheme } from "../../contexts"
import axios from "axios"

const VideoCard = ({ video, video: {
    _id,
    id,
    url,
    videoTitle,
    videoDescription
} }) => {
    const { theme } = useTheme()
    const { addVideoToHistory } = useHistory()


    return (
        <Card id='container-video' classes='pd-xs pos-relative'>

            <video onPlay={() => addVideoToHistory(video)} id='card-video' controls>
                <source src={url}></source>
            </video>

            <Text classes={`txt-md txt-cap txt-500 ${getTextColor(theme)} mg-btm-xs`}>{videoTitle}</Text>

            <Text classes={`txt-md txt-cap ${getTextColor(theme)} card-txtw-s`}>{videoDescription}</Text>

            <div className='flx flx-maj-end mg-top-xs'>

                <Button classes={`btn-txt txt-md ${getTextColor(theme)} mg-right-s`}>like</Button>

                <Button classes={`btn-txt txt-md ${getTextColor(theme)}`}>add to playlist</Button>

            </div>

        </Card>
    )
}

export default VideoCard
