"use client"
import React from 'react'
import PropertyCard from '@/components/PropertyCard';
import Link from 'next/link';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { getProperties } from '@/utils/requests';
import '@splidejs/react-splide/css';
// import '@splidejs/react-splide/css/skyblue';
// import '@splidejs/react-splide/css/sea-green';
// import '@splidejs/react-splide/css/core';

const FeaturedProperties = async () => {
    const properties = await getProperties();

    const recentProperties = properties.sort(() => Math.random() - Math.random()).slice(0, 5);

    return (
        <section className='py-10 px-4 bg-secondary my-8'>
            <div className="">
                <h2 className='text-2xl font-semibold text-center'>Featured Properties</h2>
                <div className="container-xl lg:container m-auto px-4 py-6 ">
                    {(recentProperties.length === 0) ? (
                        <div className="text-center text-gray-500">No properties available</div>
                    ) : (

                        <Splide
                            options={{
                                perPage: 4,
                                perMove: 1,
                                arrows: true,
                                pagination: true,
                                drag: 'free',
                                gap: '1rem',
                                type: 'loop',
                                focus: 'center',
                                autoplay: true,
                                interval: 3000,
                                padding: { top: '1rem', bottom: '1rem' },
                                preloadPages: 1,
                                breakpoints: {
                                    768: {
                                        perPage: 1, // On smaller screens show 1 slide at a time
                                    },
                                    1024: {
                                        perPage: 2, // On medium screens show 2 slides at a time
                                    },
                                },
                            }}
                        >
                            {recentProperties.map((property) => (
                                <SplideSlide key={property.id}>
                                    <PropertyCard property={property} />
                                </SplideSlide>
                            ))}
                        </Splide>

                    )}

                </div>
            </div>
            <div className='container text-center mb-10'>
                <Link
                    href={"/properties"}
                    className='bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-md'
                >
                    View All Properties
                </Link>
            </div>
        </section>
    )
}

export default FeaturedProperties