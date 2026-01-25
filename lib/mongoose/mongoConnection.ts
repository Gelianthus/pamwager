import mongoose from "mongoose";

async function mongoConnection(): Promise<typeof mongoose> {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("Missing MONGODB_URI environment variable");
  }

  try {
    const connection = await mongoose.connect(MONGODB_URI);

    console.log("Connected to Database, logged from mongoConnection.ts");

    return connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

export default mongoConnection;
