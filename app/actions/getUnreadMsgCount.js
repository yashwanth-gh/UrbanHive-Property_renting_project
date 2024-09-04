"use server";

import DB_Connect from "@/config/DB_Connect";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

const getUnreadMsgCount = async () => {
  await DB_Connect();

  const userSession = await getSessionUser();

  if (!userSession || !userSession?.userId) {
    return { success: false, message: "Unauthorized : Please login again!" };
  }

  const { userId } = userSession;

  const count = await Message.countDocuments({
    recipient: userId,
    read: false,
  });

  return {
    success: true,
    count,
  };
};

export default getUnreadMsgCount;
