import express from 'express';
import { createPost, deletePost, updatePost }  from '../controllers/postController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const postRouter = express.Router();

postRouter.route("/create").post(authMiddleware, createPost);
postRouter.route("/delete/:id").delete(authMiddleware, deletePost);
postRouter.route("/update/:id").post(authMiddleware, updatePost);


export default postRouter;