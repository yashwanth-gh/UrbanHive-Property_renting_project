import Image from 'next/image'
import React from 'react'

const PropertyHeaderImage = ({ property }) => {
    return (
        <>
            <div className='grid grid-cols-1 -mx-3 lg:-mx-6'>
                <Image
                    src={`${property.images[0]?.url}`}
                    width={0}
                    height={0}
                    alt='property_header_image'
                    sizes='100vw'
                    className='h-80 w-full object-cover object-center filter brightness-75'
                    priority />
            </div>
        </>
    )
}

export default PropertyHeaderImage