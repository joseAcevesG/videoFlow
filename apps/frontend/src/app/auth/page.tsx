"use client";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { authTypes } from "shared/auth-types";
import { z } from "zod";

const emailSchema = z.object({
	email: z.string().email("Invalid email format"),
});

export default function AuthPage() {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isDarkMode, setIsDarkMode] = useState(false);

	// Handle theme switching based on the isDarkMode state
	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	}, [isDarkMode]);

	// Check localStorage for user preference on initial load
	useEffect(() => {
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme === "dark") {
			setIsDarkMode(true);
		}
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		try {
			const validationResult = emailSchema.safeParse({ email });
			if (!validationResult.success) {
				setError("Invalid email format");
				setIsLoading(false);
				return;
			}

			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: {
					credentials: "include",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: validationResult.data.email,
					type: authTypes.magicLink,
				}),
			});

			if (!response.ok) {
				const contentType = response.headers.get("content-type");
				if (contentType?.includes("application/json")) {
					const errorData = await response.json();
					throw new Error(errorData.error || "Failed to send login link");
				}
				const errorText = await response.text();
				throw new Error(errorText || "Failed to send login link");
			}

			setIsSuccess(true);
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: "An error occurred. Please try again."
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center  p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="flex justify-between items-center">
					<div>
						<CardTitle>Welcome to DonsFlow</CardTitle>
						<CardDescription>
							Enter your email to sign in or create an account
						</CardDescription>
					</div>
					<ThemeToggle />
				</CardHeader>
				<form noValidate onSubmit={handleSubmit}>
					<CardContent>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="email">Email</Label>
								<Input
									disabled={isLoading || isSuccess}
									id="email"
									onChange={(e) => {
										setEmail(e.target.value);
										setError(null);
									}}
									placeholder="Enter your email"
									required
									type="email"
									value={email}
								/>
							</div>
						</div>
						{error && (
							<Alert className="mt-4" variant="destructive">
								<AlertCircle className="h-4 w-4" />
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}
						{isSuccess && (
							<Alert className="mt-4">
								<AlertDescription>
									Check your email for a login link!
								</AlertDescription>
							</Alert>
						)}
					</CardContent>
					<CardFooter>
						<Button
							className="w-full mt-2"
							disabled={isLoading || isSuccess}
							type="submit"
						>
							{isLoading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Sending link...
								</>
							) : (
								"Continue with Email"
							)}
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
