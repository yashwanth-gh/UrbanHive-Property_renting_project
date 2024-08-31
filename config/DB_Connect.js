import mongoose from "mongoose";
import Property from "@/models/Property";
import User from "@/models/User";
import Message from "@/models/Message";

let isConnected = false;

// Function to register models
const registerModels = () => {
  if (!mongoose.models.Property) {
    mongoose.model("Property", Property.schema);
  }
  if (!mongoose.models.User) {
    mongoose.model("User", User.schema);
  }
  if (!mongoose.models.Message) {
    mongoose.model("Message", Message.schema);
  }
};

// Function to connect to the database
const DB_Connect = async () => {
  mongoose.set("strictQuery", false);

  if (isConnected) {
    console.log("Already connected to the database");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("Connected to the database");
  } catch (error) {
    console.log("Database connection failed:", error);
  } finally {
    registerModels(); // Register models after connection attempt
  }
};

export default DB_Connect;
