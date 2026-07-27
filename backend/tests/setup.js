import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB for tests");
});

afterAll(async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed");
});