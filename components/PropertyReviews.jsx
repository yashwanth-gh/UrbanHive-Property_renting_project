import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { formatTimeElapsed } from '@/utils/calculateTime';
import PropertyRating from './PropertyRating';

const PropertyReviews = ({ reviews = [] }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Handle open modal with safety for empty reviews
    const handleOpenModal = () => {
        if (!reviews.length) {
            // Limit toast message to avoid multiple triggers
            if (!toast.isActive('no-reviews')) {
                toast.info("No reviews available for this property.", { toastId: 'no-reviews' });
            }
        } else {
            setIsOpen(true);
        }
    };

    // Close modal and handle escape key
    const handleCloseModal = useCallback(() => {
        setIsOpen(false);
    }, []);

    // Disable background scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            // Disable scroll
            document.body.classList.add('overflow-hidden');
        } else {
            // Re-enable scroll
            document.body.classList.remove('overflow-hidden');
        }
        // Cleanup on component unmount or when modal closes
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isOpen]);

    // Close modal on escape key press
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape') {
                handleCloseModal();
            }
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscKey);
        }
        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [isOpen, handleCloseModal]);

    return (
        <div>
            <button
                className="text-blue-500 font-bold underline"
                onClick={handleOpenModal}
            >
                Show all reviews ({reviews.length})
            </button>

            {isOpen && (
                <div className="modal">
                    <div className="modal-content relative">
                        <span className="close cursor-pointer absolute top-2 right-2 text-gray-500 text-2xl" onClick={handleCloseModal}> 
                            <h3 className='text-foreground text-2xl px-1.5 mr-2 font-semibold rounded-md border-black border-b-4 border-l-4 border' >#</h3>
                        </span>
                        <h2 className="modal-title text-lg font-semibold mb-4">Reviews</h2>
                        <div className="reviews-container">
                            {reviews.length > 0 ? (
                                reviews.map((review) => (
                                    <div key={review._id} className="review mb-4 border rounded-lg">
                                        <div className="review-header flex items-center mb-2">
                                            <Image
                                                src={review?.user?.image || '/fallback-avatar.png'}
                                                alt={review?.user?.username || 'Unknown User'}
                                                className="review-avatar rounded-full"
                                                width={50}
                                                height={50}
                                                layout="fixed"
                                            />
                                            <div className='ml-2'>
                                                <h3 className='text-md font-semibold'>
                                                    {review?.user?.username || 'Anonymous'}
                                                </h3>
                                                <p className='text-sm text-gray-600'>
                                                    {formatTimeElapsed(review?.createdAt || new Date())}
                                                </p>
                                            </div>
                                        </div>
                                        <PropertyRating rating={review?.rating || 0} />
                                        <p className='pl-1.5 mt-2 text-gray-700'>{review?.reviewText || 'No review provided.'}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No reviews found.</p>
                            )}
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={handleCloseModal}></div>
                </div>
            )}
        </div>
    );
};

export default PropertyReviews;
