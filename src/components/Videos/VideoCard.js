import { Button, Card, Text } from "../Reusable"
import { getTextColor } from '../../utils'
import { useHistory, useTheme } from "../../contexts"
import axios from "axios"

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

    return (
        <Card id='container-video' classes='pd-xs pos-relative'>

            <video onPlay={() => addVideoToHistory(video)} id='card-video' controls controlsList="nodownload nofullscreen">
                <source src={url}></source>
            </video>

            <Text classes={`txt-md txt-cap txt-500 ${getTextColor(theme)} card-txtw-s mg-btm-xs`}>{title}</Text>

            <Text classes={`txt-md txt-cap ${getTextColor(theme)} card-txtw-s`}>{description.slice(0, 40)}....</Text>

            <div className="flx flx-maj-start mg-top-s mg-btm-s">

                <Text classes={`txt-md txt-cap ${getTextColor(theme)} mg-right-xs`}>{`${views} views`}</Text>

                <Text classes={`txt-md txt-cap ${getTextColor(theme)}`}>{uploadedOn.slice(0, -14)}</Text>

            </div>

            <Text classes={`txt-md txt-cap ${getTextColor(theme)} card-txtw-s`}>{`category - ${category}`}</Text>

            <div className='flx flx-maj-end mg-top-xs'>

                <Button classes={`btn-txt txt-md ${getTextColor(theme)} mg-right-s`}>like</Button>

                <Button classes={`btn-txt txt-md ${getTextColor(theme)}`}>add to playlist</Button>

            </div>

        </Card>
    )
}

export default VideoCard
