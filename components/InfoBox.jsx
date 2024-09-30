import React from 'react'
import Image from 'next/image'
import Link from 'next/link';

const InfoBox = ({
    backgroundColor = 'bg-primary-foreground',
    textColor = 'text-foreground',
    btnColor = 'bg-primary',
    btnTextColor = 'text-primary-foreground',
    boxHeading = 'Heading',
    children = 'Lorem ipsum dolor sit, amet consectetur adipisicing tenetur.',
    btnText = 'Button',
    extraBoxStyle = '',
    btnLink,
    imgSrc = null, // Optional image source
    imgAlt = 'Image description', // Alt text for the image
    imgClass = "",// Custom image styling
    flexRowReverse = false, // Reverse the flex direction
}) => {
    return (
        <div className={`${backgroundColor} ${textColor} ${extraBoxStyle} text-center p-3 rounded-lg shadow-lg border border-border`}>
            <div className={`flex justify-center items-center ${flexRowReverse && 'flex-row-reverse'}`} >
                {/* Conditionally render image if imgSrc is provided */}
                {imgSrc && (
                    <Image
                        src={imgSrc}
                        alt={imgAlt}
                        className={`mx-auto my-4 hidden lg:block rounded-lg w-[190px] h-auto ${imgClass}`} // Smaller on larger screens
                    />
                )}
                <div className='lg:mb-1 '>
                    <h2 className="text-2xl font-bold">{boxHeading}</h2>
                    <p className="mt-3 mb-4 text-balance">
                        {children}
                    </p>
                </div>
            </div>
            <Link
                href={btnLink}
                className={`inline-block ${btnColor} ${btnTextColor} rounded-lg w-full px-4 py-2 font-semibold hover:opacity-85 hover:shadow-md hover:shadow-gray-400`}
            >
                {btnText}
            </Link>
        </div>
    )
}

export default InfoBox;
