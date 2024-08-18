import React from 'react'
import { FaShare } from 'react-icons/fa'

const ShareButton = ({ property }) => {
    return (
        <button
            className="bg-foreground hover:opacity-90 text-white font-bold w-full py-2 px-4 rounded-md hover:rounded-xl flex items-center justify-center"
        >
            <FaShare className='mr-3' /> Share Property
        </button>
    )
}

export default ShareButton