import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import authRoutes from "./auth";
import videoRoutes from "./video";
const router: Router = Router();

// TODO: Add more routes
router.get("/", (_req, res) => {
	res.json({ name: "VideoFlow" });
});

router.use("/auth", authRoutes);
router.use("/video", authMiddleware, videoRoutes);
export default router;
