import React, { useState } from 'react';
import { FaShare } from 'react-icons/fa';
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailShareButton,
    LinkedinShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    EmailIcon,
    LinkedinIcon
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
                className="bg-foreground hover:opacity-90 text-white font-bold w-full py-2 px-4 rounded-md hover:rounded-xl flex items-center justify-center"
                onClick={toggleModal}
            >
                <FaShare className='mr-3' /> Share Property
            </button>

            {isModalOpen && (
                <div className={`fixed inset-0 inset-y-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center z-50 transition-opacity duration-300 ${isModalVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <div className={`bg-white p-6 rounded-lg shadow-lg w-full max-w-md transform transition-transform duration-300 ${isModalVisible ? 'scale-100' : 'scale-95'}`}>
                        <h2 className="text-xl mb-4">Share this Property</h2>
                        <div className="flex justify-between mb-4">
                            <FacebookShareButton url={shareUrl} hashtag='#urbanhive' quote={title}>
                                <FacebookIcon size={32} round />
                            </FacebookShareButton>
                            <TwitterShareButton url={shareUrl} title={title}>
                                <TwitterIcon size={32} round />
                            </TwitterShareButton>
                            <WhatsappShareButton url={shareUrl} title={title} separator=":: ">
                                <WhatsappIcon size={32} round />
                            </WhatsappShareButton>
                            <EmailShareButton url={shareUrl} subject={title} body="Check this awesome property on UrbanHive">
                                <EmailIcon size={32} round />
                            </EmailShareButton>
                            <LinkedinShareButton url={shareUrl} title={title} summary='Check this property on UrbanHive' source='UrbanHive'>
                                <LinkedinIcon size={32} round />
                            </LinkedinShareButton>
                        </div>
                        <button
                            className="bg-primary hover:opacity-90 text-white font-bold py-2 px-4 rounded-md mb-4 w-full"
                            onClick={handleCopyUrl}
                        >
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