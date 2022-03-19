import { Button, Card, Icon, Text } from '../Reusable'
import { useHistory, useTheme } from '../../contexts'
import { getIconColor, getTextColor } from '../../utils'
import axios from 'axios'

const HistoryVideoCard = ({ video: {
    _id,
    video,
    videoTitle,
    videoDescription,
} }) => {
    const { theme } = useTheme()
    const { historyDispatch } = useHistory()

    async function handleRemoveFromHistory() {
        const userToken = window.localStorage.getItem('userToken')
        try {
            await axios.delete(`/api/user/history/${_id}`, {
                headers: {
                    authorization: userToken
                }
            })

            historyDispatch({ type: 'REMOVE_FROM_HISTORY', payload: _id })

        } catch (e) {
            console.log(e)
        }


    }

    return (
        <Card id='container-video' classes='pd-xs pos-relative'>



            <video id='card-video' controls>
                <source src={video}></source>
            </video>

            <Text classes={`txt-md txt-cap txt-500 ${getTextColor(theme)} mg-btm-xs`}>{videoTitle}</Text>

            <Text classes={`txt-md txt-cap ${getTextColor(theme)} card-txtw-s`}>{videoDescription}</Text>

            <div className='flx flx-maj-end'>

                <Button onClick={handleRemoveFromHistory} classes={`btn-txt pd-xs`}>

                    <Icon classes={`${getIconColor(theme)}`}>
                        delete
                    </Icon>

                </Button>

            </div>

        </Card>
    )
}

export default HistoryVideoCard