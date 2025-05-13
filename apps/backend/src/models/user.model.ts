import { Schema, model } from "mongoose";

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	userVideos: [
		{
			videoId: {
				type: String,
				required: true,
			},
			flashCard: [
				{
					_id: {
						type: String,
						required: true,
					},
					front: {
						type: String,
						required: true,
					},
					back: {
						type: String,
						required: true,
					},
				},
			],
			notes: [
				{
					_id: {
						type: String,
						required: true,
					},
					moment: {
						type: Number,
						required: true,
					},
					text: {
						type: String,
						required: true,
					},
				},
			],
		},
	],
	token_version: {
		type: Number,
		default: 0,
	},
});

export default model("User", userSchema);
