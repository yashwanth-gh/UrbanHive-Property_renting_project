import React from 'react';
import heroImageMobile from '@/public/images/home/about.jpg'
import UrbanHive_transparent_logo from '@/assets/images/logo-no-background.png'
import Image from 'next/image';

const AboutPage = () => {
    return (
        <section className="about">
            <Image
                src={heroImageMobile}
                alt='hero-Image'
                className='w-1/2 h-auto md:h-full md:w-full object-cover object-center brightness-75'
                fill
            />
            <div className='about-content gap-20 md:gap-40'>
                <Image
                    src={UrbanHive_transparent_logo}
                    className='h-16 md:h-36 w-auto'
                    alt='logo'
                    priority
                />
                <h2 className='text-2xl md:text-4xl text-[#f9d265] font-semibold'>
                    About us
                </h2>
            </div>
        </section>
    )

};

export default AboutPage;
