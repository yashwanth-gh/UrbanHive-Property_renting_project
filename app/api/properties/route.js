import DB_Connect from "@/config/DB_Connect";
import Property from "@/models/Property";

// GET -> /api/properties
export const GET = async (request) => {
  try {
    // Parse the request URL to get query params
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page")) || 1; // Default to page 1 if missing
    const pageSize = parseInt(searchParams.get("pageSize")) || 10; // Default to 10 items per page if missing

    // Calculate skip for pagination (e.g., skip = 10 means skip first 10 items)
    const skip = (page - 1) * pageSize;

    await DB_Connect();

    // Count total number of properties
    const totalProperties = await Property.countDocuments();

    // Fetch the paginated properties
    const properties = await Property.find({})
      .sort({ createdAt: -1 })
      .skip(skip) // Skip documents for pagination
      .limit(pageSize); // Limit the number of properties per page

    // Send the total count along with the paginated properties
    const response = {
      total: totalProperties,
      page,
      pageSize,
      properties,
    };

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new Response("Something went wrong :(", { status: 500 });
  }
};
