import React, { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import addPropertyReview from '@/app/actions/addPropertyReview';
import { MdRateReview } from 'react-icons/md';

const PropertyReviewButton = ({ property }) => {
    const { data: session } = useSession();
    const userId = session?.user?.id;
    const [isOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState(1);
    const [reviewText, setReviewText] = useState('');
    const [loading, setLoading] = useState(false);

    // Open/Close modal accessibility improvements
    const closeModal = useCallback(() => {
        setIsOpen(false);
    }, []);

    useEffect(() => {
        const handleEscKey = (e) => {
            if (e.key === 'Escape') closeModal();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscKey);
        }
        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [isOpen, closeModal]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            toast.error('Please login to add a review!');
            return;
        }

        if (!property || !property._id) {
            toast.error('Invalid property. Please try again later.');
            return;
        }

        if (property.owner === userId) {
            toast.error('You cannot review your own property!');
            return;
        }

        if (reviewText.trim().length < 10) {
            toast.error('Review must be at least 10 characters long.');
            return;
        }

        setLoading(true);
        try {
            const response = await addPropertyReview({
                propertyId: property._id,
                userId,
                rating,
                reviewText,
            });

            if (response.success) {
                toast.success('Review added successfully!');
                setIsOpen(false);
                setRating(1);
                setReviewText('');
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error('Failed to add review. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button
                className="bg-foreground text-white font-bold py-2 px-4 rounded w-full my-2"
                onClick={() => setIsOpen(true)}
            >
                <MdRateReview className="inline mr-2" />
                Add Review
            </button>

            {isOpen && (
                <div className="modal" aria-labelledby="modal-title" aria-describedby="modal-description">
                    <div className="modal-backdrop" onClick={closeModal}></div>
                    <div className="modal-content p-6 bg-white rounded-lg shadow-lg relative" role="dialog" aria-modal="true">
                        <span
                            className="close cursor-pointer text-gray-600 absolute top-2 right-2 text-xl"
                            onClick={closeModal}
                        >
                            &times;
                        </span>
                        <h2 id="modal-title" className="text-lg font-bold mb-4">
                            Submit Your Review
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4 flex gap-2 justify-start items-center">
                                <label className="block mb-1 font-semibold" htmlFor="rating">
                                    Rate the Property:
                                </label>
                                <select
                                    id="rating"
                                    value={rating}
                                    onChange={(e) => setRating(Number(e.target.value))}
                                    className="border rounded-md px-3 py-2"
                                >
                                    {[1, 2, 3, 4, 5].map((r) => (
                                        <option key={r} value={r}>
                                            {r}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <textarea
                                    placeholder="Add your review here"
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    required
                                    minLength={10}
                                    className="border rounded-md w-full px-3 py-2"
                                    aria-describedby="modal-description"
                                />
                            </div>
                            <div className="flex justify-end space-x-4 mt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="bg-foreground text-white font-bold py-2 px-4 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`bg-primary text-white font-bold py-2 px-4 rounded ${loading && 'opacity-50'}`}
                                >
                                    {loading ? 'Submitting...' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropertyReviewButton;
