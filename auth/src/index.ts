import mongoose from "mongoose";
import app from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY is not available");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not available");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to MongoDB");
  } catch (e) {
    console.error(e);
  }
};

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

start();
