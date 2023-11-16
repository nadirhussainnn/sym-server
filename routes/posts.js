import express from "express";
const router = express.Router();
import upload from "../middleware/upload-image.js";
import {
  createPost,
  getFeedPosts,
  getUserPosts,
  likePost,
} from "../controller/posts.js";
import verifyToken from "../middleware/auth.js";

//post posts
router.post("/", upload.single("picture"), createPost);

//Read
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

//update
router.patch("/:id/like", verifyToken, likePost);

//video time 1:18:11
export default router;
