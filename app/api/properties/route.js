import DB_Connect from "@/config/DB_Connect";
import Property from "@/models/Property";

// GET -> /api/properties
export const GET = async (request) => {
  try {
    await DB_Connect();
    const properties = await Property.find({});

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    return new Response("Something went wrong :(", { status: 500 });
  }
};
