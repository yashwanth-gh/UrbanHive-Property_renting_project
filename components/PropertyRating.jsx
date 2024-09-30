import React from 'react'
import { FaStar, FaStarHalf } from 'react-icons/fa'

const PropertyRating = () => {
    return (
        <div>
            <div className='flex text-yellow-500 justify-center items-center'>
                <FaStar />
                <FaStar className='hidden md:block' />
                <FaStar className='hidden md:block' />
                <FaStar className='hidden md:block' />
                <FaStarHalf className='hidden md:block' />
                <p className='text-sm text-foreground ml-1'>4.5/5</p>
            </div>
        </div>
    )
}

export default PropertyRating