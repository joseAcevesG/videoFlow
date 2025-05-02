import { Router } from "express";
import VideoController from "../controllers/video.controller";
import flashcardRoutes from "./flashcards";
import noteRoutes from "./notes";
import quizRoutes from "./quiz";
const router: Router = Router();

router.post("/", VideoController.processVideo);
router.get("/", VideoController.getAllUserVideos);
router.get("/:videoID", VideoController.getVideo);
router.use("/:videoID/notes/", noteRoutes);
router.use("/:videoID/flashcards/", flashcardRoutes);
router.use("/:videoID/quiz/", quizRoutes);

export default router;
