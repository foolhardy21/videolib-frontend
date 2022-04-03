import { HistoryVideoCard } from "."
import { Section } from 'components/Reusable'
import { useHistory } from 'contexts'
import styles from './history.module.css'

const HistorySection = () => {
    const { historyState: { history } } = useHistory()

    return (
        <Section id={styles.gridVideos} classes='grid grid-maxcols-4'>

            {
                history.map(historyVideo => <HistoryVideoCard key={historyVideo._id} video={historyVideo} />)
            }

        </Section>

    )
}

export default HistorySection
