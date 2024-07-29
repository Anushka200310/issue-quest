import express from 'express'
import { deleteUser, getUserPost, updateUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const userRouter = express.Router()

userRouter.route("/update/:id").post(authMiddleware, updateUser);
userRouter.route("/delete/:id").delete(authMiddleware, deleteUser);
userRouter.route("/posts/:id").get(authMiddleware, getUserPost);

export default userRouter;