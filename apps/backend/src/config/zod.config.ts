import { z } from "zod";

export const EmailSchema = z.object({
	email: z.string().email("Invalid email format"),
});

export const YoutubeUrlSchema = z.string().refine((url) => {
	const pattern =
		/^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;
	return pattern.test(url);
}, "Invalid YouTube video URL");

export const NoteSchema = z.object({
	moment: z.number().int(),
	text: z.string().min(1, "Text is required"),
});

export const NotePatchSchema = NoteSchema.partial().refine(
	(data) => data.moment !== undefined || data.text !== undefined,
	{
		message: "At least one field (moment or text) must be provided",
	},
);
