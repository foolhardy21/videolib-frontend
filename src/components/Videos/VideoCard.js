import { Button, Card, Text } from "../Reusable"
import { getTextColor } from '../../utils'
import { useTheme } from "../../contexts"
import axios from "axios"

const VideoCard = ({ video: {
    _id,
    id,
    video,
    videoTitle,
    videoDescription
} }) => {
    const { theme } = useTheme()

    async function handleVideoPlay() {
        // add video to history
        const userToken = window.localStorage.getItem('userToken')
        try {
            await axios.post('/api/user/history', {
                video: {
                    _id,
                    id,
                    video,
                    videoTitle,
                    videoDescription
                }
            }, {
                headers: {
                    authorization: userToken
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Card id='container-video' classes='pd-xs pos-relative'>

            {/* <Button classes={`btn-solid ${getSolidBtnBgColor(theme)} ${getSolidBtnTextColor(theme)} txt-md txt-lcase pd-xs pos-absolute tr-1`}>watch later</Button> */}

            <video onPlay={handleVideoPlay} id='card-video' controls>
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
