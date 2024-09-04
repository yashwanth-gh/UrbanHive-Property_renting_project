import Image from 'next/image'
import React from 'react'
import heroImage from '@/public/images/home/hero-test.jpg'
import PropertySearchForm from './PropertySearchForm'
const Hero = () => {
    return (
        <section className="hero">
            <Image
                src={heroImage}
                alt='hero-Image'
                className='h-full w-full object-cover'
                fill
            />
            <div className='hero-content'>
                <p className='text-xs montserrat-regular md:text-md text-primary'>REAL ESTATE</p>
                <h1 className=' text-3xl montserrat-extra sm:text-6xl text-balance mb-8 md:mb-24 lg:mb-28'>
                    Discover Your Hive, Where Dreams Thrive
                </h1>

                <PropertySearchForm />
            </div>
        </section>
    )
}

export default Hero
