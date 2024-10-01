"use server";

import DB_Connect from "@/config/DB_Connect";
import Review from "@/models/Review";
import { getSessionUser } from "@/utils/getSessionUser";
import Property from "@/models/Property";
import { revalidatePath } from "next/cache";

const addPropertyReview = async ({
  propertyId,
  userId,
  rating,
  reviewText,
}) => {
  await DB_Connect();

  const userSession = await getSessionUser();

  if (!userSession || !userSession?.userId) {
    return { success: false, message: "Unauthorized: Please login again!" };
  }

  const property = await Property.findById(propertyId);

  if (!property) {
    return { success: false, message: "Property not found!" };
  }

  // Check if user is the owner
  if (property.owner.toString() === userId) {
    return { success: false, message: "You cannot review your own property!" };
  }

  const review = new Review({
    property: propertyId,
    user: userId,
    rating,
    reviewText,
  });

  await review.save();

  // Push the review ID to the property's reviews array
  await property.reviews.push(review._id);

  // Calculate the new average rating
  const numberOfReviews = property.reviews.length; // Get the count of current reviews
  const currentTotalRating = property.rating * (numberOfReviews - 1); // Current total rating excluding the new one
  const newTotalRating = currentTotalRating + rating; // Add the new rating
  const newAverageRating = newTotalRating / numberOfReviews; // Calculate the new average rating

  // Update the property rating
  property.rating = newAverageRating; // Update the property rating
  await property.save();

  revalidatePath(
    `/property/${propertyId}` // Revalidate the property page
  );
  return { success: true, message: "Review added successfully!" };
};

export default addPropertyReview;
