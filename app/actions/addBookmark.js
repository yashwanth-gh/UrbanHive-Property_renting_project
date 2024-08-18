"use server";

import DB_Connect from "@/config/DB_Connect";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

const addBookmark = async (propertyId) => {
  await DB_Connect();

  const userSession = await getSessionUser();

  if (!userSession || !userSession?.userId) {
    return { success: false, message: "Unauthorized : Please login again!" };
  }

  const { userId } = userSession;

  const user = await User.findById(userId);

  if (!user) {
    return { success: false, message: "User not found!" };
  }

  let isBookmarked = user.bookmarks.includes(propertyId);

  let message;

  if (isBookmarked) {
    user.bookmarks.pull(propertyId);
    message = " Removed from bookmarks!";
    isBookmarked = false;
  } else {
    user.bookmarks.push(propertyId);
    message = "Property added to bookmarks!";
    isBookmarked = true;
  }
  await user.save();

  revalidatePath("/", "layout");

  return {
    success: true,
    isBookmarked,
    message,
  };
};

export default addBookmark;
