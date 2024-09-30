"use client"
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { FaBuilding, FaRegBuilding } from 'react-icons/fa'
import { TbHomeSearch } from 'react-icons/tb';
import Typed from 'typed.js';

const PropertySearchForm = () => {
    const [location, setLocation] = useState('');
    const [propertyType, setPropertyType] = useState('All');
    const router = useRouter();
    const pathname = usePathname()
    const heroTitleRef = useRef(null);


    const handelSubmit = (e) => {
        e.preventDefault();
        if (location.trim() === '' && propertyType === 'All') {
            router.push('/properties');
        } else {
            const query = `?location=${location}&propertyType=${propertyType}`;
            router.push(`/properties/search${query}`);
        }
    }


    useEffect(() => {
        const typed = new Typed(heroTitleRef.current, {
            strings: ["Apartment..", "House..", "Condo..", "Studio..", "Cottage..", "Room..", "Hive ;)"],
            startDelay: 200,
            typeSpeed: 200,
            backSpeed: 200,
            backDelay: 200,
            loop: true,
        });

        // Destropying
        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <div className='mt-3 md:mt-8 lg:mt-10 mx-auto max-w-4xl w-full'>
            <div className={`${pathname == '/properties/search' ? 'hidden' : 'inline-block'} hidden md:inline-block w-fit bg-sky-300 bg-opacity-20 backdrop-blur-lg rounded-t-2xl px-4 py-3`}>
                <p className='montserrat-semibold text-primary-foreground'> Search your potential <span className='text-primary font-bold ' ref={heroTitleRef}></span></p>
            </div>
            <form
                className=" flex flex-col md:flex-row items-center  py-6 px-6 bg-sky-100 bg-opacity-20 backdrop-blur-lg rounded-2xl"
                onSubmit={handelSubmit}
            >
                <div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
                    <label htmlFor="location" className="sr-only">Location</label>
                    <input
                        type="text"
                        id="location"
                        placeholder="Enter Location (City, State, Zip, etc"
                        className="w-full px-4 py-3 rounded-lg bg-primary-foreground text-foreground focus:outline-none focus:ring focus:ring-primary"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <div className="w-full md:w-2/5 md:pl-2 flex">
                    <label htmlFor="property-type" className="sr-only">Property Type</label>
                    <div className='bg-primary-foreground text-sm text-border flex justify-normal items-center pl-4 pr-2 rounded-l-lg border-r-2'>
                        <FaRegBuilding />
                        <p className='text-nowrap'>&nbsp;Type</p>
                    </div>
                    <select
                        id="property-type"
                        className="w-full px-4 py-3 rounded-r-lg bg-primary-foreground text-foreground focus:outline-none"
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}

                    >
                        <option value="All">All</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Studio">Studio</option>
                        <option value="Condo">Condo</option>
                        <option value="House">House</option>
                        <option value="Cabin Or Cottage">Cabin or Cottage</option>
                        <option value="Loft">Loft</option>
                        <option value="Room">Room</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <button
                    type="submit "
                    className="md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 montserrat-semibold rounded-lg text-primary-foreground bg-primary focus:outline-none focus:ring focus:ring-primary hover:bg-foreground duration-200 flex items-center justify-center"
                >
                    <TbHomeSearch className='inline mr-2' />
                    <span>Search</span>
                </button>
            </form>
        </div>
    )
}

export default PropertySearchForm