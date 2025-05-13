import { z } from "zod";

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

export const FlashcardSchema = z.object({
	front: z.string().min(1, "Front is required"),
	back: z.string().min(1, "Back is required"),
});

export const FlashcardPatchSchema = FlashcardSchema.partial().refine(
	(data) => data.front !== undefined || data.back !== undefined,
	{
		message: "At least one field (front or back) must be provided",
	},
);
