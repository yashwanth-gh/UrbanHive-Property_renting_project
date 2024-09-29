import React from 'react'
import PropertyCard from '@/components/PropertyCard';
import { getProperties } from '@/utils/requests';
import PaginationComponent from '@/components/PaginationComponent';

const PropertiesPage = async ({ searchParams: { page = 1, pageSize = 6 } }) => {
    const { properties, total, pageSize: docPerPage, page: presentPage } = await getProperties(page, pageSize);

    // properties?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return (
        <section className="container">
            <div className="container-xl lg:container m-auto px-4 py-6">
                {(properties?.length === 0) ? (
                    <div className="text-center text-gray-500">No properties available</div>
                ) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {properties?.map((property) => (
                        <PropertyCard
                            key={property._id}
                            property={property}
                        />
                    ))}
                </div>)}
            </div>
            <div className='flex justify-center m-auto px-3 py-8 mb-10'>
                <PaginationComponent page={presentPage || page} pageSize={docPerPage || pageSize} totalItems={total} />
            </div>
        </section>

    )
}

export default PropertiesPage