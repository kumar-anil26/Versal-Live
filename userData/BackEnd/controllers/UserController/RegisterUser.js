import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models/userModel/LoginCredential.js";
import { AccountVerificationEmail } from "../../authentication/AccountVerification.js";
import { TempUser } from "../../models/userModel/TempCredential.js";

// Register new user

export const RegisterUser = async (req, res) => {
  const { username, email, password } = req?.body;

  try {
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are mandatory!" });
    }
    const isExistUser = await User.findOne({ email });
    if (isExistUser) {
      return res
        .status(400)
        .json({ success: false, message: "User Allready exist!" });
    }

    //! Remove TempUser if exist
    await TempUser.deleteMany();

    //! Passwrod hashing means decoading for security reason
    const salt = await bcrypt.genSalt(12);
    const newPassword = await bcrypt.hash(password, salt);

    //! Generate OPT For email verification
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    //! Hash OTP
    const newOtp = await bcrypt.hash(otp, salt);

    //! Save to database
    const newUser = await TempUser.create({
      username: username,
      email: email,
      password: newPassword,
      otp: newOtp,
      otpExpiry: Date.now() + 10 * 60 * 1000,
    });

    //! Eamil verification
    const verifyEamil = await AccountVerificationEmail(otp, email);

    if (verifyEamil.response.includes("OK")) {
      return res.status(200).json({
        success: true,
        message: "Otp send successfully to your reguster eamilID!",
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Login User

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req?.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "Both fields are mandatory!" });
    }

    // Find User
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credential!" });
    }

    const payload = { username: user.username, password: password };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "10 m",
    });
    user.token = token;
    await user.save();
    return res
      .status(200)
      .json({
        success: true,
        message: "Login successfylly",
        Id: user._id,
        token,
      });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

//! Get User Profile

export const getUserProfile = async (req, res) => {
  try {
    const userID = req?.params?.userID;
  
    const header = req.headers["authorization"];
    const token = header.split(" ")[1];

    //Check userid
    if (!userID) {
      return res
        .status(400)
        .json({ success: false, message: "User id missing." });
    }

    // Check toke
    if (!token) {
      return res.status(400).json({ success: false, message: "Token missing" });
    }

    // Find user
    const user = await User.findOne({ _id: userID });
     if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found!" });
    }

    //Verify token
    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
      if (err) {
        return res.status(403).json({ success: false, message: err.message });
      }
      return res.status(200).json({
        message: "User find successfully.",
        success: true,
        Id:userID,
        username: user.username,
        useremail: user.email,
      });
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
