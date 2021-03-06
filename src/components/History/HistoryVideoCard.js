import { Button, Card, Icon, Text } from 'components/Reusable'
import { useHistory, useTheme } from 'contexts'
import { getIconColor, getTextColor } from 'utils'
import { ACTION_REMOVE_FROM_HISTORY } from 'utils/constants.util'
import styles from './history.module.css'

const HistoryVideoCard = ({ video: {
    _id,
    url,
    title,
    description,
    views,
    uploadedOn,
    category
} }) => {
    const { theme } = useTheme()
    const { historyDispatch, removeVideoFromHistory, showHistoryAlert } = useHistory()

    async function handleRemoveFromHistory() {
        const removeFromHistoryResponse = await removeVideoFromHistory(_id)
        if (removeFromHistoryResponse === 404 || removeFromHistoryResponse === 500) {
            showHistoryAlert('could not remove the video', ALERT_TYPE_ERROR)
        } else {
            historyDispatch({ type: ACTION_REMOVE_FROM_HISTORY, payload: _id })
        }
    }

    return (
        <Card id={styles.containerVideo} classes='pd-xs pos-relative'>

            <video id={styles.cardVideo} controls controlsList="nodownload nofullscreen">
                <source src={url}></source>
            </video>

            <Text classes={`txt-md txt-cap txt-500 ${getTextColor(theme)} card-txtw-s mg-btm-xs`}>{title}</Text>

            <Text classes={`txt-md txt-cap ${getTextColor(theme)} card-txtw-s`}>{description.slice(0, 40)}</Text>

            <div className="flx flx-maj-start mg-top-s mg-btm-s">

                <Text classes={`txt-md txt-cap ${getTextColor(theme)} mg-right-xs`}>{`${views} views`}</Text>

                <Text classes={`txt-md txt-cap ${getTextColor(theme)}`}>{uploadedOn.slice(0, -14)}</Text>

            </div>

            <Text classes={`txt-md txt-cap ${getTextColor(theme)} card-txtw-s`}>{`category - ${category}`}</Text>

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
