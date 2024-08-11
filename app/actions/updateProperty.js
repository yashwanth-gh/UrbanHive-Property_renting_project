"use server";

const { default: DB_Connect } = require("@/config/DB_Connect");
const { default: Property } = require("@/models/Property");
const { getSessionUser } = require("@/utils/getSessionUser");
const { revalidatePath } = require("next/cache");
import { redirect } from "next/navigation";

async function updateProperty(propertyId, formData) {
  await DB_Connect();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser?.userId) {
    return {
      success: false,
      message: "UserId is not found , please login again!",
    };
  }
  const { userId } = sessionUser;

  const existingProperty = await Property.findById(propertyId);
  if (!existingProperty) {
    return {
      success: false,
      message: "This property is not found",
    };
  }
  //verify owner
  if (existingProperty.owner.toString() !== userId) {
    return {
      success: false,
      message: "You are not authorized to update this property",
    };
  }

  const data = {
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_feet: parseInt(formData.get("square_feet"), 10),
    amenities: formData.getAll("amenities"),
    rates: {
      nightly: formData.get("rates.nightly"),
      weekly: formData.get("rates.weekly"),
      monthly: formData.get("rates.monthly"),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
  };

  try {
    await Property.findByIdAndUpdate(propertyId, data);
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to update property",
    };
  }

  revalidatePath("/", "layout");

  redirect(`/properties/${propertyId}`);
}

export default updateProperty;
