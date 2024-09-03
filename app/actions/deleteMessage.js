"use server";

import DB_Connect from "@/config/DB_Connect";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

const deleteMessage = async (messageId) => {
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
      message: "You are not authorized to delete this message",
    };
  //delete message
  try {
    await message.deleteOne();
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error deleting message",
    };
  }

  revalidatePath("/", "layout");

  return {
    success: true,
    message: "Message deleted successfully",
  };
};

export default deleteMessage;
