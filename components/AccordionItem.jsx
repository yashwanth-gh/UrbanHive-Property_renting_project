import React, { useState } from 'react';
import { IoIosArrowDropdownCircle, IoIosArrowDroprightCircle } from "react-icons/io";

const AccordionItem = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="accordion-item">
            <div
                onClick={toggleAccordion}
                className="accordion-header cursor-pointer flex justify-between items-center p-4 bg-primary-foreground border-b border-border"
            >
                <h3 className="font-medium">{title}</h3>
                <span>{isOpen ? <IoIosArrowDroprightCircle className='text-xl' /> : <IoIosArrowDropdownCircle className='text-xl' />}</span>
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
