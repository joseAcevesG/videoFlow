import dotenv from "dotenv";
import { z } from "zod";
import { EnvError } from "../utils/errors";

dotenv.config();

const envSchema = z.object({
	NODE_ENV: z
		.enum(["development", "production", "local"])
		.default("development"),
	PORT: z.string().default("4000"),
	DB_URL: z.string().min(1, "DB_URL is required"),
});
let env: z.infer<typeof envSchema>;

try {
	env = envSchema.parse(process.env);
} catch (error) {
	if (error instanceof z.ZodError) {
		throw new EnvError(error);
	}
	throw error;
}

export const EnvConfig = () => {
	const config = {
		environment: env.NODE_ENV,
		port: Number.parseInt(env.PORT, 10),
		dbUrl: env.DB_URL,
	} as const;

	return config;
};
