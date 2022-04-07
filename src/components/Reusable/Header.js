import { useTheme } from "contexts"
import { getBgColor } from "utils"

const Header = ({ children }) => {
    const { theme } = useTheme()

    return (
        <header id="pg-header" className={`${getBgColor(theme)} flx flx-maj-even flx-min-center pd-top-md pd-btm-md`}>
            {children}
        </header>
    )
}

export default Header
