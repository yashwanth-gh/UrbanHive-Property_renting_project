"use client";
import React, { useState, useEffect } from 'react';

const DiagonalModal = ({ isOpen, onClose, content }) => {
    const [exit, setExit] = useState(false);

    useEffect(() => {
        // Close modal on scroll
        const handleScroll = () => {
            if (isOpen) closeTheModal();
        };
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isOpen]);

    const closeTheModal = () => {
        setExit(true);
        const timerId = setTimeout(() => {
            setExit(false);
            onClose();
        }, 200);

        // Cleanup the timeout if component unmounts or new timeout is set
        return () => clearTimeout(timerId);
    };

    if (!isOpen && !exit) return null; // Don't render if not open and no exit animation

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50"
            onClick={closeTheModal} 
        >
            {/* Overlay background with custom shape and content */}
            <div
                className={`fixed inset-0 overlay-gradient flex items-center justify-end text-white p-8 ${exit ? 'overlay-exit' : 'overlay-enter'}`}
                style={{ clipPath: 'polygon(84.28% 0%, 81.37% 0%, 19.99% 100%, 16.24% 100%, 78.45% 0%, 84.43% 0.11%, 99.75% 0%, 100% 70.42%, 85.14% 100%, 81.8% 100%, 99.75% 66.26%, 99.75% 62.48%, 92.09% 75.97%, 84.43% 89.47%, 78.45% 100%, 23.75% 100%)' }}
                onClick={(e) => e.stopPropagation()}  // Prevent click event from bubbling up
            >
                {/* Overlay Content */}
                <div className="text-right max-w-lg space-y-4 text-black -mt-3">
                    <h2 className="text-4xl font-extrabold tracking-wide text-center text-[#926F34]">🌷 {content?.label} </h2>
                    <p className="text-md leading-relaxed text-center text-[#926F34]">{content?.description}</p>
                </div>
            </div>
        </div>
    );
};

export default DiagonalModal;
