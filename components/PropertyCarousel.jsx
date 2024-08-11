import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaRegImage } from 'react-icons/fa'

const PropertyCarousel = ({ images, property }) => {


    return (
        <section className='container my-4 '>
            <h2 className='text-center text-xl md:text-2xl font-bold my-1 py-4'> Featured Images</h2>
            <div className="grid md:grid-cols-3 md:grid-rows-2 gap-3 grid-cols-1 grid-rows-3 md:max-h-96">
                <div className="md:col-span-2 md:row-span-2">
                    <Link
                        href={`/properties/${property._id}/images`}>
                        <Image
                            src={images[0]}
                            alt="Property 1"
                            width={0}
                            height={0}
                            sizes='100vw'
                            className="w-full h-full object-cover rounded-l-lg border hover:brightness-75 transition-all duration-150"
                            priority={true}
                        />
                    </Link>
                </div>
                <div className="col-span-1 row-span-1">
                    <Link
                        href={`/properties/${property._id}/images`}>
                        <Image
                            src={images[1]}
                            alt="Property 2"
                            width={0}
                            height={0}
                            sizes='100vw'
                            className="w-full h-full object-cover rounded-tr-lg border hover:brightness-75 transition-all duration-150"
                            priority={true}
                        />
                    </Link>
                </div>
                <div className="col-span-1 row-span-1 relative">
                    <Link
                        href={`/properties/${property._id}/images`}>
                        <Image
                            src={images[2]}
                            alt="Property 3"
                            width={0}
                            height={0}
                            sizes='100vw'
                            className="w-full h-full object-cover rounded-br-xl border hover:brightness-75 transition-all duration-150"
                            priority={true}
                        />
                    </Link>
                    <Link
                        href={`/properties/${property._id}/images`}
                        className="absolute bottom-4 right-4 text-foreground font-medium hover:text-primary-foreground flex items-center bg-background py-3 px-6 text-sm rounded-lg hover:bg-primary transition-colors duration-300 ease-in-out"
                    >
                        <FaRegImage />&nbsp;
                        View More
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default PropertyCarousel