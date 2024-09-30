import Image from 'next/image'
import React from 'react'
import heroImageMobile from '@/public/images/home/hero-test5.svg'
import heroImage from '@/public/images/home/hero-test4.jpg'
import PropertySearchForm from './PropertySearchForm'
const Hero = () => {
    return (
        <section className="hero">
            <Image
                src={heroImage}
                alt='hero-Image'
                className='w-1/2 h-auto md:h-full md:w-full object-cover  object-top md:object-left-bottom'
                fill
            />
            <div className='hero-content'>
                <p className='text-xs font-semibold tracking-[0.4rem] montserrat-regular md:text-md text-primary-foreground'>·REAL ESTATE·</p>
                <h1 className=' text-3xl montserrat-extra sm:text-4xl md:text-6xl lg:text-[44px] text-balance mb-60 md:mb-96 lg:mb-56'>
                    Discover Your Hive,<br /> Where Dreams Thrive
                </h1>

                <div className=''>
                    <PropertySearchForm />

                </div>
            </div>
        </section>
    )
}

export default Hero
