"use server";

import DB_Connect from "@/config/DB_Connect";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

const checkBookmarkStatus = async (propertyId) => {
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

  return user.bookmarks.includes(propertyId);
};

export default checkBookmarkStatus;
