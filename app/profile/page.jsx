import Image from 'next/image'
import React from 'react'
import user from '@/assets/images/user.png';
import DB_Connect from '@/config/DB_Connect';
import { getSessionUser } from '@/utils/getSessionUser';
import { TbClock,TbBrandMailgun,TbCurrentLocation} from "react-icons/tb";

import User from '@/models/User';
import { getUserDuration } from '@/utils/calculateTime';
import Property from '@/models/Property';
import ProfileProperties from '@/components/ProfileProperties';
import { convertToSerializableObjects } from '@/utils/convertToObjects';


const ProfilePage = async () => {
    await DB_Connect();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser?.userId) {
        throw new Error("No Session : Please Login again!")
    }
    const { userId } = sessionUser;
    const userDetails = await User.findById(userId);
    const userPropertiesDocs = await Property.find({ owner: userId })
        .sort({ createdAt: -1 })
        .lean();
    const userProperties = userPropertiesDocs.map(convertToSerializableObjects);
    const { createdAt } = userDetails;
    const { days, months, years } = getUserDuration(createdAt);
    let memberSinceText = '';
    if (years > 0) {
        memberSinceText = `${years} year${years > 1 ? 's' : ''} `;
    } else if (months > 0) {
        memberSinceText = `${months} month${months > 1 ? 's' : ''} `;
    } else {
        memberSinceText = `${days} day${days > 1 ? 's' : ''} `;
    }



    return (
        <section className="container">
            <div className=" m-auto py-16">
                <div className="bg-white px-6 py-4 mb-4 md:m-0">
                    <h1 className="text-3xl font-bold mb-4">About {(sessionUser.user.name).split(" ")[0]}</h1>
                    <div className="flex flex-col md:flex-row gap-8 md:gap-4 ">
                        <div className="w-full md:w-1/3 lg:w-1/4 h-fit text-left py-3 px-6 md:mx-0 mt-10 flex flex-col items-start justify-start shadow-lg rounded-xl border-t shadow-gray-400">
                            <div className="mb-4 self-center">
                                <Image
                                    className="h-32 w-32 rounded-full mx-auto md:mx-0 bg-secondary border-2 border-black"
                                    src={sessionUser.user.image || user}
                                    alt="User"
                                    height={0}
                                    width={0}
                                    sizes='100vw'
                                    priority={true}
                                />
                            </div>
                            <h2 className="text-lg lg:text-2xl mb-2 font-bold"> {sessionUser.user.name}</h2>
                            <p className='text-sm font-normal mb-4'>This is a hard coded Bio, replace this with dynamic bio!</p>
                            <p className='text-xs mb-2'><TbBrandMailgun  className='inline mr-2' />{sessionUser.user.email}</p>
                            <p className='text-xs mb-2'><TbCurrentLocation  className='inline mr-2' />{"Bengaluru"}</p>
                            <p className='text-xs italic'><TbClock className='inline mr-2' />{memberSinceText} on UrbanHive</p> {/* Added membership duration */}

                        </div>
                        <div className="md:w-3/4 md:pl-4">
                            <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
                            <ProfileProperties userProperties={userProperties} />

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProfilePage;