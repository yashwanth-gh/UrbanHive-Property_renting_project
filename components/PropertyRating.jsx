import React from 'react';
import { FaStar, FaStarHalf } from 'react-icons/fa';

const PropertyRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
        <div className='flex text-yellow-500 justify-start items-center text-sm p-1 gap-x-0.5'>
            {[...Array(fullStars)].map((_, index) => (
                <FaStar key={`full-${index}`} />
            ))}
            {[...Array(halfStars)].map((_, index) => (
                <FaStarHalf key={`half-${index}`} />
            ))}
            {[...Array(emptyStars)].map((_, index) => (
                <FaStar className='text-gray-300' key={`empty-${index}`} />
            ))}
            <p className='text-sm text-foreground'>&nbsp;{rating}/5</p>
        </div>
    );
};

export default PropertyRating;
