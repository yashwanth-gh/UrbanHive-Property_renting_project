import MessageItem from '@/components/MessageItem';
import DB_Connect from '@/config/DB_Connect'
import Message from '@/models/Message';
import { convertToSerializableObjects } from '@/utils/convertToObjects';
import { getSessionUser } from '@/utils/getSessionUser';
import React from 'react'

/* import mongoose from 'mongoose';
import Property from '@/models/Property';
import User from '@/models/User';
 */
/* // Ensure Property and User models are registered with Mongoose
if (!mongoose.models.Property) {
    mongoose.model('Property', Property.schema);
}
if (!mongoose.models.User) {
    mongoose.model('User', User.schema);
} */

const MessagesPage = async () => {
    await DB_Connect();

    const userSession = await getSessionUser();
    const { userId } = userSession;

    const readMessages = await Message.find({ recipient: userId, read: true })
        .sort({ createdAt: -1 })
        .populate("sender", "username image")
        .populate("property", "name")
        .lean();

    const unreadMessages = await Message.find({ recipient: userId, read: false })
        .sort({ createdAt: -1 })
        .populate("sender", "username image")
        .populate("property", "name")
        .lean();

    const messages = [...readMessages, ...unreadMessages].map((messageDoc) => {
        const message = convertToSerializableObjects(messageDoc);
        message.sender = convertToSerializableObjects(messageDoc.sender);
        // message.image = convertToSerializableObjects(messageDoc.image);
        message.property = convertToSerializableObjects(messageDoc.property);
        return message;
    })



    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Your Messages</h2>
            {messages.length > 0 ? (
                <div className="space-y-4">
                    {messages.map((message, index) => (
                        <MessageItem key={index} message={message} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No messages received.</p>
            )}
        </div>
    )
}

export default MessagesPage