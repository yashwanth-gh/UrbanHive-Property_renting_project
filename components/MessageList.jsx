import React from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { FaCircle } from 'react-icons/fa';

const MessageList = ({ messages, selectedMessageId, onSelectMessage }) => {
    return (
        <div className="w-full h-full max-h-[88vh] overflow-y-auto">
            {messages.map((message) => (
                <div
                    key={message._id}
                    className={`p-4 cursor-pointer ${selectedMessageId === message._id ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                    onClick={() => onSelectMessage(message._id)}
                >
                    <div className="flex items-center space-x-3">
                        <Image
                            src={message.sender?.image || '/default-avatar.png'}
                            alt={`${message.sender?.username || "Deleted User"}'s profile picture`}
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <div className="flex-grow">
                            <div className="font-bold">{message.sender?.username || "Deleted User"}</div>
                            <div className="text-xs text-gray-500">
                                {format(new Date(message.createdAt), 'MMM dd, yyyy hh:mm a')}
                            </div>
                        </div>
                        {!message.read && (
                            <span className="text-green-500 text-sm font-medium">
                                <FaCircle className='inline mb-1  mr-1' />
                                <p className='hidden lg:inline '>Unread</p>
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MessageList;
