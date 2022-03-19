import { HistoryVideoCard } from "."
import { Section } from '../Reusable'
import { useHistory } from '../../contexts'

const HistorySection = () => {
    const { historyState: { history } } = useHistory()

    return (
        <Section id='grid-videos' classes='grid grid-maxcols-4'>

            {
                history.map(historyVideo => <HistoryVideoCard key={historyVideo._id} video={historyVideo} />)
            }

        </Section>

    )
}

export default HistorySection
