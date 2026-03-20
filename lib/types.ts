// Question Types
export type QuestionType =
	| 'multiple'
	| 'true-false-not-given'
	| 'fill-blank'
	| 'matching-heading'
	| 'multiple-multi'

// Base Question interface
export interface BaseQuestion {
	id: number
	type: QuestionType
	question: string
}

// Multiple Choice Question
export interface MultipleChoiceQuestion extends BaseQuestion {
	type: 'multiple'
	options: string[] // ["A", "B", "C", "D"]
	optionsText: string[]
	answer: 'A' | 'B' | 'C' | 'D'
}

// True/False/Not Given Question
export interface TrueFalseNotGivenQuestion extends BaseQuestion {
	type: 'true-false-not-given'
	options: string[] // ["True", "False", "Not Given"]
	answer: 'True' | 'False' | 'Not Given'
}

// Fill in the Blank Question
export interface FillBlankQuestion extends BaseQuestion {
	type: 'fill-blank'
	answer: string
}

// Matching Heading Question
export interface MatchingHeadingQuestion extends BaseQuestion {
	type: 'matching-heading'
	options: string[] // ["i. Heading 1", "ii. Heading 2", ...]
	answer: string // e.g., "i", "ii", etc.
}

// Multiple-Select / Multiple-Multi Question
export interface MultipleMultiQuestion extends BaseQuestion {
	type: 'multiple-multi'
	options: string[] // ["A", "B", "C", "D"]
	optionsText: string[]
	answer: string[] // e.g., ["A", "C"]
}

// Union type for all question types
export type Question =
	| MultipleChoiceQuestion
	| TrueFalseNotGivenQuestion
	| FillBlankQuestion
	| MatchingHeadingQuestion
	| MultipleMultiQuestion

// Passage
export interface Passage {
	title: string
	content: string
	questions: Question[]
}

// Reading Test
export interface ReadingTest {
	id: string
	title: string
	passages: Passage[]
}

// User Answer State
export interface UserAnswers {
	[questionId: number]: string | string[]
}

// Test State
export interface TestState {
	currentPassageIndex: number
	userAnswers: UserAnswers
	isSubmitted: boolean
	startTime: number | null
	endTime: number | null
}

// Test Results
export interface TestResult {
	testId: string
	testTitle: string
	totalQuestions: number
	correctAnswers: number
	incorrectAnswers: number
	unansweredQuestions: number
	score: number // percentage
	answers: {
		questionId: number
		question: string
		userAnswer: string
		correctAnswer: string
		isCorrect: boolean
		type: QuestionType
	}[]
	duration: number // in seconds
}

// Timer State
export interface TimerState {
	totalSeconds: number
	remainingSeconds: number
	isActive: boolean
	isTimeUp: boolean
}
