import React, { useState } from 'react';

const AccordionItem = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="accordion-item">
            <div
                onClick={toggleAccordion}
                className="accordion-header cursor-pointer flex justify-between items-center p-4 bg-gray-100 border-b border-gray-300"
            >
                <h3 className="font-medium">{title}</h3>
                <span>{isOpen ? '-' : '+'}</span>
            </div>
            {isOpen && (
                <div className="accordion-content p-4 bg-white">
                    {children}
                </div>
            )}
        </div>
    );
};

export default AccordionItem;
