import path from "node:path";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import next from "next";
import { EnvConfig } from "./config/env.config";
import connectDB from "./config/mongoose.config";
import routes from "./routes";

const dev = EnvConfig().environment !== "production";
const port = EnvConfig().port;

const nextApp = next({
	dev,
	dir: path.join(__dirname, "../../", "frontend"),
});
const handle = nextApp.getRequestHandler();
async function startServer() {
	try {
		await connectDB();
		const app = express();
		app.use(cors());
		app.use(express.json());
		app.use(cookieParser());
		app.use("/api", routes);

		if (!dev) {
			await nextApp.prepare();
			app.all(/^(?!\/api).*/, (req, res) => {
				console.log("Request to Next.js");
				return handle(req, res);
			});
		}

		// Start the server
		app.listen(port, () => {
			console.log("> Server is running on http://localhost:4000");
		});
	} catch (error) {
		console.error("Failed to start server:", error);
		process.exit(1);
	}
}

startServer();
