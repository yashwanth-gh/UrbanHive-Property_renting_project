import PropertyEditForm from '@/components/PropertyEditForm'
import DB_Connect from '@/config/DB_Connect'
import Property from '@/models/Property';
import { convertToSerializableObjects } from '@/utils/convertToObjects';
import property_not_found from '@/public/images/properties/property_not_found.svg';
import Image from 'next/image';
import { getSessionUser } from '@/utils/getSessionUser';
import { redirect } from 'next/navigation';

const PropertyEditPage = async ({ params }) => {
    await DB_Connect();
    const propertyDoc = await Property.findById(params.id).lean();
    if (!propertyDoc) {
        return (
            <div className=' h-screen w-full container flex flex-col items-center justify-center md:justify-start'>
                <Image
                    className=''
                    src={property_not_found}
                />

                <h2 className='text-lg md:text-2xl -mt-6 font-semibold'>Nothing to Edit</h2>
                <h3 className='text-lg md:text-2xl font-semibold'>This Property is not existing</h3>
            </div>
        )
    }
    const property = convertToSerializableObjects(propertyDoc);
    const sessionUser = await getSessionUser();
    if (!sessionUser) {
        throw new Error("No Session : Please Login again!")
    }
    if (sessionUser.userId !== property.owner) {
        redirect(`/properties/${property._id}`)
    }
    return (
        <section className='container'>
            <div className='m-auto max-w-4xl py-12'>
                <div className='px-6 py-8 mb-8 m-4 md:m-0'>
                    <PropertyEditForm property={property} />
                </div>
            </div>
        </section>
    )
}

export default PropertyEditPage