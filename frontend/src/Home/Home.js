import React from 'react';
import HeroSection from './Herosection';
import SpecialityMenu from './SpecialityMenu';
import TopDoctors from './TopDoctors';
import Banner from './Banner';

function Home() {
    return (
        <>
            <HeroSection />
            <SpecialityMenu />
            <TopDoctors />
            <Banner />
        </>
    );
}

export default Home;
