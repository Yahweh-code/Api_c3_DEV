import { Router } from "express";
import PostController from "../controllers/PostController";

const router = Router();

router.get("/", PostController.listPosts);
router.post("/", PostController.createPost);
router.put("/:id", PostController.updatePost);
router.delete("/:id", PostController.deletePost);

export default router;
