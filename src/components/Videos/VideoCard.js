import { Button, Card, Text } from "../Reusable"
import { getSolidBtnBgColor, getSolidBtnTextColor, getTextColor } from '../../utils'
import { useTheme } from "../../contexts"

const VideoCard = ({ video: {
    video,
    videoTitle,
    videoDescription
} }) => {
    const { theme } = useTheme()

    return (
        <Card id='container-video' classes='pd-xs pos-relative'>

            <Button classes={`btn-solid ${getSolidBtnBgColor(theme)} ${getSolidBtnTextColor(theme)} txt-md txt-lcase pd-xs pos-absolute tr-1`}>watch later</Button>

            <video id='card-video' controls>
                <source src={video}></source>
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