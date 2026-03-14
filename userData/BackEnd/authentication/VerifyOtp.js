import { User } from "../models/userModel/LoginCredential.js";
import bcrypt from "bcrypt";
import { TempUser } from "../models/userModel/TempCredential.js";

export const VerifyOtp = async (req, res) => {
  try {
    // Fetch email and OTP
    const { email, otp } = req?.body;

    // Check email or otp
    if (!email || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "Email and otp required!" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already present" });
    }

    // GET user
    const tempuser = await TempUser.findOne({ email });

    // check user valid or not
    if (!tempuser) {
      return res
        .status(400)
        .json({ success: false, message: "User not found!" });
    }

    // Check OTP match
    const match = await bcrypt.compare(otp, tempuser.otp);
    if (!match) {
      return res.status(400).json({ success: false, message: "Invalid opt" });
    }

    // Check OTP expiry
    if (tempuser.otpExpiry < Date.now()) {
      return res.status(400).json({ success: false, message: "OTP Expired" });
    }

    //verify OTP

    const newUser = await User.create({
      username: tempuser.username,
      password: tempuser.password,
      email: tempuser.email,
      isVerified: true,
    });
    return res
      .status(200)
      .json({ success: true, message: "User Registered successfull." });
  } catch (error) {
    return res.status(500).json({ Success: false, message: error.message });
  }
};
