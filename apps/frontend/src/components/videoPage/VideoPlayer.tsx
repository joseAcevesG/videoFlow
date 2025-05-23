// /components/VideoPlayer.tsx
"use client";

const VideoPlayer = () => {
	// Player initialization is handled in useVideoPage via context
	return (
		<div className="card transition-all duration-200 hover:-translate-y-1 hover:bg-background/40 h-full w-full">
			<div className="card-content p-0 h-full w-full">
				<div className="relative  h-full w-full">
					<div
						className="absolute inset-0 w-full h-full rounded-xl overflow-hidden"
						id="youtube-player"
					/>
				</div>
			</div>
		</div>
	);
};

export default VideoPlayer;
