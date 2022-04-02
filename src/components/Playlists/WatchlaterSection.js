import { PlaylistVideoCard } from '.'
import { Section, Text } from "../Reusable"
import { getTextColor } from '../../utils'
import { useTheme, useWatchlater } from "../../contexts"

const WatchlaterSection = () => {
    const { theme } = useTheme()
    const { watchlaterState: { watchlaterVideos } } = useWatchlater()

    return (
        <Section classes='flx flx-column mg-left-md mg-btm-md'>

            <Text classes={`txt-lg txt-cap ${getTextColor(theme)} mg-btm-md`}>watch later</Text>

            <Section id='slider-playlist' classes='flx flx-min-center pd-btm-xs'>

                {
                    watchlaterVideos?.map(video => <PlaylistVideoCard key={video._id} video={video} watchlaterVideo={true} />)
                }

            </Section>

        </Section>
    )

}

export default WatchlaterSection
