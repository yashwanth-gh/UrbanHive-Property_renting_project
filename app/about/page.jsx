import React from 'react';

const AboutPage = () => {
    return (
        <div className=' bg-primary text-primary-foreground'>
            <div className='flex flex-col items-center justify-center mt-20'>
                <h1 className='text-4xl font-semibold mb-5'>About Us</h1>
                <p className='text-lg max-w-2xl text-center mb-10'>
                    Welcome to UrbanHive, a project dedicated to connecting people with their ideal homes.
                    Our mission is to provide a user-friendly platform that caters to both renters and property owners,
                    making the search for the perfect rental experience seamless and efficient.
                </p>

                <div className='bg-foreground p-5 rounded-lg shadow-lg max-w-3xl'>
                    <h2 className='text-2xl font-semibold mb-3'>Meet Yashwanth B M</h2>
                    <p className='mb-3'>
                        I am a passionate web developer skilled in the MERN and PERN stacks.
                        Currently, I am pursuing a Bachelor of Engineering in Information Science
                        at Sir M Visveswaraya Institute of Technology.
                    </p>
                    <p className='mb-3'>
                        My journey in web development has been fueled by a love for coding and building innovative websites.
                        With this project, I aim to hone my skills in Next.js while creating a platform that is not only functional but also beautiful.
                    </p>
                    <p className='mb-3'>
                        Currently, I am also focusing on learning Android app development using Kotlin,
                        which I believe will broaden my horizons in the tech industry.
                    </p>
                    <div className='flex space-x-5 mt-5'>
                        <a href='https://github.com/YOUR_GITHUB_USERNAME' target='_blank' rel='noopener noreferrer'>
                            <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded'>
                                GitHub
                            </button>
                        </a>
                        <a href='https://linkedin.com/in/YOUR_LINKEDIN_USERNAME' target='_blank' rel='noopener noreferrer'>
                            <button className='bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded'>
                                LinkedIn
                            </button>
                        </a>
                    </div>
                </div>

                <div className='mt-10 max-w-2xl'>
                    <h2 className='text-2xl font-semibold mb-3'>Why UrbanHive?</h2>
                    <p className='mb-3'>
                        UrbanHive is designed to cater to your unique lifestyle and preferences.
                        Whether you are a renter searching for the perfect space or an owner looking to list your property,
                        our platform is here to make the process simple and straightforward.
                    </p>
                    <p className='mb-3'>
                        We believe in the power of technology to connect people and improve their living experiences.
                        With our innovative features and user-friendly interface, we aim to revolutionize the rental market.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
