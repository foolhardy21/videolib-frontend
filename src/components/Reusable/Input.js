import { useTheme } from "contexts"
import { getBgColor, getTextColor } from "utils"

const Input = ({ id, type, placeholder, value, onChange, classes }) => {
    const { theme } = useTheme()

    return (
        <input id={id} type={type} placeholder={placeholder} value={value} onChange={onChange} className={`input ${getBgColor(theme)} ${getTextColor(theme)} ${classes}`} />
    )
}

export default Input
