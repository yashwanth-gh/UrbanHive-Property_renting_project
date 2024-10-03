import Image from 'next/image';
import Link from 'next/link';
import React, { memo, useMemo } from 'react';
import { FaBed, FaMapMarkerAlt, FaMoneyCheck, FaRulerCombined, FaShower } from 'react-icons/fa';
import PropertyRating from './PropertyRating';

const PropertyCard = ({ property }) => {

  const getRateDisplay = useMemo(() => {
    const { rates } = property;
    if (rates.monthly) return `${rates.monthly.toLocaleString()}/mon`;
    if (rates.weekly) return `${rates.weekly.toLocaleString()}/wk`;
    if (rates.nightly) return `${rates.nightly.toLocaleString()}/night`;
  }, [property.rates]);

  return (
    <div className="rounded-lg shadow-md relative bg-primary-foreground border border-input flex flex-col justify-between w-full h-full">
      <Link
        href={`/properties/${property._id}`}
        className='w-full h-full'>
        <Image
          src={property.images[0]?.url}
          alt="property image"
          height={0}
          width={0}
          sizes='100vw'
          className='w-full h-full rounded-t-lg object-cover object-center'
          loading="lazy"
        />
      </Link>
      <div className="p-4 h-auto">
        <div className="text-left mb-2">
          <div className="text-border text-sm flex justify-between items-center">
            {property.type}
            <PropertyRating rating={property?.rating} textSize='text-md' showAllStars={false} />
          </div>

          <h3 className="text-xl font-bold w-fit">
            <Link href={`/properties/${property._id}`} className='w-fit'>
              {property.name}
            </Link>
          </h3>
        </div>
        <h3
          className="absolute top-[10px] right-[10px] px-4 py-2 rounded-lg bg-primary-foreground text-primary font-bold"
        >
          ₹{getRateDisplay}
        </h3>

        <div className="flex justify-evenly mb-4 text-sm">
          <p className='flex flex-col justify-center items-center'>
            <FaBed className='inline text-border' />
            {property.beds}{" "}Beds
          </p>
          <p className='flex flex-col justify-center items-center'>
            <FaShower className='inline  text-border' />
            {property.baths}{" "}Baths
          </p>
          <p className='flex flex-col justify-center items-center'>
            <FaRulerCombined className='inline text-border' />
            {property.square_feet}{" "}sqft
          </p>
        </div>

        <div className="flex justify-evenly text-sm mb-4">
          {property.rates.nightly && (
            <p className='flex flex-col justify-center items-center'>
              <FaMoneyCheck className='inline ml-2 text-border' /> Nightly
            </p>
          )}
          {property.rates.weekly && (
            <p className='flex flex-col justify-center items-center'>
              <FaMoneyCheck className='inline ml-2 text-border' /> Weekly
            </p>
          )}
          {property.rates.monthly && (
            <p className='flex flex-col justify-center items-center'>
              <FaMoneyCheck className='inline ml-2 text-border' /> Monthly
            </p>
          )}
        </div>

        <div className="border border-primary mb-3"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-1">
          <div className="flex flex-col align-middle gap-2 mb-4 lg:mb-0">
            <div className='flex align-middle gap-2 mb-4 lg:mb-0'>
              <FaMapMarkerAlt className='inline text-destructive mt-1' />
              <span className='text-destructive'>{property.location.city}</span>
            </div>

          </div>
          <Link
            href={`/properties/${property._id}`}
            className="h-[36px] bg-primary hover:rounded-lg hover:shadow-lg text-white px-4 py-2 rounded-md text-center text-sm"
            prefetch={false}  // Disable prefetch if not necessary
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default memo(PropertyCard);