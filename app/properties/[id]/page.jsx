"use client"
import React, { useEffect, useState } from 'react';
import { getSingleProperty } from '@/utils/requests';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import property_not_found from '@/public/images/properties/property_not_found.svg';
import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import LoadingPage from '@/app/loading';
import Link from 'next/link';
import PropertyPageDetails from '@/components/PropertyPageDetails';
import { FaChevronCircleLeft } from 'react-icons/fa';
import PropertyCarousel from '@/components/PropertyCarousel';
import BookmarkButton from '@/components/BookmarkButton';
import ShareButton from '@/components/ShareButton';
import PropertyContactForm from '@/components/PropertyContactForm';


const PropertyPage = () => {
    const [loading, setLoading] = useState(true);
    const [property, setProperty] = useState(null);
    const { id } = useParams();
    // console.log(property)

    useEffect(() => {
        const fetchProperty = async () => {
            if (!id) return;
            try {
                const property = await getSingleProperty(id);
                setProperty(property);
            } catch (error) {
                console.error('Error fetching property:', error);
            } finally {
                setLoading(false);
            }
        }
        if (property === null) fetchProperty();
    }, [id, property])

    if (!property && !loading)
        return (
            <div className=' h-screen w-full container flex flex-col items-center justify-center md:justify-start'>
                <Image
                    className=''
                    src={property_not_found}
                />
                <h3 className='text-lg md:text-2xl -mt-6 font-semibold'>This Property is not existing</h3>
            </div>
        );


    return (
        <section className='container'>
            {loading && <LoadingPage />}
            {!loading && property && <PropertyHeaderImage property={property} />}
            <div className='inline-block absolute top-14 left-2'>
                <div className="container m-auto py-6 px-6 text-sm">
                    <Link
                        href="/properties"
                        className="text-foreground font-medium hover:text-primary-foreground flex items-center bg-background p-2 rounded-lg hover:bg-primary transition-colors duration-300 ease-in-out"
                    >
                        <FaChevronCircleLeft className='mr-2 text-lg' /> Back to Properties
                    </Link>
                </div>
            </div>

            <section className="container bg-secondary rounded-b-lg">
                <div className=" m-auto py-10 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">

                        {!loading && property && <PropertyPageDetails property={property} />}

                        <aside className="space-y-4">
                            <BookmarkButton property={property} />
                            <ShareButton property={property} />
                            <PropertyContactForm property={property} />
                        </aside>
                    </div>
                </div>
            </section>
            {!loading && property && <PropertyCarousel images={property?.images} property={property} />}
        </section>
    )
}

export default PropertyPage