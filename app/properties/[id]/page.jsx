"use client";
import React, { useEffect, useState } from 'react';
import { getSingleProperty } from '@/utils/requests';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import property_not_found from '@/public/images/properties/property_not_found.svg';
import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import LoadingPage from '@/app/loading';
import Link from 'next/link';
import PropertyPageDetails from '@/components/PropertyPageDetails';
import { TbArrowBackUp ,TbBell  } from "react-icons/tb";
import PropertyCarousel from '@/components/PropertyCarousel';
import BookmarkButton from '@/components/BookmarkButton';
import ShareButton from '@/components/ShareButton';
import PropertyContactForm from '@/components/PropertyContactForm';
import { useSession } from 'next-auth/react';
import Accordion from '@/components/Accordion';
import AccordionItem from '@/components/AccordionItem';
import PropertyPayment from '@/components/PropertyPayment';

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
        };
        if (property === null) fetchProperty();
    }, [id, property]);

    if (!property && !loading)
        return (
            <div className='h-screen w-full container flex flex-col items-center justify-center md:justify-start'>
                <Image className='' src={property_not_found} />
                <h3 className='text-lg md:text-2xl -mt-6 font-semibold'>This Property is not existing</h3>
            </div>
        );

    useEffect(() => {
        const remindLaterFlag = sessionStorage.getItem(`remindLater_${id}`);
        if (!loading && userId === property?.owner && property?.images[0]?.title === "Image title" && !remindLaterFlag) {
            setShowModal(true);
        }
    }, [loading, property]);

    const handleCloseModal = () => {
        sessionStorage.setItem(`remindLater_${id}`, 'true');
        setShowModal(false);
    };

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
                        <TbArrowBackUp  className='mr-2 text-lg' /> Back to Properties
                    </Link>
                </div>
            </div>

            <section className="container bg-secondary rounded-b-lg">
                <div className="m-auto py-10 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-70/30 w-full gap-6">
                        {!loading && property && <PropertyPageDetails property={property} />}

                        {!loading && property &&
                            <aside className="space-y-3">
                                <div className='flex flex-col gap-2 md:flex-row lg:flex-col'>
                                    <BookmarkButton property={property} />
                                    <ShareButton property={property} />
                                </div>
                                <PropertyPayment property={property}/>
                                <Accordion>
                                    <AccordionItem title="Contact manager">
                                        <PropertyContactForm property={property} />
                                    </AccordionItem>
                                </Accordion>
                            </aside>
                        }
                    </div>
                </div>
            </section>

            {!loading && property && <PropertyCarousel images={property?.images} property={property} />}

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
                                <TbBell  className='inline  mr-2' />Later
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
    );
};

export default PropertyPage;
