import { Router } from "express";

const router: Router = Router();

// TODO: Add more routes
router.get("/", (_req, res) => {
	res.json({ name: "VideoFlow" });
});

export default router;
