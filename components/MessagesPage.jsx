"use client"
import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageDetail from './MessageDetail';

const MessagesPage = ({ messages }) => {
    const [selectedMessageId, setSelectedMessageId] = useState(null);

    const selectedMessage = messages.find((message) => message._id === selectedMessageId);

    return (
        <div className="flex h-screen container">
            {/* Message List for Large and Medium Screens */}
            <div className="hidden md:flex w-1/3">
                <MessageList
                    messages={messages}
                    selectedMessageId={selectedMessageId}
                    onSelectMessage={setSelectedMessageId}
                />
            </div>

            {/* Message Detail for Large and Medium Screens */}
            <div className="hidden md:flex flex-1">
                <MessageDetail message={selectedMessage} />
            </div>

            {/* Mobile View */}
            <div className="md:hidden w-full h-full">
                {selectedMessageId ? (
                    <MessageDetail
                        message={selectedMessage}
                        onBack={() => setSelectedMessageId(null)}
                    />
                ) : (
                    <MessageList
                        messages={messages}
                        selectedMessageId={selectedMessageId}
                        onSelectMessage={setSelectedMessageId}
                    />
                )}
            </div>
        </div>
    );
};

export default MessagesPage;
