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
        message.sender = convertToSerializableObjects(messageDoc.sender);
        message.property = convertToSerializableObjects(messageDoc.property);
        return message;
    });

    return <MessagesPage messages={messages} />;
};

export default MessagesPageContainer;
