import mongoose from "mongoose";

let connect = false;

const DB_Connect = async () => {
  mongoose.set("strictQuery", false);

  if (connect) {
    return console.log("Already connected to the database");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connect = true;
    console.log("Connected to the database");
  } catch (error) {
    console.log(error);
  }
};

export default DB_Connect;
