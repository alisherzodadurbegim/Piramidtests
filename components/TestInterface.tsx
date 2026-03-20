'use client'

import { DEFAULT_TIME_MINUTES } from '@/lib/constants'
import { ReadingTest, UserAnswers } from '@/lib/types'
import { useEffect, useState } from 'react'
import Passage from './Passage'
import PassageNavigator from './PassageNavigator'
import QuestionsPanel from './QuestionsPanel'
import Timer from './Timer'

interface TestInterfaceProps {
	test: ReadingTest
	onTestComplete?: (answers: UserAnswers, timeRemaining: number) => void
}

export default function TestInterface({
	test,
	onTestComplete,
}: TestInterfaceProps) {
	const [currentPassageIndex, setCurrentPassageIndex] = useState(0)
	const [userAnswers, setUserAnswers] = useState<UserAnswers>({})
	const [timeRemaining, setTimeRemaining] = useState(DEFAULT_TIME_MINUTES * 60)
	const [isTimeEditable, setIsTimeEditable] = useState(true)
	const [isMobile, setIsMobile] = useState(false)
	const [showQuestions, setShowQuestions] = useState(false)

	// Detect mobile
	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth < 768)
		checkMobile()
		window.addEventListener('resize', checkMobile)
		return () => window.removeEventListener('resize', checkMobile)
	}, [])

	const currentPassage = test.passages[currentPassageIndex]

	const handleAnswerChange = (questionId: number, answer: string) => {
		setUserAnswers(prev => ({
			...prev,
			[questionId]: answer,
		}))
	}

	const handleTimeChange = (newTime: number) => {
		setTimeRemaining(newTime)
		setIsTimeEditable(false)
	}

	const handleTimeExpired = () => {
		if (onTestComplete) {
			onTestComplete(userAnswers, 0)
		}
	}

	const handleSubmitTest = () => {
		if (onTestComplete) {
			onTestComplete(userAnswers, timeRemaining)
		}
	}

	const allQuestionIds = test.passages.flatMap(p => p.questions.map(q => q.id))

	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
			{/* Header */}
			<div className='sticky top-0 z-50 backdrop-blur-md bg-white/70 fixed border-b border-white/20 shadow-sm'>
				<div className='max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-3'>
					{/* Title */}
					<div className='min-w-0'>
						<h1 className='text-lg font-semibold text-slate-900 truncate'>
							{currentPassage?.title || '...'}
						</h1>
						<p className='text-xs text-slate-600 truncate'>
							{currentPassage?.content?.slice(0, 60) || '...'}
						</p>
					</div>

					{/* Timer (kichraytirilgan wrapper) */}
					<div className='scale-90 sm:scale-100'>
						<Timer
							initialSeconds={timeRemaining}
							isEditable={isTimeEditable}
							onTimeChange={handleTimeChange}
							onTimeExpired={handleTimeExpired}
						/>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto p-4'>
				{isMobile ? (
					<div className='space-y-4'>
						<div className='flex gap-2 border-b border-slate-200'>
							<button
								onClick={() => setShowQuestions(false)}
								className={`px-4 py-2 font-medium border-b-2 transition-all ${
									!showQuestions
										? 'border-blue-600 text-blue-600'
										: 'border-transparent text-slate-600'
								}`}
							>
								Passage
							</button>
							<button
								onClick={() => setShowQuestions(true)}
								className={`px-4 py-2 font-medium border-b-2 transition-all ${
									showQuestions
										? 'border-blue-600 text-blue-600'
										: 'border-transparent text-slate-600'
								}`}
							>
								Questions
							</button>
						</div>

						{!showQuestions ? (
							<Passage
								passage={currentPassage}
								passageIndex={currentPassageIndex}
								totalPassages={test.passages.length}
							/>
						) : (
							<QuestionsPanel
								passage={currentPassage!}
								userAnswers={userAnswers}
								onAnswerChange={handleAnswerChange}
							/>
						)}

						<PassageNavigator
							currentIndex={currentPassageIndex}
							totalPassages={test.passages.length}
							onPreviousClick={() =>
								setCurrentPassageIndex(prev => Math.max(0, prev - 1))
							}
							onNextClick={() =>
								setCurrentPassageIndex(prev =>
									Math.min(test.passages.length - 1, prev + 1),
								)
							}
							userAnswers={userAnswers}
							allQuestionsIds={allQuestionIds}
						/>
					</div>
				) : (
					<div className='grid grid-cols-2 gap-6 min-h-[calc(100vh-200px)]'>
						<div className='space-y-4'>
							<Passage
								passage={currentPassage}
								passageIndex={currentPassageIndex}
								totalPassages={test.passages.length}
							/>
							<PassageNavigator
								currentIndex={currentPassageIndex}
								totalPassages={test.passages.length}
								onPreviousClick={() =>
									setCurrentPassageIndex(prev => Math.max(0, prev - 1))
								}
								onNextClick={() =>
									setCurrentPassageIndex(prev =>
										Math.min(test.passages.length - 1, prev + 1),
									)
								}
								userAnswers={userAnswers}
								allQuestionsIds={allQuestionIds}
							/>
						</div>
						<div>
							<QuestionsPanel
								passage={currentPassage}
								userAnswers={userAnswers}
								onAnswerChange={handleAnswerChange}
							/>
						</div>
					</div>
				)}
			</div>

			{/* Footer */}
			<div className='sticky bottom-0 bg-white border-t border-slate-200 p-4'>
				<div className='max-w-7xl mx-auto flex justify-end'>
					{/* Passage Navigation */}
					<div className='flex gap-2'>
						<button
							onClick={() =>
								setCurrentPassageIndex(prev => Math.max(0, prev - 1))
							}
							disabled={currentPassageIndex === 0}
							className='px-4 py-2 bg-slate-200 rounded-lg disabled:opacity-50'
						>
							Previous
						</button>

						<button
							onClick={() =>
								setCurrentPassageIndex(prev =>
									Math.min(test.passages.length - 1, prev + 1),
								)
							}
							disabled={currentPassageIndex === test.passages.length - 1}
							className='px-2 py-2 mr-2 bg-slate-200 rounded-lg disabled:opacity-50'
						>
							Next passage
						</button>
					</div>
					<button
						onClick={handleSubmitTest}
						className='px-2 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md'
					>
						Submit Test
					</button>
				</div>
			</div>
		</div>
	)
}
