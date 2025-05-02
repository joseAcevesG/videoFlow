import { Router } from "express";
import VideoController from "../controllers/video.controller";
const router: Router = Router();

// Routes for the notes of a specific video

router.post("/", VideoController.processVideo);
router.get("/:videoID", VideoController.getVideo);
router.get("/", VideoController.getAllUserVideos);

export default router;
