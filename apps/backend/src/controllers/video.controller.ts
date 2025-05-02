import type { GenerateContentResult } from "@google/generative-ai";
import type { ContentTableItem } from "@shared/types";
import type { Response } from "express";
import { Types } from "mongoose";
import {
	generationConfig,
	model,
	transcriptPrompt,
} from "../config/gemini.config";
import { youtubeUrlSchema } from "../config/zod.config";
import userModel from "../models/user.model";
import videoModel from "../models/video.model";
import type { GeminiResponse, UserRequest } from "../types";
import StatusCodes from "../types/response-codes";
import { BadRequestError } from "../utils/errors";
import { getVideoTitle } from "../utils/get_video_title";
import { fetchTranscript, formatTranscript } from "../utils/transcript";
import { validateUserAndVideo } from "../utils/validate_video_and_user";

class VideoController {
	async processVideo(req: UserRequest, res: Response) {
		const { videoUrl } = req.body;

		try {
			const validatedUrl = youtubeUrlSchema.parse(videoUrl);
			if (!validatedUrl) {
				throw new BadRequestError("Invalid YouTube video URL");
			}
			if (!req.user) {
				res.status(StatusCodes.UNAUTHORIZED.code).json({
					message: "Unauthorized",
				});
				return;
			}
			const video = await videoModel.findOne({ url: validatedUrl });
			if (video) {
				const result = validateUserAndVideo(req.user, video._id.toString());

				if (!result) {
					await userModel.findOneAndUpdate(
						{ email: req.user.email },
						{ $push: { userVideos: { videoId: video._id } } },
					);
					res.status(StatusCodes.SUCCESS.code).json({
						videoId: video._id,
						url: video.url,
						title: video.title,
					});
					return;
				}
				res.status(StatusCodes.BAD_REQUEST.code).json({
					message: "Video already exists",
				});
				return;
			}

			const transcript = await fetchTranscript(
				new URL(validatedUrl).searchParams.get("v") as string,
			);
			console.log("Transcript fetched successfully");
			const formattedTranscript = formatTranscript(transcript as unknown[]);
			console.log("Transcript formatted successfully");

			const finalPrompt = `${transcriptPrompt}

Here is the input transcript JSON:
${JSON.stringify(formattedTranscript, null, 2)}

Generate the ContentTable JSON based on this transcript.`;

			const chatSession = model.startChat({
				generationConfig,
				history: [
					{
						role: "user",
						parts: [
							{
								text: finalPrompt,
							},
						],
					},
				],
			});
			console.log("Chat session started");
			const result: GenerateContentResult = await chatSession.sendMessage("");
			console.log("Chat session completed");
			const responseText = result.response.text();

			// Remove any markdown formatting or extra text
			const jsonStr = responseText.replace(/```json\n|\n```|```/g, "").trim();
			const geminiContentTable: GeminiResponse[] = JSON.parse(jsonStr);

			const contentTable: ContentTableItem[] = geminiContentTable.map(
				(geminiItem) => ({
					id: new Types.ObjectId().toString(),
					start: formattedTranscript[geminiItem.transcript_start_id].start,
					end: formattedTranscript[geminiItem.transcript_end_id].end,
					chapter: geminiItem.chapter,
					summary: geminiItem.summary,
					transcript: formattedTranscript.slice(
						geminiItem.transcript_start_id,
						geminiItem.transcript_end_id + 1,
					),
				}),
			);

			const title = await getVideoTitle(videoUrl);

			const createdVideo = await videoModel.create({
				url: validatedUrl,
				title: title,
				transcript: formattedTranscript,
				contentTable,
			});

			await userModel.findOneAndUpdate(
				{ email: req.user.email },
				{ $push: { userVideos: { videoId: createdVideo._id } } },
			);

			res.status(StatusCodes.SUCCESS.code).json({
				videoId: createdVideo._id,
				url: createdVideo.url,
				title: createdVideo.title,
			});
		} catch (error) {
			console.error("Error in video processing:", error);
			if (
				error instanceof Error &&
				error.message === "Failed to parse Gemini response as JSON"
			) {
				res
					.status(StatusCodes.INTERNAL_SERVER_ERROR.code)
					.send("Failed to parse AI response");
			} else {
				res
					.status(StatusCodes.INTERNAL_SERVER_ERROR.code)
					.send(StatusCodes.INTERNAL_SERVER_ERROR.message);
			}
		}
	}
}

export default new VideoController();
