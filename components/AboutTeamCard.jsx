import Image from 'next/image';
import React from 'react';

const AboutTeamCard = ({ image, name, role }) => {
    return (
        <div className="mb-8 hover:text-center transition-all duration-150">
            <div className='py-3 mb-2 md:mb-4 mt-6 hover:mt-2 flex items-center justify-center bg-[#5eead4] about-pattern rounded-md hover:rounded-2xl  hover:border-b-4 hover:border-r-4 border-foreground transition-all duration-150'>
                <Image
                    src={image}
                    alt={name}
                    className=" w-50 h-50 object-cover border-[#150d5a] rounded-full bg-white hover:scale-125 hover:border-b-4 hover:border-r-4 transition-all duration-150 "
                />
            </div>
            <h3 className="text-lg font-bold">{name}</h3>
            <p className="text-sm text-gray-500">{role}</p>
        </div>
    );
}

export default AboutTeamCard;
