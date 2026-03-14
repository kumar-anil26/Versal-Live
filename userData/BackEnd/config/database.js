import mongoose from "mongoose";

export const DBConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
  
    return;
  } catch (err) {
    return;
  }
};
