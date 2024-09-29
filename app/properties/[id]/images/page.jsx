"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css'; // Import PhotoSwipe styles
import { getSingleProperty } from '@/utils/requests';
import LoadingPage from '@/app/loading'; // Import your loading component
import { useSession } from 'next-auth/react';
import updateImageTitle from '@/app/actions/updateImageTitle'; // Import your server action
import MiniSpinner from '@/components/MiniSpinner';
import { toast } from 'react-toastify';

const EditImageTitleModal = ({ isOpen, title, setTitle, onSave, onCancel, loadingSave }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-background px-4 py-6 rounded-md shadow-lg max-w-md w-full">
                <h2 className="text-md font-bold mb-1">Edit Image Title</h2>
                <p className='mb-2 text-sm font-normal'>Enter new image title</p>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 rounded w-full mb-4"
                />
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        className="bg-foreground text-white px-4 py-2 rounded-md hover:opacity-85"
                        onClick={onSave}
                        disabled={loadingSave}
                    >
                        {loadingSave ? <MiniSpinner color='#fff' /> : 'Save'}
                    </button>
                    <button
                        className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-85"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

const PropertyImages = ({ params: { id } }) => {
    const [property, setProperty] = useState(null);
    const [error, setError] = useState(null);
    const [newTitle, setNewTitle] = useState(""); // State to hold the new title for the image
    const [loadingSave, setLoadingSave] = useState(false); // State for save loading
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const [selectedImageIndex, setSelectedImageIndex] = useState(null); // State to track the selected image for editing
    const { data: session } = useSession();
    const userId = session?.user?.id; // Get logged-in user ID

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const fetchedProperty = await getSingleProperty(id); // Fetch the property data
                if (fetchedProperty) {
                    setProperty(fetchedProperty); // Set the property details
                } else {
                    setError('Property not found.');
                }
            } catch (error) {
                setError('Error fetching property: ' + error.message);
            }
        };

        fetchProperty(); // Call the fetch function
    }, [id]);

    if (!property) return <LoadingPage />; // Show loading component if no property found
    if (error) return <p>Error fetching property: {error}</p>; // Show error message

    // Check if property exists and has images
    const images = property?.images || [];
    const isOwner = userId === property?.owner; // Check if the user is the owner

    const handleEditClick = (index) => {
        setSelectedImageIndex(index); // Set the index of the selected image
        setNewTitle(property.images[index].title); // Set the current title as default
        setIsModalOpen(true); // Open the modal
    };

    const handleSaveClick = async () => {
        setLoadingSave(true);
        try {
            const response = await updateImageTitle(property._id, selectedImageIndex, newTitle); // Server action to update title
            if (response.success) {
                // Update local state to reflect the new title
                const updatedImages = [...property.images];
                updatedImages[selectedImageIndex].title = newTitle;
                setProperty((prev) => ({ ...prev, images: updatedImages }));
                setIsModalOpen(false); // Close the modal after saving
                toast.success('Image title changed successfully');
            } else {
                toast.error('Image title cannot be changed');
            }
        } catch (error) {
            toast.error('Image title cannot be changed');
        } finally {
            setLoadingSave(false);
        }
    };

    const handleCancelClick = () => {
        setIsModalOpen(false); // Close the modal without saving
    };

    const options = {
        bgOpacity: 0.8,
        wheelToZoom: true
    }

    return (
        <div className="container mx-auto px-5 md:px-10 lg:px-16 my-6">
            <h1 className="text-3xl font-semibold text-center mb-5">Property Images</h1>

            <div className="photoTour">
                {images.length > 0 ? (
                    <Gallery options={options} withCaption>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                            {images.map((image, index) => (
                                <div key={index} className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-[300px]">
                                    <Item
                                        original={image.url}
                                        thumbnail={image.url}
                                        width="1024"
                                        height="764"
                                        title={image.title}
                                        caption={image.title}
                                    >
                                        {({ ref, open }) => (
                                            <>
                                                <Image
                                                    src={image.url}
                                                    alt={image.title}
                                                    className="object-cover w-full h-full transform transition-transform duration-300 hover:scale-105"
                                                    fill
                                                    priority={index < 3}
                                                    width={0}
                                                    height={0}
                                                    sizes='50vw'
                                                    onClick={open}
                                                    ref={ref}
                                                />
                                                <h3 className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-75 text-center text-lg p-2">{image.title}</h3>
                                                {isOwner && (
                                                    <button
                                                        className="absolute bottom-2 right-2 bg-foreground text-white p-1 rounded"
                                                        onClick={() => handleEditClick(index)}
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </Item>
                                </div>
                            ))}
                        </div>
                    </Gallery>
                ) : (
                    <p className="mt-5 text-center text-lg">No images available for this property.</p>
                )}
            </div>

            {/* Modal for editing image title */}
            <EditImageTitleModal
                isOpen={isModalOpen}
                title={newTitle}
                setTitle={setNewTitle}
                onSave={handleSaveClick}
                onCancel={handleCancelClick}
                loadingSave={loadingSave}
            />
        </div>
    );
};

export default PropertyImages;
