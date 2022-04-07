import { useTheme } from "contexts"
import { getTextColor } from "utils"

const Text = ({ classes, children }) => {
    const { theme } = useTheme()

    return (
        <p className={`${classes} ${getTextColor(theme)}`}>
            {children}
        </p>
    )
}

export default Text
