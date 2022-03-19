import { Card, Text } from '../Reusable'
import { useTheme } from '../../contexts'
import { getTextColor } from '../../utils'

const PlaylistVideoCard = ({ video: {
    video,
    videoTitle,
    videoDescription
}
}) => {
    const { theme } = useTheme()

    return (
        <Card id='container-video' classes='pd-xs pos-relative'>

            <video id='card-video' controls>
                <source src={video}></source>
            </video>

            <Text classes={`txt-md txt-cap txt-500 ${getTextColor(theme)} mg-btm-xs`}>{videoTitle}</Text>

            <Text classes={`txt-md txt-cap ${getTextColor(theme)} card-txtw-s`}>{videoDescription}</Text>

        </Card>
    )
}

export default PlaylistVideoCard