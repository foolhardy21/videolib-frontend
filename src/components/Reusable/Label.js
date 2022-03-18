import { useTheme } from "../../contexts"
import { getTextColor } from "../../utils"

const Label = ({ htmlFor, classes, children }) => {
    const { theme } = useTheme()

    return (
        <label htmlFor={htmlFor} className={classes} >
            {children}
        </label>
    )
}

export default Label