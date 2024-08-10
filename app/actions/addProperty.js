"use server";
import DB_Connect from "@/config/DB_Connect";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudinary";

async function addProperty(formData) {
  console.log(10);
  await DB_Connect();
  console.log(12);
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser?.userId) {
    throw new Error("UserId is required");
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
    amenities: amenities,
    images: images,
    agreement: formData.has("agreement"),
  };

  const imageUrls = [];

  for (const imageFiles of images) {
    const imageBuffer = await imageFiles.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    //convert to base64
    const base64Image = imageData.toString("base64");

    //make request to cloudinary
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${base64Image}`,
      {
        folder: "Urbanhive",
      }
    );

    imageUrls.push(result.secure_url);
  }

  data.images = imageUrls;
  const newProperty = new Property(data);
  await newProperty.save();

  revalidatePath("/", "layout");
  redirect(`/properties/${newProperty._id}`);
}

export default addProperty;
