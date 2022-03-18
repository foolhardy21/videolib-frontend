import { useTheme } from '../../contexts'

const Card = ({ classes, children, onClick }) => {
    const { theme } = useTheme()

    return (
        <article onClick={onClick} className={`card-dim card-shadow-xs ${theme === 'dark' && 'b-solid b-secondary'} ${classes}`}>
            {children}
        </article>
    )
}

export default Card
