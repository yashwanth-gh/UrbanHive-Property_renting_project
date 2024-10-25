"use client";
import PropertyCard from "@/components/PropertyCard";
import Link from "next/link";
import { getProperties } from "@/utils/requests";
import React, { useState, useEffect, useRef } from "react";
import BlazeSlider from "blaze-slider";
import "blaze-slider/dist/blaze.css"; // Import BlazeSlider CSS
import MiniSpinner from "./MiniSpinner";
import { TbArrowBigLeft ,TbArrowBigRight  } from "react-icons/tb";


const FeaturedProperties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true); // State to track loading
    const sliderRef = useRef();
    const elRef = useRef();

    // Fetch properties asynchronously inside useEffect
    useEffect(() => {
        const fetchProperties = async () => {
            const { properties } = await getProperties();
            // Randomly select 4 properties to feature
            const featuredProperties = properties
                ?.sort(() => Math.random() - Math.random())
                ?.slice(0, 6);
            setProperties(featuredProperties);
            setLoading(false); // Stop loading when properties are fetched
        };

        fetchProperties();
    }, []);

    // Initialize BlazeSlider after DOM updates
    useEffect(() => {
        if (!sliderRef.current && properties?.length > 0) {
            // Mobile-first approach: Start from mobile, and then define larger screen configurations
            sliderRef.current = new BlazeSlider(elRef.current, {
                all: {
                    draggable: true,
                    enablePagination: false,
                    loop: true,
                    enableAutoplay: true,
                    slideGap: '3px', // Set width between the slides to 10px
                    stopAutoplayOnInteraction: true,
                    slidesToShow: 4, // Default for desktop
                    slidesToScroll: 1,
                    autoplayInterval: 3000, // Autoplay interval in milliseconds
                    transitionDuration: 1000,
                    transitionTimingFunction: 'cubic-bezier(0.5, 0, 0.5, 1)',
                },
                '(max-width: 900px)': {
                    slidesToShow: 2, // Tablet configuration
                },
                '(max-width: 500px)': {
                    slidesToShow: 1, // Mobile configuration
                },
            });

        }
    }, [properties]);

    return (
        <section className="py-10 px-4 bg-secondary my-8">
            <div>
                <h2 className="text-2xl font-semibold text-center">Featured Properties</h2>
                <div className="container-xl lg:container m-auto px-4 py-6">
                    {loading ? ( // Show loading message until data is fetched and slider is initialized
                        <div className="text-center text-gray-500"><MiniSpinner /></div>
                    ) : properties?.length === 0 ? (
                        <div className="text-center text-gray-500">No properties available</div>
                    ) : (
                        <div className="blaze-slider" ref={elRef}>
                            <div className="blaze-container">

                                <div className="blaze-track-container">
                                    <div className="blaze-track">
                                        {properties?.map((property) => (
                                            <div className="blaze-slide" key={property?._id}>
                                                <PropertyCard property={property} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="blaze-controls flex justify-between mt-3 px-8">
                                    <button
                                        className="blaze-prev"
                                        aria-label="Go to previous slide"
                                    ><TbArrowBigLeft  className="text-xl text-primary-foreground" /></button>
                                    <button
                                        className="blaze-next"
                                        aria-label="Go to next slide"
                                    ><TbArrowBigRight className="text-xl text-primary-foreground" /></button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="container text-center mb-10">
                <Link
                    href={"/properties"}
                    className="bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-md"
                >
                    View All Properties
                </Link>
            </div>
        </section>
    );
};

export default FeaturedProperties;













/*
import PropertyCard from '@/components/PropertyCard';
import Link from 'next/link';
import { getProperties } from '@/utils/requests';

const FeaturedProperties = async () => {
    const properties = await getProperties();

    // Randomly select 4 properties to feature
    const featuredProperties = properties.sort(() => Math.random() - Math.random()).slice(0, 4);

    return (
        <section className='py-10 px-4 bg-secondary my-8'>
            <div>
                <h2 className='text-2xl font-semibold text-center'>Featured Properties</h2>
                <div className="container-xl lg:container m-auto px-4 py-6">
                    {(featuredProperties.length === 0) ? (
                        <div className="text-center text-gray-500">No properties available</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredProperties.map((property) => (
                                <PropertyCard key={property?._id} property={property} />
                            ))}
                        </div>
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
    );
};

export default FeaturedProperties;
 */