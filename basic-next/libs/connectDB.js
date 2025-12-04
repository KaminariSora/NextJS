import mongoose from "mongoose";

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    });

    isConnected = db.connections[0].readyState === 1;

    console.log("MongoDB Connected:", db.connections[0].name);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

export default connectDB;
