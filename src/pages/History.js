import { useEffect } from 'react'
import { HistoryHeader, HistorySection } from '../components/History'
import { Text, Main, Button } from '../components/Reusable'
import { useHistory, useTheme } from '../contexts'
import { getBgColor, getBorderColor, getTextColor } from '../utils'
import { ALERT_TYPE_ERROR } from '../utils/constants.util'

const History = () => {
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
                historyDispatch({ type: 'INIT_HISTORY', payload: history })
            }
        })()
    }, [])

    async function handleRemoveHistory() {
        const removeHistoryResponse = await removeHistory()
        if (removeHistoryResponse === 404 || removeHistoryResponse === 500) {
            showHistoryAlert('could not remove history', ALERT_TYPE_ERROR)
        } else {
            historyDispatch({ type: 'REMOVE_HISTORY' })
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
                    type === 'error'
                        ? <Alert classes='bg-err'>{message}</Alert>
                        : type === 'success' ? <Alert classes='bg-success'>{message}</Alert>
                            : ''
                }

                {
                    loading
                        ? <Text classes={`${getTextColor(theme)} txt-cap txt-xlg txt-500`}>loading...</Text>
                        : <HistorySection />
                }

            </Main>

        </div>
    )
}

export default History
