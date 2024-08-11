import DB_Connect from "@/config/DB_Connect";
import Property from "@/models/Property";
import { convertToSerializableObjects } from "@/utils/convertToObjects";

// GET -> /api/properties/id
export const GET = async (request, { params }) => {
  try {
    await DB_Connect();
    const propertyDocs = await Property.findById(params.id).lean();
    const property = convertToSerializableObjects(propertyDocs);
    if (!property)
      return new Response("Property not found :(", { status: 404 });
    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    return new Response("Something went wrong :(", { status: 500 });
  }
};
