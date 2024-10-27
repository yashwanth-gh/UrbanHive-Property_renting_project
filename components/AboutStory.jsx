"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import DiagonalModal from './DiagonalModal'; // Import the modal component

// Import your images
import innovation from '@/public/images/about/innovation.svg';
import community from '@/public/images/about/community.svg';
import sustainability from '@/public/images/about/sustainable.svg';
import integrity from '@/public/images/about/integrity.svg';

const AboutStory = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const values = [
        { src: innovation, label: "Innovation", description: "We embrace new ideas and advanced technologies to provide solutions that anticipate and exceed expectations." },
        { src: community, label: "Community", description: "We create environments where people connect and prosper, fostering a sense of belonging and collaboration." },
        { src: sustainability, label: "Sustainability", description: "Our commitment to sustainable practices minimizes environmental impact while maximizing quality and comfort." },
        { src: integrity, label: "Integrity", description: "Trust and transparency are at the core of our work, building genuine relationships with clients and partners." }
    ];

    const handleItemClick = (item) => {
        setModalContent(item);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalContent(null);
    };

    return (
        <div className='container mx-auto pb-8'>
            <div>
                <h2 className='about-h2'>What We Value</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    {values.map((item, index) => (
                        <div
                            key={index}
                            className='relative border-2 flex justify-center items-center h-64 overflow-hidden rounded-md cursor-pointer '
                            onClick={() => handleItemClick(item)}
                        >
                            <Image
                                src={item.src}
                                height={0}
                                width={0}
                                sizes="100vw"
                                className="w-72 h-auto"
                                alt=''
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center hover:bg-opacity-30">
                                <p className="text-[#e3fffa] text-xl md:text-3xl font-semibold">{item.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Render the modal only on lg screens */}
            <div className="hidden lg:block">
                <DiagonalModal isOpen={isModalOpen} onClose={closeModal} content={modalContent} />
            </div>

            {/* Our Vision Section */}
            <div className='text-center mt-20'>
                <h2 className='about-h2'>Our Vision</h2>
                <p className='text-lg max-w-2xl mx-auto text-balance'>
                    To build thriving, sustainable urban spaces where people and businesses flourish. Our commitment to combining cutting-edge technology with a deep understanding of the property landscape drives us to be pioneers in future-driven real estate solutions.
                </p>
            </div>

            <p className='text-center mt-24 mb-10'>_______________________ 🌸🌹🌷 UrbanHive 🌷🌹🌸 _______________________</p>
        </div>
    );
};

export default AboutStory;
