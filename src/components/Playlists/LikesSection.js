import { PlaylistVideoCard } from './'
import { Section, Text } from '../Reusable'
import { getTextColor } from '../../utils'
import { useLikes, useTheme } from '../../contexts'

const LikesSection = () => {
    const { theme } = useTheme()
    const { likesState } = useLikes()

    return (
        <div className='flx flx-column'>

            <Text classes={`txt-lg txt-cap ${getTextColor(theme)} mg-btm-md`}>liked videos</Text>

            <Section id='grid-likes' classes='grid grid-maxcols-4 pd-btm-s'>

                {
                    likesState.map(video => <PlaylistVideoCard key={video._id} video={video} />)
                }

            </Section>

        </div>
    )
}

export default LikesSection
