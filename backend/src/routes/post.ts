import { Router } from "express";
import { createPost, updatePost, getPosts } from "../controllers/postController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// CREATE POST
router.post("/create", authMiddleware, createPost);

// UPDATE POST
router.put("/update/:postId", authMiddleware, updatePost);

//GET POSTS
router.get("/", getPosts);

export default router;
