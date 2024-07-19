import React from 'react'
import Hero from '@/components/Hero'
import InfoContainer from '@/components/InfoContainer'
import FeaturedProperties from '@/components/FeaturedProperties'


const HomePage = async () => {

    return (
        <>
            <Hero />
            <InfoContainer />
            <FeaturedProperties />
        </>
    )
}

export default HomePage