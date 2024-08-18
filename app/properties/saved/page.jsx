import PropertyCard from '@/components/PropertyCard';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser'
import React from 'react'

const SavedProperties = async () => {
    const { userId } = await getSessionUser();

    const { bookmarks } = await User.findById(userId).populate('bookmarks');


    return (
        <section className='px-4 py-6'>
            <div className='container lg:container m-auto px-4 py-6'>
                <h1 className='text-2xl mb-4'>Saved Properties</h1>
                {bookmarks.length === 0 ? (
                    <p>No saved properties</p>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-3'>
                        {bookmarks.map(property => (
                            <PropertyCard property={property} key={property._id} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );

}

export default SavedProperties