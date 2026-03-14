import mongoose from "mongoose";

const loginCredential = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isValidate: { type: Boolean, default: null },
    isVerified: { type: Boolean, default: null },
    otp: { type: String, default: null },
    otpExpiry: { type: Date, default: null },
    token: { type: String, default: null },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", loginCredential); 