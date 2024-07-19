import React from 'react'
import PropertyCard from '@/components/PropertyCard';
import Link from 'next/link';

import { getProperties } from '@/utils/requests';

const FeaturedProperties = async () => {
    const properties = await getProperties();

    const recentProperties = properties.sort(() => Math.random() - Math.random()).slice(0, 3);

    return (
        <section className='py-10 px-4 bg-secondary my-8'>
            <div className="">
                <h2 className='text-2xl font-semibold text-center'>Featured Properties</h2>
                <div className="container-xl lg:container m-auto px-4 py-6">
                    {(recentProperties.length === 0) ? (
                        <div className="text-center text-gray-500">No properties available</div>
                    ) : (<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {recentProperties.map((property) => (
                            <PropertyCard
                                key={property.id}
                                property={property}
                            />
                        ))}
                    </div>)}

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