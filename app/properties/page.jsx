import React from 'react'
import PropertyCard from '@/components/PropertyCard';
import { getProperties } from '@/utils/requests';

const PropertiesPage = async () => {
    const properties = await getProperties();
    properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return (
        <section className="px-4 py-6">
            <div className="container-xl lg:container m-auto px-4 py-6">
                {(properties.length === 0) ? (
                    <div className="text-center text-gray-500">No properties available</div>
                ) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {properties.map((property) => (
                        <PropertyCard
                            key={property.id}
                            property={property}
                        />
                    ))}
                </div>)}

            </div>
        </section>

    )
}

export default PropertiesPage