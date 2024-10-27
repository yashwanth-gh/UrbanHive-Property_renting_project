"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { TbEdit, TbTrash } from "react-icons/tb";
import addPropImage from '@/public/images/addProp.png';
import deleteProperty from '@/app/actions/deleteProperty';
import MiniSpinner from '@/components/MiniSpinner'; // Adjust the path as needed
import { toast } from 'react-toastify';

const ProfileProperties = ({ userProperties: initialProperties }) => {
    const [properties, setProperties] = useState(initialProperties);
    const [showModal, setShowModal] = useState(false);
    const [propertyToDelete, setPropertyToDelete] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleDeleteClick = (property) => {
        setPropertyToDelete(property);
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        setLoading(true);
        try {
            await deleteProperty(propertyToDelete._id);
            setProperties(properties.filter(property => property._id !== propertyToDelete._id));
        } catch (error) {
            console.error('Error deleting property:', error);
        } finally {
            setLoading(false);
            setShowModal(false);
            setPropertyToDelete(null);
            toast.success('Property deleted successfully');
        }
    };

    const handleCancelDelete = () => {
        setShowModal(false);
        setPropertyToDelete(null);
    };

    if (properties.length === 0) {
        return (
            <div className="text-center">
                <Image
                    className='w-72 h-auto m-auto'
                    src={addPropImage}
                    alt="Property 1"
                    width={0}
                    height={0}
                    sizes='100vw'
                />
                <p className="text-lg font-semibold ">No properties found</p>
                <Link href="/properties/add">
                    <button className="bg-primary text-white px-4 py-2 rounded-md mt-4 hover:opacity-85 duration-150">
                        Add New Property
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <>
            {properties.map((property) => (
                <div className="mb-10 border-b pb-4" key={property._id}>
                    <Link href={`/properties/${property._id}`}>
                        <Image
                            className="h-40 w-full rounded-md object-cover object-center"
                            src={`${property.images[0]?.url}` || "/images/properties/a1.jpg"}
                            alt="Property 1"
                            width={0}
                            height={0}
                            sizes='100vw'
                        />
                    </Link>
                    <div className="mt-2">
                        <p className="text-lg font-semibold">{property?.name}</p>
                        <p className="text-border text-sm">Address: {property?.location.street}, {property?.location.city}</p>
                    </div>
                    <div className="mt-2">
                        <Link href={`/properties/${property._id}/edit`}
                            className="bg-primary text-white px-3 py-2.5 rounded-md mr-2 hover:bg-secondary hover:text-foreground duration-150"
                        ><TbEdit  className='inline mr-2 text-xs mb-1' />
                            Edit
                        </Link>
                        <button
                            className="bg-foreground text-primary-foreground px-3 py-2 rounded-md hover:bg-red-600 duration-150"
                            type="button"
                            onClick={() => handleDeleteClick(property)}
                        ><TbTrash className='inline mr-2 text-xs mb-1' />
                            Delete
                        </button>
                    </div>
                </div>
            ))}

            {/* Modal for confirmation */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-background px-4 py-6 rounded-md shadow-lg max-w-md w-full">
                        <h2 className="text-md font-bold mb-2">Confirm Deletion of {propertyToDelete.name}</h2>
                        <p className='text-sm'>Are you sure you want to delete this property?</p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                className="bg-foreground text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center"
                                onClick={handleConfirmDelete}
                                disabled={loading}
                            >
                                {loading ? <MiniSpinner loading={true} size={20} color="#ffffff" /> : 'Confirm'}
                            </button>
                            <button
                                className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-85"
                                onClick={handleCancelDelete}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProfileProperties;
