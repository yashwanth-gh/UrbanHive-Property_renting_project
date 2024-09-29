"use server";

import DB_Connect from "@/config/DB_Connect";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

const updateImageTitle = async (propertyId, imageIndex, newTitle) => {
  await DB_Connect();

  const userSession = await getSessionUser();

  if (!userSession || !userSession?.userId) {
    return { success: false, message: "Unauthorized : Please login again!" };
  }

  const { userId } = userSession;

  // Fetch the property
  const property = await Property.findById(propertyId);

  if (!property) {
    return { success: false, message: "Property not found!" };
  }

  // Check if the user is the owner
  if (property.owner.toString() !== userId) {
    return {
      success: false,
      message: "You are not authorized to edit this property.",
    };
  }

  // Update the image title
  property.images[imageIndex].title = newTitle;
  await property.save();

  return { success: true, message: "Image title updated successfully!" };
};

export default updateImageTitle;
