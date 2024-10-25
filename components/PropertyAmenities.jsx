import React from 'react';
import { TbWifi, TbParking, TbPool, TbAccessible, TbToolsKitchen, TbShirt, TbBath, TbHours24, TbElevator, TbAirConditioning, TbDoorExit, TbDeviceTv, TbCoffee, TbGymnastics, TbWash } from "react-icons/tb";


const amenityIcons = {
    Wifi: TbWifi,
    "Full kitchen": TbToolsKitchen,
    "Washer & Dryer": TbShirt,
    "Free Parking": TbParking,
    "Swimming Pool": TbPool,
    "Hot Tub": TbBath,
    "24/7 Security": TbHours24,
    "Wheelchair Accessible": TbAccessible,
    "Elevator Access": TbElevator,
    Dishwasher: TbWash,
    "Gym/Fitness Center": TbGymnastics,
    "Air Conditioning": TbAirConditioning,
    "Balcony/Patio": TbDoorExit,
    "Smart TV": TbDeviceTv,
    "Coffee Maker": TbCoffee,
};

const PropertyAmenities = ({ amenity }) => {
    const IconComponent = amenityIcons[amenity];

    return (
        <div className='flex items-center'>
            {IconComponent ? (
                <IconComponent className='text-border inline mr-1 text-2xl' />
            ) : null} :{" "}
            {amenity}
        </div>
    );
};

export default PropertyAmenities;
