"use server";
import DB_Connect from "@/config/DB_Connect";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudinary";

async function addProperty(formData) {
  await DB_Connect();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser?.userId) {
    return {
      success: false,
      message: "UserId is required",
    };
  }
  const { userId } = sessionUser;

  //*get all images name
  const images = formData.getAll("images").filter((image) => image.name != "");

  //* get all amenities array
  const amenities = formData.getAll("amenities");

  //* get all data from form
  const data = {
    owner: userId,
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
    square_feet: formData.get("square_feet"),
    amenities,
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
    agreement: formData.has("agreement"),
  };

  const imageUrls = await Promise.all(
    images.map(async (imageFile) => {
      try {
        const imageBuffer = await imageFile.arrayBuffer();
        const base64Image = Buffer.from(imageBuffer).toString("base64");

        const result = await cloudinary.uploader.upload(
          `data:image/png;base64,${base64Image}`,
          { folder: "Urbanhive" }
        );

        return { url: result.secure_url, title: "Image Title" };
      } catch (uploadError) {
        console.error("Image upload failed:", uploadError);
        return {
          success: false,
          message: "Failed to upload one or more images.",
        };
      }
    })
  );

  data.images = imageUrls;
  const newProperty = new Property(data);
  await newProperty.save();

  revalidatePath("/", "layout");
  redirect(`/properties/${newProperty._id}`);
}

export default addProperty;
