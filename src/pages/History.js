import { useEffect } from 'react'
import BarLoader from "react-spinners/BarLoader";
import { HistoryHeader, HistorySection } from 'components/History'
import { Text, Main, Button } from 'components/Reusable'
import { useHistory, useTheme } from 'contexts'
import { useTitle } from 'hooks/useTitle'
import { getBgColor, getBorderColor, getTextColor } from 'utils'
import { ALERT_TYPE_ERROR, ACTION_INIT_HISTORY, ALERT_TYPE_SUCCESS, ACTION_REMOVE_HISTORY } from 'utils/constants.util'

const History = () => {
    useTitle('History')
    const { theme } = useTheme()
    const { historyState: {
        history,
        loading,
        alert: {
            message, type
        } }, historyDispatch, getHistory, removeHistory, showHistoryAlert } = useHistory()

    useEffect(() => {
        (async () => {
            const history = await getHistory()
            if (history === 404 || history === 500) {
                showHistoryAlert('could not get your history', ALERT_TYPE_ERROR)
            } else {
                historyDispatch({ type: ACTION_INIT_HISTORY, payload: history })
            }
        })()
    }, [])

    async function handleRemoveHistory() {
        const removeHistoryResponse = await removeHistory()
        if (removeHistoryResponse === 404 || removeHistoryResponse === 500) {
            showHistoryAlert('could not remove history', ALERT_TYPE_ERROR)
        } else {
            historyDispatch({ type: ACTION_REMOVE_HISTORY })
        }
    }

    return (
        <div
            style={{
                minHeight: '100vh',
            }}
            className={getBgColor(theme)}
        >
            <HistoryHeader />

            <Main classes='flx flx-column flx-center'>

                <Text classes={`txt-lg txt-cap ${getTextColor(theme)} mg-top-md mg-btm-md`}>your history</Text>

                {
                    history.length > 0 &&
                    <Button onClick={handleRemoveHistory} classes={`btn-outlined txt-ucase txt-md ${getBorderColor(theme)} ${getBgColor(theme)} ${getTextColor(theme)} pd-xs mg-btm-md`} >
                        remove all
                    </Button>
                }

                {
                    type === ALERT_TYPE_ERROR
                        ? <Alert classes='bg-err'>{message}</Alert>
                        : type === ALERT_TYPE_SUCCESS ? <Alert classes='bg-success'>{message}</Alert>
                            : ''
                }

                {
                    loading
                        ? <BarLoader width={300} height={5} css={{ marginTop: '50px' }} />
                        : <HistorySection />
                }

            </Main>

        </div>
    )
}

export default History
