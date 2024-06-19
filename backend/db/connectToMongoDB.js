import mongoose from "mongoose";

const connectToMongDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log(`MongoDB is connected: ${conn.connection.name}`.blue);
  } catch (error) {
    console.log("Error connecting to MongoDB", error.message);
  }
};

export default connectToMongDB;
