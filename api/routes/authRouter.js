import express from 'express'
import { SignUp, LogIn, Google, user } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const authRouter = express.Router()

// signup route
authRouter.route("/signup").post(SignUp);

//login route

authRouter.route("/login").post(LogIn);

// google login route

authRouter.route("/google").post(Google);

// fetching current user data route

authRouter.route("/currentUser").get(authMiddleware, user);

export default authRouter;