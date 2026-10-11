import mongoose from "mongoose";

const connectToMongo = () => {
  const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/myDatabase";
  mongoose
    .connect(mongoURI)
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch((err) => console.error("Connection Error:", err));
};

export default connectToMongo;
