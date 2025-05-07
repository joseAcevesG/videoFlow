// /components/TranscriptQuizContainer.tsx
"use client";
import QuizSection from "@/components/quiz/QuizSection";
import TranscriptSection from "@/components/transcript/TranscriptSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuiz } from "@/hooks/useQuiz";
import type { ContentTableItem } from "@shared/types";

interface TranscriptQuizContainerProps {
	contentTable: ContentTableItem[];
}

const TranscriptQuizContainer: React.FC<TranscriptQuizContainerProps> = ({
	contentTable,
}) => {
	const { showQuiz, setShowQuiz } = useQuiz();
	const { errorMessage } = useQuiz();

	return (
		<Card
			className={
				"transition-all duration-200 h-full w-full max-h-[400px] overflow-auto hover:-translate-y-1 hover:bg-background/40"
			}
		>
			{/* Global error display */}
			{errorMessage && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 m-4 rounded">
					{errorMessage}
				</div>
			)}

			<CardHeader className="pb-2 flex flex-row items-center justify-between">
				<CardTitle className="group-hover:text-primary group-hover:brightness-125">
					{showQuiz ? "Quiz" : "Video Transcript"}
				</CardTitle>
				<div className="flex items-center gap-2">
					<Button
						className="text-sm"
						onClick={() => {
							setShowQuiz(!showQuiz);
						}}
						variant="ghost"
					>
						{showQuiz ? "View Transcript" : "Take Quiz"}
					</Button>
				</div>
			</CardHeader>

			<CardContent>
				{showQuiz ? (
					<QuizSection />
				) : (
					<TranscriptSection contentTable={contentTable} />
				)}
			</CardContent>
		</Card>
	);
};

export default TranscriptQuizContainer;
