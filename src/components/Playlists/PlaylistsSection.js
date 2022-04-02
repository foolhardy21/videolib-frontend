import { Section, Text } from "../Reusable"
import { LikesSection } from "./"
import { getTextColor } from '../../utils'
import { useLikes, useTheme } from "../../contexts"

const PlaylistsSection = () => {
    const { likesState: {
        loading,
    }
    } = useLikes()
    const { theme } = useTheme()

    return (
        <Section classes='flx flx-column'>

            {
                loading
                    ? <Text classes={`${getTextColor(theme)} txt-xlg txt-500 txt-cap`}>loading...</Text>
                    : <LikesSection />
            }

        </Section>
    )
}

export default PlaylistsSection