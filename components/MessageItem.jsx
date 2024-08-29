"use client"
import React, { useState } from 'react'
import { format } from 'date-fns';
import Image from 'next/image';

const MessageItem = ({ message }) => {
    const [showFullMessage, setShowFullMessage] = useState(false);

    const toggleShowMessage = () => setShowFullMessage(!showFullMessage);

    return (
        <div className={`${message.read ? 'bg-primary-foreground' : 'bg-green-100'} border p-4 rounded-lg shadow-md flex items-start space-x-4`}>
            {/* Sender Image */}
            <Image
                src={message.sender.image || '/default-avatar.png'}
                alt={`${message.sender.username}'s profile picture`}
                width={50}
                height={50}
                className="rounded-full"
            />

            {/* Message Details */}
            <div className="flex-grow" >
                <div className="flex justify-between items-center mb-2">
                    <div className="text-lg font-bold">{message.sender.username}</div>
                    <div className="text-sm text-gray-500">
                        {format(new Date(message.createdAt), 'MMM dd, yyyy hh:mm a')}
                    </div>
                </div>

                <div className="text-sm text-gray-700 mb-2">
                    {showFullMessage ? message.body : `${message.body.substring(0, 50)}...`}
                </div>

                <button
                    className="text-primary font-semibold text-sm"
                    onClick={toggleShowMessage}
                >
                    {showFullMessage ? 'Show Less' : 'Read More'}
                </button>

                {/* Unread Indicator */}
                {!message.read && (
                    <div className="mt-2 flex items-center space-x-2">
                        <span className="bg-green-500 h-3 w-3 rounded-full inline-block"></span>
                        <span className="text-green-600 font-medium text-xs">Unread</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessageItem