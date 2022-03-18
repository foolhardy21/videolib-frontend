const Icon = ({ id, classes, children }) => {

    return (
        <span id={id} className={`material-icons ${classes}`}>
            {children}
        </span>
    )
}

export default Icon
