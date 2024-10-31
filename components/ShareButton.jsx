import React, { useState } from 'react';
import { TbShare3,TbBrandFacebook, TbBrandWhatsapp, TbBrandTwitter, TbBrandLinkedin,TbMail, TbCopy   } from "react-icons/tb";
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailShareButton,
    LinkedinShareButton
} from 'react-share';

const ShareButton = ({ property }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false); // For smooth transition

    const toggleModal = () => {
        if (isModalOpen) {
            // Close modal with delay for smooth transition
            setIsModalVisible(false);
            setTimeout(() => setIsModalOpen(false), 300); // Same as CSS transition duration
        } else {
            setIsModalOpen(true);
            setTimeout(() => setIsModalVisible(true), 10);
        }
    };

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(shareUrl);
        alert('URL copied to clipboard!');
    };

    const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property?._id}`;
    const title = `Hey, Check ${property?.name} on UrbanHive` || "Check out this property!";

    return (
        <>
            <button
                className="bg-blue-500 hover:opacity-90 text-white font-bold w-full py-2 px-4 rounded-md hover:rounded-xl flex items-center justify-center"
                onClick={toggleModal}
            >
                <TbShare3 className='mr-3' /> Share Property
            </button>

            {isModalOpen && (
                <div className={`fixed inset-0 inset-y-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300 ${isModalVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <div className={`bg-white p-6 rounded-lg shadow-lg w-full max-w-md transform transition-transform duration-300 ${isModalVisible ? 'scale-100' : 'scale-95'}`}>
                        <h2 className="text-xl mb-4">Share this Property</h2>
                        <div className="flex justify-evenly mb-4 items-center">
                            <FacebookShareButton url={shareUrl} hashtag='#urbanhive' quote={title}>
                                <TbBrandFacebook size={30} className='bg-blue-500 rounded-full pt-1 pl-1 text-white' />
                            </FacebookShareButton>
                            <TwitterShareButton url={shareUrl} title={title}>
                                <TbBrandTwitter size={30} className='bg-black rounded-full p-1 text-white' />
                            </TwitterShareButton>
                            <WhatsappShareButton url={shareUrl} title={title} separator=":: ">
                                <TbBrandWhatsapp size={30} className='bg-green-400 rounded-full p-1 text-white'/>
                            </WhatsappShareButton>
                            <EmailShareButton url={shareUrl} subject={title} body="Check this awesome property on UrbanHive">
                                <TbMail size={30} className='bg-red-500 rounded-full p-1 text-white' />
                            </EmailShareButton>
                            <LinkedinShareButton url={shareUrl} title={title} summary='Check this property on UrbanHive' source='UrbanHive'>
                                <TbBrandLinkedin size={30} className='bg-violet-800 rounded-full p-1 text-white' />
                            </LinkedinShareButton>
                        </div>
                        <button
                            className="bg-primary hover:opacity-90 text-white font-bold py-2 px-4 rounded-md mb-4 w-full"
                            onClick={handleCopyUrl}
                        >
                            <TbCopy className='mr-3 inline-block' />
                            Copy URL
                        </button>
                        <button
                            className="bg-foreground hover:bg-destructive text-white font-bold py-2 px-4 rounded-md w-full"
                            onClick={toggleModal}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ShareButton;