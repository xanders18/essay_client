import React from 'react'
// import Headers from '../../Components/Header/header'
import MainComponent from '../../Components/Home/Main-Section/main'
import AdvancedComponent from '../../Components/Home/Advantange-Section/advantange'
import CityComponent from '../../Components/Home/City-Section/city'
import PlatformComponent from '../../Components/Home/Platform-Section/platform'
import Footers from '../../Components/Footer/footer'

const HomePage = props => {
    return (
        <React.Fragment>
            {/* <Headers /> */}
            <MainComponent />
            {/* <ItemComponent /> */}
            <AdvancedComponent />
            <CityComponent />
            <PlatformComponent />
            <Footers />
        </React.Fragment>
    )
}


export default HomePage