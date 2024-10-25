import Image from 'next/image';
import React from 'react';

const AboutTeamCard = ({ image, name, role }) => {
    return (
        <div className="mb-8">
            <div className='py-4 mb-2 flex items-center justify-center bg-[#5eead4] about-pattern rounded-lg'>
                <Image
                    src={image}
                    alt={name}
                    className=" w-50 h-50 object-cover mb-4 border-2 rounded-full bg-white"
                />
            </div>
            <h3 className="text-lg font-bold">{name}</h3>
            <p className="text-sm text-gray-500">{role}</p>
        </div>
    );
}

export default AboutTeamCard;
