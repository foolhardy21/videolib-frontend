const NavBar = ({ classes, id, children }) => {

    return (
        <nav id={id} className={`flx ${classes}`}>
            {children}
        </nav>
    )
}

export default NavBar
