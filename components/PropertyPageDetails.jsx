import React from 'react'
import { FaBed, FaCheckSquare, FaMapPin, FaRegBuilding, FaRulerCombined, FaShower } from 'react-icons/fa'

const formatNumberToIndian = (number) => {
    return number.toLocaleString('en-IN');
};

const PropertyPageDetails = ({ property }) => {
    return (
        <main>
            <div
                className="bg-primary-foreground p-6 rounded-lg shadow-md text-center md:text-left"
            >
                <div className="text-border mb-4"><FaRegBuilding className=' inline-block mr-2' />{property.type}</div>
                <h1 className="text-3xl font-extrabold mb-4">{property.name}</h1>
                <div
                    className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
                >
                    <i
                        className="fa-solid fa-location-dot text-lg text-orange-700 mr-2"
                    ></i>
                    <p className="text-destructive">
                        <FaMapPin className='inline mr-2' />
                        {`${property.location.street}, ${property.location.city}`}-
                        {`${property.location.zipcode}, ${property.location.state} `}
                    </p>
                </div>

                <h3 className="text-lg font-bold my-6 bg-primary text-white p-2">
                    Rates & Options
                </h3>
                <div className="flex flex-col md:flex-row justify-around">
                    {property.rates.nightly && <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
                        <div className="text-3xl font-bold text-foreground">₹{formatNumberToIndian(property.rates.nightly)}</div>
                        <div className="text-foreground mr-2 font-medium self-end">&nbsp;/nightly</div>
                    </div>
                    }
                    {property.rates.weekly && <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
                        <div className="text-3xl font-bold text-foreground">₹{formatNumberToIndian(property.rates.weekly)}</div>
                        <div className="text-primary mr-2 font-medium self-end">&nbsp;/weekly</div>
                    </div>
                    }
                    {property.rates.monthly && <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
                        <div className="text-3xl font-bold text-foreground">₹{formatNumberToIndian(property.rates.monthly)}</div>
                        <div className="text-primary mr-2 font-medium self-end">&nbsp;/monthly</div>
                    </div>
                    }
                </div>
            </div>

            <div className="bg-primary-foreground p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-lg font-bold mb-6">Description & Details</h3>
                <div className="flex justify-center gap-8 lg:gap-10 mb-4">
                    <p className='flex flex-col justify-center items-center'>
                        <FaBed className='inline ml-2 text-border' /> {" "}
                        <span className="inline text-xl font-bold">{property.beds}{" "}Beds</span>
                    </p>
                    <p className='flex flex-col justify-center items-center'>
                        <FaShower className='inline ml-2 text-border' />{" "}
                        <span className="inline text-xl font-bold">{property.baths}{" "}Baths</span>
                    </p>
                    <p className='flex flex-col justify-center items-center'>
                        <FaRulerCombined className='inline ml-2 text-border' />{" "}
                        <span className="inline text-xl font-bold">{property.square_feet}{" "}sqft</span>
                    </p>
                </div>
                <p className="mb-4">
                    {property.description}
                </p>
                <p className="mb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo autem quod quasi reprehenderit hic, ad enim natus. Est officia sequi eligendi, magni at, rerum necessitatibus possimus in aut corporis reiciendis assumenda quaerat iure accusantium itaque!
                </p>
            </div>

            <div className="bg-primary-foreground p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-lg font-bold mb-6">Amenities</h3>

                <ul
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none"
                >
                    {property.amenities.map((amenity, index) => (
                        <li key={index}>
                            <FaCheckSquare className='text-primary inline mr-2' />
                            {amenity}
                        </li>
                    ))}


                </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <div id="map"></div>
            </div>
        </main>
    )
}

export default PropertyPageDetails