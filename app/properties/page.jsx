import React from 'react'
import properties from '@/properties.json';
import PropertyCard from '@/components/PropertyCard';
const PropertiesPage = () => {
    return (
        <section className="px-4 py-6">
            <div className="container-xl lg:container m-auto px-4 py-6">
                {(properties.length === 0) ? (
                    <div className="text-center text-gray-500">No properties available</div>
                ) : (<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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