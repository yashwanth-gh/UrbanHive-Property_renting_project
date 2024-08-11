"use client"

import Checkbox from "@/components/Checkbox";
import { useState } from "react";
import MiniSpinner from "@/components/miniSpinner";
import { toast } from "react-toastify";
import updateProperty from "@/app/actions/updateProperty";

const PropertyEditForm = ({ property }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const res = await updateProperty(property._id, new FormData(event.target));

            if (res && !res?.success) toast.error(res.message);
            else toast.success("Property Updated Successfully");
        } catch (error) {
            console.error("Error Updating property:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className='text-3xl text-center font-semibold mb-6'>Edit Property</h2>

            <div className='mb-4'>
                <label htmlFor='type' className='block text-gray-700 font-bold mb-2'>
                    Property Type <span className="text-red-500">*</span>
                </label>
                <select
                    id='type'
                    name='type'
                    defaultValue={property.type}
                    className='border rounded w-full py-2 px-3'
                    required
                >
                    <option value='Apartment'>Apartment</option>
                    <option value='Condo'>Condo</option>
                    <option value='House'>House</option>
                    <option value='CabinOrCottage'>Cabin or Cottage</option>
                    <option value='Room'>Room</option>
                    <option value='Studio'>Studio</option>
                    <option value='Other'>Other</option>
                </select>
            </div>
            <div className='mb-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                    Listing Name<span className="text-red-500">*</span>
                </label>
                <input
                    type='text'
                    id='name'
                    defaultValue={property.name}
                    name='name'
                    className='border rounded w-full py-2 px-3 mb-2'
                    placeholder='eg. Beautiful Apartment In Miami'
                    required
                />
            </div>
            <div className='mb-4'>
                <label
                    htmlFor='description'
                    className='block text-gray-700 font-bold mb-2'
                >
                    Description
                </label>
                <textarea
                    id='description'
                    defaultValue={property.description}
                    name='description'
                    className='border rounded w-full py-2 px-3'
                    rows='4'
                    placeholder='Add an optional description of your property'
                ></textarea>
            </div>

            <div className='mb-4 bg-secondary p-6 md:p-2 rounded-md border'>
                <label className='block text-gray-700 font-bold mb-2'>Location <span className="text-red-500">*</span></label>
                <input
                    type='text'
                    id='street'
                    defaultValue={property.location.street}
                    name='location.street'
                    className='border rounded w-full py-2 px-3 mb-2'
                    placeholder='Street'
                />
                <input
                    type='text'
                    id='city'
                    defaultValue={property.location.city}
                    name='location.city'
                    className='border rounded w-full py-2 px-3 mb-2'
                    placeholder='City'
                    required
                />
                <input
                    type='text'
                    id='state'
                    defaultValue={property.location.state}
                    name='location.state'
                    className='border rounded w-full py-2 px-3 mb-2'
                    placeholder='State'
                    required
                />
                <input
                    type='text'
                    id='zipcode'
                    defaultValue={property.location.zipcode}
                    name='location.zipcode'
                    className='border rounded w-full py-2 px-3 mb-2'
                    placeholder='Zipcode'
                />
            </div>

            <div className='mb-4 flex flex-wrap'>
                <div className='w-full sm:w-1/3 pr-2'>
                    <label htmlFor='beds' className='block text-gray-700 font-bold mb-2'>
                        Beds <span className="text-red-500">*</span>
                    </label>
                    <input
                        type='number'
                        min={0}
                        id='beds'
                        defaultValue={property.beds}
                        name='beds'
                        className='border rounded w-full py-2 px-3'
                        required
                    />
                </div>
                <div className='w-full sm:w-1/3 px-2'>
                    <label htmlFor='baths' className='block text-gray-700 font-bold mb-2'>
                        Baths <span className="text-red-500">*</span>
                    </label>
                    <input
                        type='number'
                        min={0}
                        id='baths'
                        defaultValue={property.baths}
                        name='baths'
                        className='border rounded w-full py-2 px-3'
                        required
                    />
                </div>
                <div className='w-full sm:w-1/3 pl-2'>
                    <label
                        htmlFor='square_feet'
                        className='block text-gray-700 font-bold mb-2'
                    >
                        Square Feet <span className="text-red-500">*</span>
                    </label>
                    <input
                        type='number'
                        id='square_feet'
                        defaultValue={property.square_feet}
                        min={0}
                        name='square_feet'
                        className='border rounded w-full py-2 px-3'
                        required
                    />
                </div>
            </div>

            <div className='mb-4'>
                <label className='block text-gray-700 font-bold mb-2'>Amenities (Select minimum 2) :</label>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
                    <div>
                        <Checkbox
                            id='amenity_wifi'
                            name='amenities'
                            value='Wifi'
                            labelName='Wifi'
                            isChecked={property.amenities.includes('Wifi')}
                        />
                    </div>
                    <div>
                        <Checkbox
                            id='amenity_kitchen'
                            name='amenities'
                            value='Full kitchen'
                            labelName='Full kitchen'
                            isChecked={property.amenities.includes('Full kitchen')}
                        />
                    </div>
                    <div>
                        <Checkbox
                            id='amenity_washer_dryer'
                            name='amenities'
                            value='Washer & Dryer'
                            labelName='Washer & Dryer'
                            isChecked={property.amenities.includes('Washer & Dryer')}
                        />
                    </div>
                    <div>
                        <Checkbox
                            id='amenity_free_parking'
                            name='amenities'
                            value='Free Parking'
                            labelName='Free Parking'
                            isChecked={property.amenities.includes('Free Parking')}
                        />
                    </div>
                    <div>
                        <Checkbox
                            id='amenity_pool'
                            name='amenities'
                            value='Swimming Pool'
                            labelName='Swimming Pool'
                            isChecked={property.amenities.includes('Swimming Pool')}
                        />
                    </div>
                    <div>
                        <Checkbox
                            id='amenity_hot_tub'
                            name='amenities'
                            value='Hot Tub'
                            labelName='Hot Tub'
                            isChecked={property.amenities.includes('Hot Tub')}
                        />
                    </div>
                    <div>
                        <Checkbox
                            id='amenity_24_7_security'
                            name='amenities'
                            value='24/7 Security'
                            labelName='24/7 Security'
                            isChecked={property.amenities.includes('24/7 Security')}
                        />
                    </div>
                    <div>
                        <Checkbox
                            id='amenity_wheelchair_accessible'
                            name='amenities'
                            value='Wheelchair Accessible'
                            labelName='Wheelchair Accessible'
                            isChecked={property.amenities.includes('Wheelchair Accessible')}
                        />
                    </div>
                    <div>
                        <Checkbox
                            id='amenity_elevator_access'
                            name='amenities'
                            value='Elevator Access'
                            labelName='Elevator Access'
                            isChecked={property.amenities.includes('Elevator Access')}
                        />
                    </div>
                    <div>
                        <Checkbox
                            id='amenity_dishwasher'
                            name='amenities'
                            value='Dishwasher'
                            labelName='Dishwasher'
                            isChecked={property.amenities.includes('Dishwasher')}
                        />
                    </div>
                    <div>
                        <Checkbox
                            id='amenity_gym_fitness_center'
                            name='amenities'
                            value='Gym/Fitness Center'
                            labelName='Gym/Fitness Center'
                            isChecked={property.amenities.includes('Gym/Fitness Center')}
                        />
                    </div>
                    <div>
                        <Checkbox
                            id='amenity_air_conditioning'
                            name='amenities'
                            value='Air Conditioning'
                            labelName='Air Conditioning'
                            isChecked={property.amenities.includes('Air Conditioning')}
                        />
                    </div>
                    <div>
                        <Checkbox
                            id='amenity_balcony_patio'
                            name='amenities'
                            value='Balcony/Patio'
                            labelName='Balcony/Patio'
                            isChecked={property.amenities.includes('Balcony/Patio')}
                        />
                    </div>
                    <div>
                        <Checkbox
                            id='amenity_smart_tv'
                            name='amenities'
                            value='Smart TV'
                            labelName='Smart TV'
                            isChecked={property.amenities.includes('Smart TV')}
                        />
                    </div>
                    <div>
                        <Checkbox
                            id='amenity_coffee_maker'
                            name='amenities'
                            value='Coffee Maker'
                            labelName='Coffee Maker'
                            isChecked={property.amenities.includes('Coffee Maker')}
                        />
                    </div>
                </div>
            </div>

            <div className='mb-4 p-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                    Rates (Leave blank if not applicable)
                </label>
                <div className='flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4'>
                    <div className='flex items-center'>
                        <label htmlFor='weekly_rate' className='mr-2'>
                            Weekly
                        </label>
                        <input
                            type='number'
                            min={0}
                            id='weekly_rate'
                            defaultValue={property.rates.weekly}
                            name='rates.weekly'
                            className='border rounded w-full py-2 px-3'
                        />
                    </div>
                    <div className='flex items-center'>
                        <label htmlFor='monthly_rate' className='mr-2'>
                            Monthly
                        </label>
                        <input
                            type='number'
                            min={0}
                            id='monthly_rate'
                            defaultValue={property.rates.monthly}
                            name='rates.monthly'
                            className='border rounded w-full py-2 px-3'
                        />
                    </div>
                    <div className='flex items-center'>
                        <label htmlFor='nightly_rate' className='mr-2'>
                            Nightly
                        </label>
                        <input
                            type='number'
                            min={0}
                            id='nightly_rate'
                            defaultValue={property.rates.nightly}
                            name='rates.nightly'
                            className='border rounded w-full py-2 px-3'
                        />
                    </div>
                </div>
            </div>

            <div className='mb-4'>
                <label
                    htmlFor='seller_name'
                    className='block text-gray-700 font-bold mb-2'
                >
                    Seller Name
                </label>
                <input
                    type='text'
                    id='seller_name'
                    defaultValue={property.seller_info.name}
                    name='seller_info.name'
                    className='border rounded w-full py-2 px-3'
                    placeholder='Name'
                />
            </div>
            <div className='mb-4'>
                <label
                    htmlFor='seller_email'
                    className='block text-gray-700 font-bold mb-2'
                >
                    Seller Email <span className="text-red-500">*</span>
                </label>
                <input
                    type='email'
                    id='seller_email'
                    defaultValue={property.seller_info.email}
                    name='seller_info.email'
                    className='border rounded w-full py-2 px-3'
                    placeholder='Email address'
                    required
                />
            </div>
            <div className='mb-4'>
                <label
                    htmlFor='seller_phone'
                    className='block text-gray-700 font-bold mb-2'
                >
                    Seller Phone
                </label>
                <input
                    type='tel'
                    id='seller_phone'
                    defaultValue={property.seller_info.phone}
                    name='seller_info.phone'
                    className='border rounded w-full py-2 px-3'
                    placeholder='Phone'
                />
            </div>


            <div>
                <p className="font-bold text-red-500">Note:</p>
                <p className="text-sm my-1 mb-4"><span className="text-red-500">*</span> Fields with asterik (*) are Compulsory</p>

            </div>

            <div>
                <button
                    className='bg-primary hover:opacity-75 text-white font-bold py-4 px-4 rounded-md w-full focus:outline-none focus:shadow-outline'
                    type='submit'
                    disabled={isLoading}
                >
                    {isLoading ? <MiniSpinner loading={true} size={20} color="#ffffff" /> : "Update Property"}
                </button>
            </div>
        </form>
    )
}

export default PropertyEditForm