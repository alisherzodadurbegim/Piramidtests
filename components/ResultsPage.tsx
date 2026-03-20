'use client'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { MultipleMultiQuestion, ReadingTest, UserAnswers } from '@/lib/types'
import Link from 'next/link'
import { useState } from 'react'

interface ResultsPageProps {
	test: ReadingTest
	userAnswers: UserAnswers
	timeRemaining: number
	onRetake: () => void
}

// Arraylarni tekshirish (tartib muhim emas, case insensitive)
function arraysEqual(a: string[], b: string[]) {
	if (a.length !== b.length) return false
	const sortedA = [...a].map(s => s.trim().toUpperCase()).sort()
	const sortedB = [...b].map(s => s.trim().toUpperCase()).sort()
	return sortedA.every((val, idx) => val === sortedB[idx])
}

export default function ResultsPage({
	test,
	userAnswers,
	timeRemaining,
	onRetake,
}: ResultsPageProps) {
	const [expandedPassage, setExpandedPassage] = useState<number | null>(null)

	// Calculate score
	let correctCount = 0
	const allQuestions = test.passages.flatMap(p => p.questions)

	allQuestions.forEach(question => {
		const userAnswer = userAnswers[question.id]

		// Multiple-multi uchun alohida tekshiruv
		let isCorrect = false
		if (question.type === 'multiple-multi') {
			const userArray: string[] = Array.isArray(userAnswer)
				? userAnswer
				: typeof userAnswer === 'string' && userAnswer.trim() !== ''
					? userAnswer.split(',').map(s => s.trim())
					: []
			const correctArray = (question as MultipleMultiQuestion).answer
			isCorrect = arraysEqual(userArray, correctArray)
		} else {
			isCorrect = userAnswer === question.answer
		}

		if (isCorrect) correctCount++
	})

	const totalQuestions = allQuestions.length
	const percentage = Math.round((correctCount / totalQuestions) * 100)
	const timeTaken = 20 * 60 - timeRemaining
	const minutes = Math.floor(timeTaken / 60)
	const seconds = timeTaken % 60

	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
			{/* Header */}
			<div className='bg-white border-b border-slate-200'>
				<div className='max-w-6xl mx-auto px-4 py-12'>
					<h1 className='text-4xl font-bold text-slate-900 mb-2'>
						Test Results
					</h1>
					<p className='text-xl text-slate-600'>{test.title}</p>
				</div>
			</div>

			{/* Results Summary */}
			<div className='max-w-6xl mx-auto px-4 py-12'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
					{/* Score Card */}
					<Card className='border-2 border-blue-200 bg-blue-50'>
						<CardHeader>
							<CardTitle className='text-center'>Your Score</CardTitle>
						</CardHeader>
						<CardContent className='text-center'>
							<div className='text-6xl font-bold text-blue-600 mb-2'>
								{correctCount}/{totalQuestions}
							</div>
							<p className='text-2xl font-semibold text-slate-900 mb-4'>
								{percentage}%
							</p>
							<div className='w-full bg-slate-200 rounded-full h-2'>
								<div
									className='bg-blue-600 h-2 rounded-full transition-all'
									style={{ width: `${percentage}%` }}
								/>
							</div>
						</CardContent>
					</Card>

					{/* Time Card */}
					<Card>
						<CardHeader>
							<CardTitle className='text-center'>Time Taken</CardTitle>
						</CardHeader>
						<CardContent className='text-center'>
							<div className='text-4xl font-bold text-slate-900'>
								{minutes.toString().padStart(2, '0')}:
								{seconds.toString().padStart(2, '0')}
							</div>
							<p className='text-slate-600 mt-4'>Remaining: {timeRemaining}s</p>
						</CardContent>
					</Card>

					{/* Performance Card */}
					<Card>
						<CardHeader>
							<CardTitle className='text-center'>Performance</CardTitle>
						</CardHeader>
						<CardContent className='text-center'>
							<div className='space-y-2'>
								<div>
									<p className='text-sm text-slate-600'>Correct</p>
									<p className='text-3xl font-bold text-green-600'>
										{correctCount}
									</p>
								</div>
								<div>
									<p className='text-sm text-slate-600'>Incorrect</p>
									<p className='text-3xl font-bold text-red-600'>
										{totalQuestions - correctCount}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Detailed Review */}
				<div className='space-y-6'>
					<h2 className='text-2xl font-bold text-slate-900'>Detailed Review</h2>

					{test.passages.map((passage, passageIndex) => {
						const passageCorrect = passage.questions.filter(q => {
							const userAnswer = userAnswers[q.id]
							let isCorrect = false
							if (q.type === 'multiple-multi') {
								const userArray: string[] = Array.isArray(userAnswer)
									? userAnswer
									: typeof userAnswer === 'string' && userAnswer.trim() !== ''
										? userAnswer.split(',').map(s => s.trim())
										: []
								const correctArray = (q as MultipleMultiQuestion).answer
								isCorrect = arraysEqual(userArray, correctArray)
							} else {
								isCorrect = userAnswer === q.answer
							}
							return isCorrect
						}).length

						return (
							<Card key={passageIndex} className='overflow-hidden'>
								<CardHeader
									className='cursor-pointer hover:bg-slate-50 transition-all'
									onClick={() =>
										setExpandedPassage(
											expandedPassage === passageIndex ? null : passageIndex,
										)
									}
								>
									<div className='flex items-center justify-between'>
										<div>
											<CardTitle>{passage.title}</CardTitle>
											<CardDescription>
												{passageCorrect}/{passage.questions.length} questions
												correct
											</CardDescription>
										</div>
										<div className='text-right'>
											<div className='text-2xl font-bold text-slate-900'>
												{Math.round(
													(passageCorrect / passage.questions.length) * 100,
												)}
												%
											</div>
										</div>
									</div>
								</CardHeader>

								{expandedPassage === passageIndex && (
									<CardContent className='space-y-6 pt-6 border-t border-slate-200'>
										{passage.questions.map(question => {
											const userAnswer = userAnswers[question.id]
											let isCorrect = false
											let displayUserAnswer: string = ''
											let displayCorrectAnswer: string = ''

											if (question.type === 'multiple-multi') {
												const userArray: string[] = Array.isArray(userAnswer)
													? userAnswer
													: typeof userAnswer === 'string' &&
														  userAnswer.trim() !== ''
														? userAnswer.split(',').map(s => s.trim())
														: []
												const correctArray = (question as MultipleMultiQuestion)
													.answer
												isCorrect = arraysEqual(userArray, correctArray)
												displayUserAnswer = userArray.join(', ')
												displayCorrectAnswer = correctArray.join(', ')
											} else {
												displayUserAnswer = Array.isArray(userAnswer)
													? userAnswer.join(', ')
													: userAnswer
												displayCorrectAnswer = Array.isArray(question.answer)
													? question.answer.join(', ')
													: question.answer
												isCorrect = displayUserAnswer === displayCorrectAnswer
											}

											return (
												<div
													key={question.id}
													className={`p-4 rounded-lg border-2 ${
														isCorrect
															? 'border-green-200 bg-green-50'
															: 'border-red-200 bg-red-50'
													}`}
												>
													<div className='flex items-start gap-3'>
														<div
															className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-bold text-white ${
																isCorrect ? 'bg-green-600' : 'bg-red-600'
															}`}
														>
															{isCorrect ? '✓' : '✗'}
														</div>
														<div className='flex-1'>
															<p className='font-semibold text-slate-900 mb-2'>
																Question {question.id}: {question.question}
															</p>
															<div className='space-y-1 text-sm'>
																<p
																	className={
																		isCorrect
																			? 'text-green-700'
																			: 'text-slate-700'
																	}
																>
																	Your answer:{' '}
																	<span className='font-semibold'>
																		{displayUserAnswer || '(Not answered)'}
																	</span>
																</p>
																{!isCorrect && (
																	<p className='text-slate-700'>
																		Correct answer:{' '}
																		<span className='font-semibold text-green-700'>
																			{displayCorrectAnswer}
																		</span>
																	</p>
																)}
															</div>
														</div>
													</div>
												</div>
											)
										})}
									</CardContent>
								)}
							</Card>
						)
					})}
				</div>

				{/* Actions */}
				<div className='mt-12 flex gap-4 justify-center'>
					<Button
						onClick={onRetake}
						className='bg-blue-600 hover:bg-blue-700 px-8 py-3'
					>
						Retake Test
					</Button>
					<Link href='/reading'>
						<Button variant='outline' className='px-8 py-3'>
							Back to Tests
						</Button>
					</Link>
					<Link href='/'>
						<Button variant='outline' className='px-8 py-3'>
							Home
						</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}
