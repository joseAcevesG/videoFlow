import path from "node:path";
import type { User } from "@shared/types";
import cors from "cors";
import express from "express";
import next from "next";

const app = express();
const dev = process.env.NODE_ENV !== "production";

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
	const user: User = {
		id: "1",
		name: "John Doe",
		email: "johndoe@example.com",
	};
	console.log(user);
	res.json({ status: "ok", user });
});

async function startServer() {
	try {
		if (!dev) {
			const nextApp = next({
				dir: path.join(__dirname, "../../", "frontend"),
			});
			const handle = nextApp.getRequestHandler();
			// All other routes go to Next.js
			app.all(/^(?!\/api).*/, (req, res) => {
				console.log("Request to Next.js");
				return handle(req, res);
			});
			// Prepare Next.js (loads .next, etc.)
			await nextApp.prepare();
		}

		// Start the server
		app.listen(4000, () => {
			console.log("> Server is running on http://localhost:4000");
		});
	} catch (error) {
		console.error("Failed to start server:", error);
		process.exit(1);
	}
}

startServer();
