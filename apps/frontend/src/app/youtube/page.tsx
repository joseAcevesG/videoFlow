"use client";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";

export default function YouTubePage() {
	const router = useRouter();
	const [url, setUrl] = useState("");
	const [error, setError] = useState("");
	const [videos, setVideos] = useState<{ id: string; title: string }[]>([]);
	const [loading, setLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Fetch previously watched videos
	useEffect(() => {
		fetch("/api/video", {
			credentials: "include",
		})
			.then((response) => response.json())
			.then((data) => {
				setVideos(data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching videos:", error);
				setLoading(false);
			});
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		// call the process api
		await fetch("/api/video", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				credentials: "include",
			},
			body: JSON.stringify({ videoUrl: url }),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Failed to process the video URL");
				}
				return response.json();
			})
			.then((data) => {
				router.push(`/video/${data.videoId}`);
			})
			.catch((error) => {
				console.error("Error processing video:", error);
				setError("Failed to process the video URL");
				// if there is an error then you can try again
				setIsSubmitting(false);
			});
	};

	return (
		<div className="h-svh py-8 px-4">
			<Card className="max-w-3xl mx-auto py-4">
				<CardHeader className="flex justify-between items-center">
					<div>
						<CardTitle>YouTube Video Player</CardTitle>
						<CardDescription>
							Enter a YouTube URL to watch and analyze the video
						</CardDescription>
					</div>
					<ThemeToggle />
				</CardHeader>
				<CardContent>
					<form className="space-y-4" onSubmit={handleSubmit}>
						<div className="flex flex-col sm:flex-row gap-2">
							<Input
								className="flex-1"
								onChange={(e) => setUrl(e.target.value)}
								placeholder="https://www.youtube.com/watch?v=..."
								type="text"
								value={url}
							/>
							<Button disabled={isSubmitting} type="submit">
								{isSubmitting ? "Loading..." : "Load Video"}
							</Button>
						</div>
						{error && (
							<Alert variant="destructive">
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}
					</form>
				</CardContent>
			</Card>

			<Card className="max-w-3xl mx-auto mt-6 py-4">
				<CardHeader>
					<CardTitle>Previously Visited Videos</CardTitle>
				</CardHeader>
				<CardContent>
					{loading ? (
						<p>Loading...</p>
					) : videos.length > 0 ? (
						<ul>
							{videos.map((video: { title: string; id: string }) => (
								<li className="mb-4" key={video.id}>
									<Link
										className="text-blue-500 hover:underline"
										href={`/video/${video.id}`}
									>
										{video.title}
									</Link>
								</li>
							))}
						</ul>
					) : (
						<p>No previously watched videos found.</p>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
