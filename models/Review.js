import mongoose, { Schema, model } from "mongoose";

// Review Schema
const ReviewSchema = new Schema(
  {
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5, // Assuming ratings are between 1 to 5 stars
    },
    reviewText: {
      type: String,
      required: true,
    },
    response: {
      type: String, // Response from the property owner
      default: "", // Owner can optionally respond
    },
  },
  {
    timestamps: true,
  }
);

// Create Review model
const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);

export default Review;
