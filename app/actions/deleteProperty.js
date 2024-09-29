"use server";

import DB_Connect from "@/config/DB_Connect";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import cloudinary from "@/config/cloudinary";

const deleteProperty = async (propertyId) => {
  await DB_Connect();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser?.userId) {
    throw new Error("You must be logged in to delete a property");
  }

  const { userId } = sessionUser;

  const property = await Property.findById(propertyId);

  if (!property) {
    throw new Error("Property not found");
  }

  if (property.owner.toString() !== userId.toString()) {
    throw new Error("You are not authorized to delete this property");
  }
  //TODO: configure to get images id
  //extract imageids from property
  const imageIds = property.images.map(({ url: imageUrl }) => {
    const parts = imageUrl.split("/");
    return parts[parts.length - 1].split(".")[0];
  });

  console.log(imageIds);

  //delete those images from cloudinary
  if (imageIds.length > 0)
    for (const imageId of imageIds) {
      await cloudinary.uploader.destroy("Urbanhive/" + imageId);
    }

  //delete property
  await property.deleteOne();

  revalidatePath("/", "layout");
};

export default deleteProperty;
