import axios from 'axios'
import { useEffect } from 'react'
import { HistoryHeader, HistorySection } from '../components/History'
import { Text, Main, Button } from '../components/Reusable'
import { useHistory, useTheme } from '../contexts'
import { getBgColor, getBorderColor, getTextColor } from '../utils'
import '../components/History/history.css'

const History = () => {
    const { theme } = useTheme()
    const { historyState, historyDispatch } = useHistory()

    useEffect(() => {
        async function getHistory() {
            const userToken = window.localStorage.getItem('userToken')
            try {
                const response = await axios.get('/api/user/history', {
                    headers: {
                        authorization: userToken
                    }
                })
                return response.data.history
            } catch (e) {
                console.log(e)
            }
        }
        (async () => {
            const history = await getHistory()
            history && historyDispatch({ type: 'INIT_HISTORY', payload: history })
        })()
    }, [historyDispatch])

    async function handleRemoveHistory() {
        const userToken = window.localStorage.getItem('userToken')
        await axios.delete('/api/user/history/all', {
            headers: {
                authorization: userToken
            }
        })

        historyDispatch({ type: 'REMOVE_HISTORY' })
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
                    historyState.length > 0 &&
                    <Button onClick={handleRemoveHistory} classes={`btn-outlined txt-ucase txt-md ${getBorderColor(theme)} ${getBgColor(theme)} ${getTextColor(theme)} pd-xs mg-btm-md`} >
                        remove all
                    </Button>
                }

                <HistorySection />

            </Main>

        </div>
    )
}

export default History