import MessagesPage from '@/components/MessagesPage';
import DB_Connect from '@/config/DB_Connect';
import Message from '@/models/Message';
import { convertToSerializableObjects } from '@/utils/convertToObjects';
import { getSessionUser } from '@/utils/getSessionUser';

const MessagesPageContainer = async () => {
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

    const messages = [...unreadMessages, ...readMessages].map((messageDoc) => {
        const message = convertToSerializableObjects(messageDoc);
        // Check if the sender exists before converting
        if (messageDoc.sender) {
            message.sender = convertToSerializableObjects(messageDoc.sender);
        } else {
            message.sender = null; // or any default/fallback value you prefer
        }

        // Check if the property exists before converting
        if (messageDoc.property) {
            message.property = convertToSerializableObjects(messageDoc.property);
        } else {
            message.property = null; // or any default/fallback value you prefer
        }

        return message;
    });

    return <MessagesPage messages={messages} />;
};

export default MessagesPageContainer;
