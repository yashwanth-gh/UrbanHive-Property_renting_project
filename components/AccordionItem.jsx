import React, { useState } from 'react';
import { TbCaretRight,TbCaretDown } from 'react-icons/tb';

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
                <span>{isOpen ? <TbCaretRight  className='text-xl' /> : <TbCaretDown   className='text-xl' />}</span>
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
