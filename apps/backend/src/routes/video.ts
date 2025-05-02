import { Router } from "express";
import VideoController from "../controllers/video.controller";
import noteRoutes from "./notes";
const router: Router = Router();

router.post("/", VideoController.processVideo);
router.get("/", VideoController.getAllUserVideos);
router.get("/:videoID", VideoController.getVideo);
router.use("/:videoID/notes/", noteRoutes);

export default router;
