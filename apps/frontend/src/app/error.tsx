"use client";

import { useEffect } from "react";
import { Button } from "../components/ui/button";

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
			<h2 className="text-2xl font-bold">Something went wrong!</h2>
			<Button onClick={() => reset()} variant="outline">
				Try again
			</Button>
		</div>
	);
}
