import axios from "axios"
import { useState } from "react"
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
    const [iseVideoLiked, setIsVideoLiked] = useState(false)

    async function handleVideoPlay() {
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

    async function handleVideoLike() {
        const userToken = window.localStorage.getItem('userToken')
        await axios.post('/api/user/likes', {
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
        setIsVideoLiked(true)
    }

    async function handleVideoUnlike() {
        const userToken = window.localStorage.getItem('userToken')
        await axios.delete(`/api/user/likes/${_id}`, {
            headers: {
                authorization: userToken
            }
        })
        setIsVideoLiked(false)
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
                    iseVideoLiked ?
                        <Button onClick={handleVideoUnlike} classes={`btn-txt txt-md ${getTextColor(theme)} mg-right-s`}>liked</Button> :
                        <Button onClick={handleVideoLike} classes={`btn-txt txt-md ${getTextColor(theme)} mg-right-s`}>like</Button>
                }

                <Button classes={`btn-txt txt-md ${getTextColor(theme)}`}>add to playlist</Button>

            </div>

        </Card>
    )
}

export default VideoCard
