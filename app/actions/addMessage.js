"use server";
import DB_Connect from "@/config/DB_Connect";
import Message from "@/models/Message";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function addMessage(previousState, formData) {
  await DB_Connect();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser?.userId) {
    return {
      success: false,
      message: "UserId is required",
    };
  }
  const { userId } = sessionUser;

  const recipientId = formData.get("recipient");

  if (!recipientId) {
    return {
      success: false,
      message: "Recipient is required",
    };
  }

  if (recipientId === userId) {
    return {
      success: false,
      message: "You cannot send a message to yourself",
    };
  }

  const newMessage = new Message({
    sender: userId,
    recipient: recipientId,
    property: formData.get("property"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    body: formData.get("body"),
  });

  await newMessage.save();

  return {
    success: true,
    message: "Message sent successfully",
  };
}

export default addMessage;
