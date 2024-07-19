import DB_Connect from "@/config/DB_Connect";
import Property from "@/models/Property";

// GET -> /api/properties/id
export const GET = async (request, { params }) => {
  try {
    await DB_Connect();
    const property = await Property.findById(params.id);
    if (!property)
      return new Response("Property not found :(", { status: 404 });
    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    return new Response("Something went wrong :(", { status: 500 });
  }
};
