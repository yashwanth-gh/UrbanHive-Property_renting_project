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


const PropertyPage = () => {
    const [loading, setLoading] = useState(true);
    const [property, setProperty] = useState(null);
    const { id } = useParams();
    console.log(property)

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

            <section className="bg-secondary">
                <div className="container m-auto py-10 px-6">
                    <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">

                        {!loading && property && <PropertyPageDetails property={property} />}

                        <aside className="space-y-4">
                            <button
                                className="bg-primary hover:opacity-90 text-white font-bold w-full py-2 px-4 rounded-md hover:rounded-xl flex items-center justify-center"
                            >
                                <i className="fas fa-bookmark mr-2"></i> Bookmark Property
                            </button>
                            <button
                                className="bg-foreground hover:opacity-90 text-white font-bold w-full py-2 px-4 rounded-md hover:rounded-xl flex items-center justify-center"
                            >
                                <i className="fas fa-share mr-2"></i> Share Property
                            </button>

                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
                                <form>
                                    <div className='mb-4'>
                                        <label
                                            className='block text-gray-700 text-sm font-bold mb-2'
                                            htmlFor='name'
                                        >
                                            Name:
                                        </label>
                                        <input
                                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='name'
                                            type='text'
                                            placeholder='Enter your name'
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="email"
                                        >
                                            Email:
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label
                                            className='block text-gray-700 text-sm font-bold mb-2'
                                            htmlFor='phone'
                                        >
                                            Phone:
                                        </label>
                                        <input
                                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='phone'
                                            type='text'
                                            placeholder='Enter your phone number'
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="message"
                                        >
                                            Message:
                                        </label>
                                        <textarea
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                                            id="message"
                                            placeholder="Enter your message"
                                        ></textarea>
                                    </div>
                                    <div>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
                                            type="submit"
                                        >
                                            <i className="fas fa-paper-plane mr-2"></i> Send Message
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>


        </section>
    )
}

export default PropertyPage