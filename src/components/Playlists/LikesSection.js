import { PlaylistVideoCard } from './'
import { Section, Text, Alert } from '../Reusable'
import { getTextColor } from '../../utils'
import { useLikes, useTheme } from '../../contexts'

const LikesSection = () => {
    const { theme } = useTheme()
    const { likesState: { likedVideos } } = useLikes()

    return (
        <Section classes='flx flx-column mg-left-md mg-btm-md'>

            <Text classes={`txt-lg txt-cap ${getTextColor(theme)} mg-btm-md`}>liked videos</Text>

            <Section id='slider-playlist' classes='flx flx-min-center pd-btm-xs'>

                {
                    likedVideos?.map(video => <PlaylistVideoCard key={video._id} video={video} />)
                }

            </Section>

        </Section>
    )
}

export default LikesSection
