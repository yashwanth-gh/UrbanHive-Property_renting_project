import React from 'react';
import { TbStar ,TbStarHalf   } from "react-icons/tb";




const PropertyRating = ({ rating, textSize = 'text-sm', showAllStars = true }) => {
    //round of rating to last 2 digits after decimal point
    rating = parseFloat(rating).toFixed(1);
    rating = (rating % 1 == 0 ? parseInt(rating) : rating)
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    if (!showAllStars) {
        return (
            <div className={`flex justify-start items-center ${textSize}`}>
                {/* <TbStar className='text-foreground bg-yellow-300 p-0.5 text-lg rounded-sm border border-black' /> */}
                ⭐
                <p className={`${textSize} text-foreground`}>&nbsp;{rating}/5</p>
            </div>
        );
    }

    return (
        <div className={`flex text-yellow-500 justify-start items-center ${textSize} p-1 gap-x-1`}>
            {[...Array(fullStars)].map((_, index) => (
                <TbStar key={`full-${index}`} className='text-foreground bg-yellow-300 p-0.5 text-lg rounded-sm border border-black' />
            ))}
            {[...Array(halfStars)].map((_, index) => (
                <TbStarHalf  key={`half-${index}`} className='text-foreground half-yellow-bg p-0.5 text-lg rounded-sm border border-black' />
            ))}
            {[...Array(emptyStars)].map((_, index) => (
                <TbStar key={`empty-${index}`} className='text-foreground  p-0.5 text-lg rounded-sm border border-black' />
            ))}
            <p className={`${textSize} text-foreground`}>&nbsp;{rating}/5</p>
        </div>
    );
};

export default PropertyRating;
