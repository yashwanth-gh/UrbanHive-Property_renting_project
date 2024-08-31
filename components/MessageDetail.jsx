"use client"
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { FaArrowCircleLeft, FaGlasses, FaTrash } from 'react-icons/fa';
import markMessageAsRead from '@/app/actions/markMessageAsRead';
import { toast } from 'react-toastify';

const MessageDetail = ({ message, onBack }) => {
    const [isRead, setIsRead] = useState(message?.read);

    // Update isRead state whenever the message prop changes
    useEffect(() => {
        setIsRead(message?.read);
    }, [message]);

    const handleReadClick = async () => {
        const read = await markMessageAsRead(message?._id);

        setIsRead(read.read);

        toast.success(read.message);
    };

    if (!message) {
        return <div className="text-gray-400 w-full self-center text-center text-xl -mt-16">Select a Query to view details</div>;
    }

    return (
        <div className="w-full px-2 h-screen overflow-y-auto relative md:border-l">
            {/* Back Button for Mobile */}
            {onBack && (
                <button
                    className="text-primary-foreground bg-primary px-3 py-1 mb-4 rounded-md active:bg-opacity-75"
                    onClick={onBack}
                >
                    <FaArrowCircleLeft className='inline mr-2' />Back
                </button>
            )}
            <div className="bg-gray-200 border p-2 rounded-md">
                <h3 className="text-xl font-bold mb-2">{message.sender.username}</h3>
                <p className="text-sm text-gray-500">
                    {format(new Date(message.createdAt), 'MMM dd, yyyy hh:mm a')}
                </p>
            </div>
            <div className='my-2 text-sm'>
                <strong>Property Inquiry:</strong> {message.property.name}
            </div>
            <p className="mb-4 min-h-40">{message.body}</p>
            <div className="py-3 text-sm border-b-2 border-foreground">
                <h4>Sender details:</h4>
                <div><strong>Name:</strong> {message.name}</div>
                <div><strong>Email:</strong> <a href={`mailto:${message.email}`} className="text-blue-600 underline">{message.email}</a></div>
                <div><strong>Phone:</strong> <a href={`tel:${message.phone}`} className="text-blue-600 underline">{message.phone}</a></div>

            </div>
            <div className='p-4 flex flex-col gap-2 w-4/5 mx-auto mt-2'>
                <h4 className='mb-1'>More options:</h4>
                <button
                    className='bg-foreground text-primary-foreground px-2 py-2 rounded-md hover:opacity-80'
                    onClick={handleReadClick}
                >
                    <FaGlasses className='inline mr-3 text-md' />
                    {isRead ? 'Mark as Unread' : 'Mark as Read'}
                </button>
                <button
                    className='bg-primary text-primary-foreground px-2 py-2 rounded-md hover:bg-red-500'
                >
                    <FaTrash className='inline mr-3 text-md' />
                    Delete Query
                </button>
            </div>
        </div>
    );
};

export default MessageDetail;
