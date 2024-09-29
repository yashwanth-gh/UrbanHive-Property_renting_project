const ApiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

//^ -----[1] GET ALL PROPERTIES DETAILS.
export const getProperties = async (page, pageSize) => {
  try {
    const res = await fetch(
      `${ApiDomain}/properties?page=${page}&pageSize=${pageSize}`
      /* { cache: 'no-store' } */
    );

    if (!ApiDomain) return [];

    if (!res.ok) throw new Error("Failed to fetch properties data");

    const data = await res.json();
    // console.log("properties api : ", data);

    return data;
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
};

//^ -----[2] GET SINGLE PROPERTY DETAIL.
export const getSingleProperty = async (id) => {
  try {
    const res = await fetch(
      `${ApiDomain}/properties/${id}`
      /* { cache: 'no-store' } */
    );

    if (!ApiDomain) return null;

    if (!res.ok) throw new Error("Failed to fetch property data");

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching property:", error);
    return null;
  }
};
