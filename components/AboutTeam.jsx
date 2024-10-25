import Image from 'next/image'
import React from 'react'
import aboutus from '@/public/images/about/aboutus.png'
import AboutTeamCard from './AboutTeamCard';
import tm1 from '@/public/images/about/a1.png'
import tm2 from '@/public/images/about/a2.png'
import tm3 from '@/public/images/about/a3.png'
import tm4 from '@/public/images/about/a4.png'
import tm5 from '@/public/images/about/a5.png'
import tm6 from '@/public/images/about/a6.png'
import tm7 from '@/public/images/about/a7.png'
import tm8 from '@/public/images/about/a8.png'
import tm9 from '@/public/images/about/a9.png'

const teamMembers = [
    { image: tm2, name: 'John Doe', role: 'CEO & Founder' },
    { image: tm1, name: 'Jane Smith', role: 'Lead Designer' },
    { image: tm4, name: 'Mike Johnson', role: 'Marketing Specialist' },
    { image: tm3, name: 'Emily Brown', role: 'Product Manager' },
    { image: tm5, name: 'David Lee', role: 'Tech Lead' },
    { image: tm6, name: 'Sophia Walker', role: 'UX Designer' },
    { image: tm7, name: 'Meera Martinez', role: 'Backend Developer' },
    { image: tm8, name: 'Linda Martinez', role: 'Data Scientist' },
    { image: tm9, name: 'James Scott', role: 'Full Stack Developer' }
];


const AboutTeam = () => {
    return (
        <div className="container">
            <div className="flex flex-col-reverse md:flex-row items-start py-8 mt-6 h-full pb-10">
                {/* Text Section */}
                <div className="md:w-3/5 pt-6 md:pl-12">
                    <h2 className="text-2xl md:leading-relaxed md:text-3xl font-semibold text-pretty">
                        Meet our team of visionary<span className="text-[#FFD700] playwrite-400"> creators, </span>innovative
                        <span className="text-[#FFD700] italic playwrite-400"> designers</span>, and world-class
                        <span className="text-[#FFD700] playwrite-400"> problem solvers!</span>
                    </h2>
                    <p className="hidden md:block pt-8 md:pt-12 text-lg md:leading-relaxed text-gray-700 text-balance">
                        At UrbanHive, we're more than just a real estate platform. We are passionate about creating seamless and personalized property experiences for those looking to build their future in vibrant spaces.
                    </p>
                </div>

                {/* Image Section */}
                <div className="md:w-2/5 w-full h-full flex items-center justify-center p-4 pt-10 md:pt-0">
                    <Image
                        src={aboutus}
                        alt="Our Team"
                        className="w-96 h-auto border-b-8 border-r-8 border-t-2 border-l-2 border-[#FFD700] bg-white about-border"
                    />
                </div>
            </div>
            {/* Team Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
                {teamMembers.map((member, index) => (
                    <AboutTeamCard
                        key={index}
                        image={member.image}
                        name={member.name}
                        role={member.role}
                    />
                ))}
            </div>
        </div>
    )
}

export default AboutTeam