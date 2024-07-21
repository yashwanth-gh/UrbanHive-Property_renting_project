import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaBed, FaMapMarkerAlt, FaMoneyCheck, FaRulerCombined, FaShower } from 'react-icons/fa';

const PropertyCard = ({ property }) => {

    const getRateDisplay = () => {
        const { rates } = property;

        if (rates.monthly) {
            return `${rates.monthly.toLocaleString()}/mon`;
        }
        if (rates.weekly) {
            return `${rates.weekly.toLocaleString()}/wk`;
        }
        if (rates.nightly) {
            return `${rates.nightly.toLocaleString()}/night`;
        }
    }
    return (
        <div className="rounded-lg shadow-md relative bg-primary-foreground border border-input">
            <Image
                src={`/images/properties/${property.images[0]}`}
                alt=""
                height={0}
                width={0}
                sizes='100vw'
                className='w-full h-auto rounded-t-lg'
            />
            <div className="p-4">
                <div className="text-left md:text-center lg:text-left mb-6">
                    <div className="text-border">{property.type}</div>
                    <h3 className="text-xl lg:text-2xl font-bold">{property.name}</h3>
                </div>
                <h3
                    className="absolute top-[10px] right-[10px] px-4 py-2 rounded-lg bg-primary-foreground text-primary font-bold text-right md:text-center lg:text-right"
                >
                    ₹{getRateDisplay()}
                </h3>

                <div className="flex justify-center gap-8 lg:gap-10 mb-4">
                    <p className='flex flex-col justify-center items-center'>
                        <FaBed className='inline ml-2 text-border' /> {" "}
                        <span className="inline">{property.beds}{" "}Beds</span>
                    </p>
                    <p className='flex flex-col justify-center items-center'>
                        <FaShower className='inline ml-2 text-border' />{" "}
                        <span className="inline">{property.baths}{" "}Baths</span>
                    </p>
                    <p className='flex flex-col justify-center items-center'>
                        <FaRulerCombined className='inline ml-2 text-border' />{" "}
                        <span className="inline">{property.square_feet}{" "}sqft</span>
                    </p>
                </div>

                <div
                    className="flex justify-center gap-4 text-sm mb-4"
                >
                    {property.rates.nightly && (
                        <p><FaMoneyCheck className='inline ml-2 text-border' /> Nightly</p>
                    )}
                    {property.rates.weekly && (
                        <p><FaMoneyCheck className='inline ml-2 text-border' /> Weekly</p>
                    )}
                    {property.rates.monthly && (
                        <p><FaMoneyCheck className='inline ml-2 text-border' /> Monthly</p>
                    )}

                </div>

                <div className="border border-primary mb-5"></div>

                <div className="flex flex-col lg:flex-row justify-between mb-4">
                    <div className="flex align-middle gap-2 mb-4 lg:mb-0">
                        <FaMapMarkerAlt className='inline text-destructive mt-1' />
                        <span className='text-destructive'> {property.location.city} </span>
                    </div>
                    <Link
                        href={`/properties/${property._id}`}
                        className="h-[36px] bg-primary hover:rounded-lg hover:shadow-lg text-white px-4 py-2 rounded-md text-center text-sm"
                    >
                        Details
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PropertyCard