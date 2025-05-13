import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth";
const router: Router = Router();

router.post("/signup", AuthController.signUp.bind(AuthController));
router.post("/login", AuthController.login.bind(AuthController));
router.post(
	"/reset-password",
	AuthController.resetPassword.bind(AuthController),
);
router.post("/authenticate", AuthController.authenticate.bind(AuthController));
router.post("/logout", authMiddleware, AuthController.logout);
router.post("/logout-all", authMiddleware, AuthController.logoutAll);
router.get("/status", AuthController.status);

export default router;
