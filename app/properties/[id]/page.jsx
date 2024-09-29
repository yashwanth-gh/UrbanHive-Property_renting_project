"use client"
import React, { useEffect, useState } from 'react';
import { getSingleProperty } from '@/utils/requests';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import property_not_found from '@/public/images/properties/property_not_found.svg';
import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import LoadingPage from '@/app/loading';
import Link from 'next/link';
import PropertyPageDetails from '@/components/PropertyPageDetails';
import { FaChevronCircleLeft, FaRegBell } from 'react-icons/fa';
import PropertyCarousel from '@/components/PropertyCarousel';
import BookmarkButton from '@/components/BookmarkButton';
import ShareButton from '@/components/ShareButton';
import PropertyContactForm from '@/components/PropertyContactForm';
import { useSession } from 'next-auth/react';


const PropertyPage = () => {
    const [loading, setLoading] = useState(true);
    const [property, setProperty] = useState(null);
    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    const { data: session } = useSession();
    const userId = session?.user?.id;

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

    useEffect(() => {
        // Check if the "Remind Me Later" flag is set in session storage
        const remindLaterFlag = sessionStorage.getItem(`remindLater_${id}`);

        // If the first image title is "Image title" and the remindLaterFlag is not set, show the modal
        if (!loading && userId === property?.owner && property?.images[0]?.title === "Image title" && !remindLaterFlag) {
            setShowModal(true);
        }
    }, [loading, property]);

    // Function to handle the "Remind Me Later" button (closes modal and sets session storage)
    const handleCloseModal = () => {
        // Set the "Remind Me Later" flag in session storage, tied to the specific property ID
        sessionStorage.setItem(`remindLater_${id}`, 'true');
        setShowModal(false);
    };

    // Function to handle the "Edit Images" button (redirects to edit page)
    const handleEditRedirect = () => {
        setShowModal(false);
        router.push(`/properties/${id}/images`);
    };




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
            {/* Modal for Image Title Check */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Image Title Missing</h2>
                        <p className="mb-4 text-sm">It seems that the some images doesn't have a title. Would you like to add one?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="bg-destructive text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                                onClick={handleCloseModal}
                            >
                                <FaRegBell className='inline  mr-2' />Later
                            </button>
                            <button
                                className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
                                onClick={handleEditRedirect}
                            >
                                Add now
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default PropertyPage