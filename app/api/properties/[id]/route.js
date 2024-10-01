import DB_Connect from "@/config/DB_Connect";
import Property from "@/models/Property";
import { convertToSerializableObjects } from "@/utils/convertToObjects";

// GET -> /api/properties/id
export const GET = async (request, { params }) => {
  try {
    await DB_Connect();

    // Fetch the property by id and populate reviews and user details within reviews
    const propertyDocs = await Property.findById(params.id)
      .populate({
        path: "reviews",
        model: "Review",
        options: { sort: { createdAt: -1 } }, // Sort reviews by createdAt in descending order
        populate: {
          path: "user",
          model: "User",
          select: "username image",
        },
      })
      .lean();

    const property = convertToSerializableObjects(propertyDocs);

    // console.log(propertyDocs);

    if (!property) {
      return new Response("Property not found :(", { status: 404 });
    }

    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    console.error("Error fetching property:", error);
    return new Response("Something went wrong :(", { status: 500 });
  }
};

// import DB_Connect from "@/config/DB_Connect";
// import Property from "@/models/Property";
// import { convertToSerializableObjects } from "@/utils/convertToObjects";

// // GET -> /api/properties/id
// export const GET = async (request, { params }) => {
//   try {
//     await DB_Connect();
//     const propertyDocs = await Property.findById(params.id).lean();
//     const property = convertToSerializableObjects(propertyDocs);
//     if (!property)
//       return new Response("Property not found :(", { status: 404 });
//     return new Response(JSON.stringify(property), { status: 200 });
//   } catch (error) {
//     return new Response("Something went wrong :(", { status: 500 });
//   }
// };
