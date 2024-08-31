"use server";

import DB_Connect from "@/config/DB_Connect";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

const markMessageAsRead = async (messageId) => {
  await DB_Connect();

  const userSession = await getSessionUser();

  if (!userSession || !userSession?.userId) {
    return { success: false, message: "Unauthorized : Please login again!" };
  }

  const { userId } = userSession;

  const message = await Message.findById(messageId);

  if (!message)
    return {
      success: false,
      message: "Message not found!",
    };

  //verify ownership
  if (message.recipient.toString() !== userId)
    return {
      success: false,
      message: "You are not authorized to mark this message",
    };

  message.read = !message.read;

  revalidatePath("/messages", "page");

  await message.save();

  return {
    success: true,
    message: message.read
      ? "Message marked as read"
      : "Message marked as unread",
    read: message.read,
  };
};

export default markMessageAsRead;
