const Button = ({ onClick, id, classes, children }) => {

    return (
        <button id={id} onClick={onClick} className={classes}>
            {children}
        </button>
    )
}

export default Button
