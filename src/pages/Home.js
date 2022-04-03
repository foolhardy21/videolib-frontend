import { useState } from 'react'
import { Link } from "react-router-dom"
import { Header, Icon, Text, Button, NavBar } from 'components/Reusable'
import { useTitle } from 'hooks/useTitle'
import { useAuth, useTheme } from "contexts"
import { getTextColor, getIconColor, getBgColor } from 'utils'
import { CategorySection, HomeHeader } from 'components/Home'

const Home = () => {
    useTitle('Home')


    return (
        <>
            <HomeHeader />
            <CategorySection />
        </>
    )
}

export default Home