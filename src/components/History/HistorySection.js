import { HistoryVideoCard } from "."
import { Section } from '../Reusable'
import { useHistory } from '../../contexts'

const HistorySection = () => {
    const { historyState } = useHistory()

    return (
        <Section id='grid-videos' classes='grid grid-maxcols-4'>

            {
                historyState.map(historyVideo => <HistoryVideoCard key={historyVideo._id} video={historyVideo} />)
            }

        </Section>

    )
}

export default HistorySection