import { Router } from "express";
import authRoutes from "./auth";

const router: Router = Router();

// TODO: Add more routes
router.get("/", (_req, res) => {
	res.json({ name: "VideoFlow" });
});

router.use("/auth", authRoutes);

export default router;
