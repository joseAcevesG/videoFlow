export interface User {
	_id: string;
	email: string;
	userVideos?: UserVideosItem[];
}

export interface UserVideosItem {
	flashCard: FlashCardItem[];
	notes: UserNoteItem[];
	videoId: string | Video;
}

export interface Video {
	id: string;
	url: string;
	title: string;
	transcript: TranscriptItem[];
	contentTable: ContentTableItem[];
}

interface FlashCardItem {
	_id: string;
	back: string;
	front: string;
}

export interface UserNoteItem {
	_id: string;
	moment: number;
	text: string;
}

export interface ContentTableItem {
	id: string;
	start: number;
	end: number;
	chapter: string;
	summary: string;
	transcript: TranscriptItem[];
}

export interface TranscriptItem {
	id: number;
	start: number;
	end: number;
	text: string;
}

export interface VideoPage {
	flashCard: FlashCardItem[];
	notes: UserNoteItem[];
	video: Video;
}
