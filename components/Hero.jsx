import Image from 'next/image'
import React from 'react'
import heroImage from '@/public/images/home/hero-test5.svg'
import heroImageMob from '@/public/images/home/hero-test.jpg'
import PropertySearchForm from './PropertySearchForm'
const Hero = () => {
    return (
        <section className="hero">
            <Image
                src={heroImage}
                alt='hero-Image'
                className='w-1/2 h-auto md:h-full md:w-full object-cover object-center '
                fill
            />
            <div className='hero-content'>
                <p className='text-xs font-semibold tracking-[0.4rem] montserrat-regular md:text-md text-primary-foreground'>·REAL ESTATE·</p>
                <h1 className=' text-3xl montserrat-extra sm:text-6xl text-balance mb-60 md:mb-96 lg:mb-60'>
                    Discover Your Hive, Where Dreams Thrive
                </h1>

                <PropertySearchForm />
            </div>
        </section>
    )
}

export default Hero
