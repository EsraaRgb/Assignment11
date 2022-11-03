import mongoose from "mongoose";

export default async function connectDB() {
  return await mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("DB Connected");
    })
    .catch(() => {
      console.log("Canno't Connect to DB");
    });
}
