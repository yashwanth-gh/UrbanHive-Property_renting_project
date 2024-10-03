import React from 'react';
import { FaStar, FaStarHalf } from 'react-icons/fa';

const PropertyRating = ({ rating, textSize = 'text-sm', showAllStars = true }) => {
    //round of rating to last 2 digits after decimal point
    rating = parseFloat(rating).toFixed(1);
    rating = (rating % 1 == 0 ? parseInt(rating) : rating)
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    if (!showAllStars) {
        return (
            <div className={`flex text-yellow-500 justify-start items-center ${textSize}`}>
                <FaStar />
                <p className={`${textSize} text-foreground`}>&nbsp;{rating}/5</p>
            </div>
        );
    }

    return (
        <div className={`flex text-yellow-500 justify-start items-center ${textSize} p-1 gap-x-0.5`}>
            {[...Array(fullStars)].map((_, index) => (
                <FaStar key={`full-${index}`} />
            ))}
            {[...Array(halfStars)].map((_, index) => (
                <FaStarHalf key={`half-${index}`} />
            ))}
            {[...Array(emptyStars)].map((_, index) => (
                <FaStar className='text-gray-300' key={`empty-${index}`} />
            ))}
            <p className={`${textSize} text-foreground`}>&nbsp;{rating}/5</p>
        </div>
    );
};

export default PropertyRating;
