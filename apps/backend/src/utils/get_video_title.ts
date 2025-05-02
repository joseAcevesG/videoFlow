/**
 * Fetches the title of a video from a given URL using the noembed API.
 * @param videoUrl
 */
export function getVideoTitle(videoUrl: string): Promise<string | null> {
	return fetch(`https://noembed.com/embed?url=${videoUrl}`)
		.then((response) => {
			if (!response.ok) {
				console.error("Response was not successful");
				return null;
			}
			return response.json();
		})
		.then((data) => {
			if (data?.title) {
				return data.title;
			}
			console.error("Response does not contain a title");
			return null;
		})
		.catch((error) => {
			console.error("Error fetching video title:", error);
			return null;
		});
}
