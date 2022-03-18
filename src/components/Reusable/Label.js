import { useTheme } from "../../contexts"
import { getTextColor } from "../../utils"

const Label = (props) => {
    const { theme } = useTheme()

    return (
        <label htmlFor={props.htmlFor} onClick={props.onClick} className={`${getTextColor(theme)} ${props.classes}`} >
            {props.children}

        </label>
    )
}

export default Label