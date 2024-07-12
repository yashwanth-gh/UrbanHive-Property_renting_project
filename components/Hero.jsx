import Image from 'next/image'
import React from 'react'
import heroImage from '@/public/images/home/hero-test.jpg'
import { FaBuilding, FaRegBuilding } from 'react-icons/fa'
const Hero = () => {
    return (
        <section className="hero">
            <Image
                src={heroImage}
                alt='hero-Image'
                className='h-full w-full object-cover'
                fill
            />
            <div className='hero-content'>
                <p className='text-xs montserrat-regular md:text-md'>REAL ESTATE</p>
                <h1 className=' text-3xl montserrat-extra sm:text-6xl text-balance'>
                    Discover Your Hive, Where Dreams Thrive
                </h1>

                <div className='mt-10 md:mt-20 lg:mt-36 mx-auto max-w-4xl w-full'>
                    <div className='inline-block w-fit bg-green-900 bg-opacity-10 backdrop-blur-md rounded-t-2xl px-4 py-3'>
                        <p className='montserrat-semibold'> Let's find your <span className='text-primary'>HIVE :)</span></p>
                    </div>
                    <form
                        className=" flex flex-col md:flex-row items-center  py-6 px-6 bg-green-900 bg-opacity-10 backdrop-blur-md rounded-2xl"
                    >
                        <div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
                            <label htmlFor="location" className="sr-only">Location</label>
                            <input
                                type="text"
                                id="location"
                                placeholder="Enter Location (City, State, Zip, etc"
                                className="w-full px-4 py-3 rounded-full bg-primary-foreground text-foreground focus:outline-none focus:ring focus:ring-primary"
                            />
                        </div>
                        <div className="w-full md:w-2/5 md:pl-2 flex">
                            <label htmlFor="property-type" className="sr-only">Property Type</label>
                            <div className='bg-primary-foreground text-sm text-gray-400 flex justify-normal items-center pl-4 pr-2 rounded-l-full border-r-2'>
                                <FaRegBuilding />
                                <p className='text-nowrap'>&nbsp;Type</p>
                            </div>
                            <select
                                id="property-type"
                                className="w-full px-4 py-3 rounded-r-full bg-primary-foreground text-foreground focus:outline-none"

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
                            type="submit"
                            className="md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 montserrat-semibold rounded-full text-primary-foreground bg-primary focus:outline-none focus:ring focus:ring-primary"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Hero

/* 
<section className="bg-blue-700 py-20 mb-4">
            <div
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center"
            >
                <div className="text-center">
                    <h1
                        className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl"
                    >
                        Find The Perfect Rental
                    </h1>
                    <p className="my-4 text-xl text-white">
                        Discover the perfect property that suits your needs.
                    </p>
                </div>
                <form
                    className="mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center"
                >
                    <div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
                        <label htmlFor="location" className="sr-only">Location</label>
                        <input
                            type="text"
                            id="location"
                            placeholder="Enter Location (City, State, Zip, etc"
                            className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div className="w-full md:w-2/5 md:pl-2">
                        <label htmlFor="property-type" className="sr-only">Property Type</label>
                        <select
                            id="property-type"
                            className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
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
                        type="submit"
                        className="md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
                    >
                        Search
                    </button>
                </form>
            </div>
        </section>
*/