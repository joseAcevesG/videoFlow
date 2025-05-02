import { Router } from "express";
import VideoController from "../controllers/video.controller";
import flashcardRoutes from "./flashcards";
import noteRoutes from "./notes";
const router: Router = Router();

router.post("/", VideoController.processVideo);
router.get("/", VideoController.getAllUserVideos);
router.get("/:videoID", VideoController.getVideo);
router.use("/:videoID/notes/", noteRoutes);
router.use("/:videoID/flashcards/", flashcardRoutes);

export default router;
