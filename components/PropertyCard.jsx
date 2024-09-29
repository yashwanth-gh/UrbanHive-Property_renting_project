import Image from 'next/image';
import Link from 'next/link';
import React, { memo, useMemo } from 'react';
import { FaBed, FaMapMarkerAlt, FaMoneyCheck, FaRulerCombined, FaShower } from 'react-icons/fa';

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
          <div className="text-border text-sm">{property.type}</div>
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

        <div className="flex justify-center gap-8 lg:gap-10 mb-4 text-sm">
          <p className='flex flex-col justify-center items-center'>
            <FaBed className='inline ml-2 text-border' /> {" "}
            {property.beds}{" "}Beds
          </p>
          <p className='flex flex-col justify-center items-center'>
            <FaShower className='inline ml-2 text-border' />{" "}
            {property.baths}{" "}Baths
          </p>
          <p className='flex flex-col justify-center items-center'>
            <FaRulerCombined className='inline ml-2 text-border' /> {" "}
            {property.square_feet}{" "}sqft
          </p>
        </div>

        <div className="flex justify-center gap-4 text-sm mb-4">
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
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaMapMarkerAlt className='inline text-destructive mt-1' />
            <span className='text-destructive'>{property.location.city}</span>
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




/* 
{
  "_id": {
    "$oid": "66b72c46e100750960b9dffa"
  },
  "owner": {
    "$oid": "66b31ec0d85b681bf495b40d"
  },
  "name": "Embassy Grand View",
  "type": "Apartment",
  "description": "A cozy downtown loft with great city views.",
  "location": {
    "street": "Bellary Rd, Hebbal",
    "city": "Bengaluru",
    "state": "Karnataka",
    "zipcode": "560024"
  },
  "beds": 2,
  "baths": 2,
  "square_feet": 1800,
  "amenities": [
    "Wifi",
    "Full kitchen",
    "Washer & Dryer",
    "Free Parking",
    "Swimming Pool",
    "Hot Tub",
    "24/7 Security",
    "Wheelchair Accessible",
    "Elevator Access",
    "Dishwasher",
    "Gym/Fitness Center",
    "Air Conditioning",
    "Balcony/Patio",
    "Smart TV",
    "Coffee Maker"
  ],
  "rates": {
    "nightly": null,
    "weekly": 45000,
    "monthly": 175000
  },
  "seller_info": {
    "name": "Priya Sharma",
    "email": "priya@gmail.com",
    "phone": "8764235257"
  },
  "images": [
    {
      "url": "https://res.cloudinary.com/dfaf6neg8/image/upload/v1723280457/Urbanhive/bhdaxbatohtaaa050cfy.webp",
      "title": "Image title"
    },
    {
      "url": "https://res.cloudinary.com/dfaf6neg8/image/upload/v1723280456/Urbanhive/lb1mzisnlcdflbawr1nt.webp",
      "title": "Image title"
    },
    {
      "url": "https://res.cloudinary.com/dfaf6neg8/image/upload/v1723280454/Urbanhive/rmqgasfuybfabvhz5p4j.webp",
      "title": "Image title"
    },
    {
      "url": "https://res.cloudinary.com/dfaf6neg8/image/upload/v1723280455/Urbanhive/kkxirkey6ilcv4kmuqcl.webp",
      "title": "Image title"
    },
    {
      "url": "https://res.cloudinary.com/dfaf6neg8/image/upload/v1723280455/Urbanhive/j00bzjrypvj3oujf0chu.webp",
      "title": "Image title"
    },
    {
      "url": "https://res.cloudinary.com/dfaf6neg8/image/upload/v1723280453/Urbanhive/skhkxdewbqswo33impsu.webp",
      "title": "Image title"
    },
    {
      "url": "https://res.cloudinary.com/dfaf6neg8/image/upload/v1723280452/Urbanhive/eiydzifyq8qfyzixpyjt.webp",
      "title": "Image title"
    }
  ],
  "is_featured": false,
  "agreement": true,
  "createdAt": {
    "$date": "2024-08-10T09:00:54.505Z"
  },
  "updatedAt": {
    "$date": "2024-08-17T07:52:45.487Z"
  },
  "__v": 0
}
*/