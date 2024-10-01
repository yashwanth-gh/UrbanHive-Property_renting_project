import React, { useState } from 'react';

const Accordion = ({ children }) => {
    return (
        <div className="accordion">
            {children}
        </div>
    );
};

export default Accordion;
