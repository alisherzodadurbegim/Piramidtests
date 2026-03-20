import {
	MultipleMultiQuestion,
	Question,
	QuestionType,
	ReadingTest,
	TestResult,
	UserAnswers,
} from './types'

/**
 * Get a reading test by ID
 */
export async function getTestById(testId: string): Promise<ReadingTest | null> {
	try {
		const res = await fetch(`/data/tests/${testId}.json`)
		if (!res.ok) return null
		return await res.json()
	} catch (err) {
		console.error(`Error loading test ${testId}:`, err)
		return null
	}
}

/**
 * Get all questions
 */
export function getAllQuestions(test: ReadingTest): Question[] {
	return test.passages.flatMap(p => p.questions)
}

/**
 * Format time
 */
export function formatTime(seconds: number): string {
	const minutes = Math.floor(Math.abs(seconds) / 60)
	const secs = Math.abs(seconds) % 60
	const sign = seconds < 0 ? '-' : ''
	return `${sign}${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

/**
 * 🔥 ARRAY SOLISHTIRISH FUNCTION
 */
function arraysEqual(a: string[], b: string[]) {
	if (a.length !== b.length) return false
	const sortedA = [...a].sort()
	const sortedB = [...b].sort()
	return sortedA.every((val, idx) => val === sortedB[idx])
}

/**
 * Calculate results
 */
export function calculateTestResults(
	test: ReadingTest,
	userAnswers: UserAnswers,
): TestResult {
	const answers: TestResult['answers'] = []
	let correctCount = 0
	let incorrectCount = 0
	let unansweredCount = 0

	test.passages.forEach(passage => {
		passage.questions.forEach(question => {
			const rawAnswer = userAnswers[question.id]

			let isCorrect = false
			let isEmpty = false
			let correctAnswer: string | string[] = question.answer
			let userAnswer: string | string[] =
				rawAnswer ?? (Array.isArray(question.answer) ? [] : '')

			if (question.type === 'multiple-multi') {
				// Agar user javobi string bo‘lsa array ga aylantiramiz
				const userArray: string[] = Array.isArray(userAnswer)
					? userAnswer
					: typeof userAnswer === 'string' && userAnswer.trim() !== ''
						? userAnswer.split(',').map(s => s.trim())
						: []

				const correctArray = (question as MultipleMultiQuestion).answer
				isEmpty = userArray.length === 0
				isCorrect = arraysEqual(userArray, correctArray)

				userAnswer = userArray
				correctAnswer = correctArray
			} else {
				const ua = Array.isArray(userAnswer) ? userAnswer.join(',') : userAnswer
				const ca = Array.isArray(correctAnswer)
					? correctAnswer.join(',')
					: correctAnswer
				isEmpty = ua.trim() === ''
				isCorrect = ua === ca
				userAnswer = ua
				correctAnswer = ca
			}

			if (isEmpty) {
				unansweredCount++
			} else if (isCorrect) {
				correctCount++
			} else {
				incorrectCount++
			}

			answers.push({
				questionId: question.id,
				question: question.question,
				userAnswer: Array.isArray(userAnswer)
					? userAnswer.join(', ')
					: userAnswer,
				correctAnswer: Array.isArray(correctAnswer)
					? correctAnswer.join(', ')
					: correctAnswer,
				isCorrect,
				type: question.type as QuestionType,
			})
		})
	})

	const totalQuestions = answers.length
	const score =
		totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0

	return {
		testId: test.id,
		testTitle: test.title,
		totalQuestions,
		correctAnswers: correctCount,
		incorrectAnswers: incorrectCount,
		unansweredQuestions: unansweredCount,
		score,
		answers,
		duration: 0,
	}
}
