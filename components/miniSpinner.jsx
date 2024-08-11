// components/MiniSpinner.js
import React from 'react';
import { ClipLoader } from 'react-spinners';

const MiniSpinner = ({ loading, size = 30, color = '#000000' }) => {
    return (
        <div className="flex justify-center items-center">
            <ClipLoader
                color={color}
                loading={loading}
                size={size}
            />
        </div>
    );
};

export default MiniSpinner;
