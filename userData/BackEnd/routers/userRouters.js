import express from "express";
import {
  getUserProfile,
  LoginUser,
  RegisterUser,
} from "../controllers/UserController/RegisterUser.js";
import { VerifyOtp } from "../authentication/VerifyOtp.js";

const userRouter = express.Router();

userRouter.post("/register", RegisterUser);

userRouter.post("/verify", VerifyOtp);

userRouter.post("/login", LoginUser);

userRouter.get("/profile/:userID", getUserProfile);

export default userRouter;
