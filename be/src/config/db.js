import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_CONNECTION_STRING
    );
    console.log("Kết nối DB thành công");
  } catch (err) {
    console.error("Kết nối DB thất bại", err);
    process.exit(1);
  }
};
