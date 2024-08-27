import PropertyCard from '@/components/PropertyCard';
import PropertySearchForm from '@/components/PropertySearchForm';
import DB_Connect from '@/config/DB_Connect'
import Property from '@/models/Property';
import { convertToSerializableObjects } from '@/utils/convertToObjects';
import Link from 'next/link';
import React from 'react'
import { FaArrowAltCircleLeft } from 'react-icons/fa';

const SearchPage = async ({ searchParams: { location, propertyType } }) => {
    await DB_Connect();

    const locationPattern = new RegExp(location, 'i');

    let query = {
        $or: [
            { name: locationPattern },
            { description: locationPattern },
            { 'location.street': locationPattern },
            { 'location.city': locationPattern },
            { 'location.state': locationPattern },
            { 'location.zipcode': locationPattern },
        ]
    };

    if (propertyType && propertyType !== 'All') {
        const typePattern = new RegExp(propertyType, 'i');
        query.type = typePattern;
    }
    const propertyQueryResults = await Property.find(query).lean();
    const properties = convertToSerializableObjects(propertyQueryResults);

    return (
        <>
            <section className='container bg-emerald-100 pb-8 pt-4'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <PropertySearchForm />
                </div>
            </section>

            <section className='px-4 py-6 container'>
                <div className='m-auto px-4 py-2 block'>
                    <Link href='/properties' className='flex items-center text-foreground hover:underline hover:text-blue-400 mb-3 w-fit'>
                        <FaArrowAltCircleLeft className='mr-2' />&nbsp;Back To Properties
                    </Link>
                    <h1 className='text-2xl  mb-4 text-center font-semibold'>-: Search results :-</h1>
                    {properties.length > 0 ? (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {properties.map((property) => (
                                <PropertyCard key={property._id} property={property} />
                            ))}
                        </div>
                    ) : (
                        <p className='text-gray-400 text-center py-24'>No properties found matching your search criteria.</p>
                    )}
                </div>
            </section>

        </>
    )
}

export default SearchPage