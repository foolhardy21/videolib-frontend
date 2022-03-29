import { Card, Text } from '../Reusable'
import { useTheme } from '../../contexts'
import { getTextColor } from '../../utils'

const PlaylistVideoCard = ({ video: {
    url,
    title,
    description,
    views,
    uploadedOn,
    category
}
}) => {
    const { theme } = useTheme()

    return (
        <Card id='container-video' classes='pd-xs pos-relative'>

            <video id='card-video' controls controlsList='nodownload nofullscreen'>
                <source src={url}></source>
            </video>

            <Text classes={`txt-md txt-cap txt-500 ${getTextColor(theme)} mg-btm-xs`}>{title}</Text>

            <Text classes={`txt-md txt-cap ${getTextColor(theme)} card-txtw-s`}>{description.slice(0, 40)}...</Text>

            <div className="flx flx-maj-start mg-top-s mg-btm-s">

                <Text classes={`txt-md txt-cap ${getTextColor(theme)} mg-right-xs`}>{`${views} views`}</Text>

                <Text classes={`txt-md txt-cap ${getTextColor(theme)}`}>{uploadedOn.slice(0, -14)}</Text>

            </div>

            <Text classes={`txt-md txt-cap ${getTextColor(theme)} card-txtw-s`}>{`category - ${category}`}</Text>

        </Card>
    )
}

export default PlaylistVideoCard